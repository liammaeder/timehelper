require('dotenv').config();

const mysql     = require('mysql');
const dbConfig  = {
    host: process.env.NODE_MYSQL_HOST,
    user: process.env.NODE_MYSQL_USER,
    password: process.env.NODE_MYSQL_PASSWORD,
    database: process.env.NODE_MYSQL_DATABASE,
}

class DatabaseConnector {
    constructor() {
        this.connection = mysql.createPool(dbConfig);
    }

    async create(table, values) {
        const sql = `INSERT INTO ${table}
            SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')}`;

        return await this.query(sql);
    }

    async select(table, conditions) {
        const sql = `
        SELECT * FROM ${table} 
        WHERE ${Object.entries(conditions).map(([key, value]) => `${value}`).join(' ')}`;

        return await this.query(sql);
    }

    async selectMulti(table, conditions, limit, offset) {
        let whereStr = "";

        if (conditions.length > 0) {
            whereStr = `WHERE ${Object.entries(conditions).map(([key, value]) => `${value}`).join(' ')}`;
        }

        const sql = `
        SELECT * FROM ${table}
        ${whereStr}
        LIMIT ${limit} OFFSET ${offset}`;

        console.log(sql);
        return await this.query(sql);
    }

    async update(table, values, conditions) {
        const sql = `UPDATE ${table} 
            SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} 
            WHERE ${Object.entries(conditions).map(([key, value]) => `'${value}'`).join(' ')}`;


        return await this.query(sql);
    }

    async delete(table, conditions) {
        const sql = `DELETE FROM ${table} 
            WHERE ${Object.entries(conditions).map(([key, value]) => `'${value}'`).join(' ')}`;

        return await this.query(sql);
    }

    async query(sql) {
        try {
            const result = await this.fetchData(sql);
            return this.handleResponse(null, result);
        } catch (error) {
            return this.handleResponse(error, null);
        }
    }

    async fetchData(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    close() {
        this.connection.end();
    }

    handleResponse(error, result) {
        let response = {};

        if (error) {
            response.status = 500;
            response.json = {message: error};
        } else {
            response.status = 200;
            response.json = result;
        }

        console.log(response);

        return response;
    }
}

module.exports = DatabaseConnector;