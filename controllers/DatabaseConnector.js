const mysql = require('mysql');

require('dotenv').config();

const dbConfig = {
    host: process.env.NODE_MYSQL_HOST,
    user: process.env.NODE_MYSQL_USER,
    password: process.env.NODE_MYSQL_PASSWORD,
    database: process.env.NODE_MYSQL_DATABASE,
}

class DatabaseConnector {
    constructor() {
        this.connection = mysql.createConnection(dbConfig);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('Connected to the database');
                }
            });
        });
    }

    select(sql, values, callback) {
        this.connection.query(sql, values, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
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