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

    create(table, values, callback) {
        const sql = `INSERT INTO ${table}
            SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')}`;

        this.query(sql, callback);
    }

    select(table, conditions, limit, offset, callback) {
        const sql = `
        SELECT * FROM ${table} 
        WHERE ${Object.entries(conditions).map(([key, value]) => `${value}`).join(' ')}
        LIMIT ${limit} OFFSET ${offset}`;

        this.query(sql, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }

    update(table, values, conditions, callback) {
        const sql = `UPDATE ${table} 
            SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} 
            WHERE ${Object.entries(conditions).map(([key, value]) => `'${value}'`).join(' ')}`;

        this.query(sql, callback);
    }

    delete(table, conditions, callback) {
        const sql = `DELETE FROM ${table} 
            WHERE ${Object.entries(conditions).map(([key, value]) => `'${value}'`).join(' ')}`;

        this.query(sql, callback);
    }

    query(sql, callback) {
        this.connection.query(sql, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }

    close() {
        this.connection.end();
    }
}

module.exports = DatabaseConnector;