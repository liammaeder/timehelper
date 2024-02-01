const dbConn    = require('../controllers/DatabaseConnector');
const db        = new dbConn;

class DatabaseHelpers {
    constructor() {
    }

    async create(jsonData, tableName) {
        const values = jsonData.values;

        return await db.create(tableName, values);
    }

    async select(jsonData, tableName) {
        const conditions = jsonData.conditions;

        return await db.select(tableName, conditions);
    }

    async selectMulti(jsonData, tableName) {
        const conditions = jsonData.conditions;
        const limit = jsonData.limit;
        const offset = jsonData.offset;

        return await db.selectMulti(tableName, conditions, limit, offset);
    }

    async update(jsonData, tableName) {
        const values = jsonData.values;
        const conditions = jsonData.conditions;

        return await db.update(tableName, values, conditions);
    }

    async delete(jsonData, tableName) {
        const conditions = jsonData.conditions;

        return await db.delete(tableName, conditions);
    }

    async query(sql) {
        let response;

        response = await db.query(sql);

        return response;
    }
}

module.exports = DatabaseHelpers;