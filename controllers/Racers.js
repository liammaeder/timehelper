const DatabaseHelper    = require('../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

class Racers {
    constructor() {
        this.tableName = 'racer';
    }

    async createRacer(jsonData) {
        return await dbHelper.create(jsonData, this.tableName);
    }

    async getRacer(jsonData) {
        const result = await dbHelper.select(jsonData, this.tableName);
        return {
            status: result.status,
            json: result.json[0]
        }
    }

    async getRacers(jsonData) {
        return await dbHelper.selectMulti(jsonData, this.tableName);
    }

    async updateRacer(jsonData) {
        return await dbHelper.update(jsonData, this.tableName);
    }

    async deleteRacer(jsonData) {
        return await dbHelper.delete(jsonData, this.tableName);
    }
}

module.exports = Racers;