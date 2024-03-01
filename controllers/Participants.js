const DatabaseHelper    = require('../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

class Participants {
    constructor() {
        this.tableName = 'participant';
        this.racerLink = 'participant_racer';
        this.typeLink = 'participant_type';
        this.lapLink = 'participant_lap';
    }

    async createParticipant(jsonData) {
        return await dbHelper.create(jsonData, this.tableName);
    }

    async getParticipant(jsonData) {
        return await dbHelper.select(jsonData, this.tableName);
    }

    async getParticipants(jsonData) {
        return await dbHelper.selectMulti(jsonData, this.tableName);
    }

    async updateParticipant(jsonData) {
        return await dbHelper.update(jsonData, this.tableName);
    }

    async deleteParticipants(jsonData) {
        const participantId = jsonData.id;

        await this.deleteParticipantRacers(participantId);

        jsonData = {
            "conditions": [
                `id = ${participantId}`
            ]
        }

        return await dbHelper.delete(jsonData, this.tableName);
    }

    async deleteParticipantRacers(participantId) {
        const jsonData = {
            "conditions": [
                `participant = ${participantId}`
            ]
        };

        return await dbHelper.delete(jsonData, this.racerLink);
    }
}

module.exports = Participants;