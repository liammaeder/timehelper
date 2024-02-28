require('dotenv').config();

const mysql     = require('mysql');
const {NULL} = require("mysql/lib/protocol/constants/types");
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
        let parameters = [];
        let columns = [];
        let columnsStr = "";
        let parametersStr = "";

        Object.entries(values).map(([key, value]) => {
            if (value) {
                columns.push(key);
                parameters.push(value);
            }
        });

        parametersStr = parameters.map((value) => {
            if (typeof value === "string") {
                return `"${value}"`;
            } else {
                return  value;
            }
        }).join(', ');

        columnsStr = columns.join(', ');

        const sql = `INSERT INTO ${table} (${columnsStr}) 
                     VALUES (${parametersStr})`;

        return await this.query(sql);
    }

    async select(table, conditions) {
        let whereStatement = "";

        if (conditions.length > 0) {
            whereStatement = `WHERE ${conditions.map((value) => `${value}`).join(" ")}`;
        }

        const sql = `
        SELECT * FROM ${table} 
        ${whereStatement}`;

        return await this.query(sql);
    }

    async selectMulti(table, conditions, limit, offset) {
        let whereStatement = '';

        if (conditions.length > 0) {
            whereStatement = `WHERE ${conditions.map((value) => `${value}`).join(' ')}`;
        }

        const sql = `
        SELECT * FROM ${table}
        ${whereStatement}
        LIMIT ${limit} OFFSET ${offset}`;

        return await this.query(sql);
    }

    async update(table, values, conditions) {
        let whereStatement = "";

        if (conditions.length > 0) {
            whereStatement = `WHERE ${conditions.map((value) => `${value}`).join(' ')}`;
        }

        const sql = `UPDATE ${table} 
            SET ${Object.entries(values).map(([key, value]) => `${key} = "${value}"`).join(', ')} 
            ${whereStatement}`;


        return await this.query(sql);
    }

    async delete(table, conditions) {
        let whereStatement = "";

        if (conditions.length > 0) {
            whereStatement = `WHERE ${conditions.map((value) => `${value}`).join(', ')}`;
        }

        const sql = `DELETE FROM ${table} 
            ${whereStatement}`;

        return await this.query(sql);
    }

    async query(sql) {
        console.log(sql);

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