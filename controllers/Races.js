const PartCls           = require('./Participants');
const Participants      = new PartCls();
const DatabaseHelper    = require('../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

class Races {
    constructor() {
        this.tableName = "race";
        this.participantsLink = 'participant';
    }

    async createRace(jsonData) {
        return await dbHelper.create(jsonData, this.tableName);
    }

    async getEditableRace(jsonData) {
        const response = await dbHelper.select(jsonData, this.tableName);
        return {
            status: response.status,
            json: response.json[0]
        }
    }

    async getRaceParticipants(jsonData) {
        return await dbHelper.selectMulti(jsonData, this.participantsLink);
    }

    async getRace(jsonData) {
        const id = jsonData.id;
        const sql = `
            SELECT JSON_OBJECT(
                'id', race.id,
                'name', race.name,
                'date', race.date,
                'status', race_status.name,
                'participants', (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', participant.id,
                        'type', participant_type.name,
                        'time', participant.total_time,
                        'racers', (SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', racer.id,
                                'name',
                                racer.name
                            )
                        )
                            FROM racer
                            INNER JOIN participant_racer pr ON racer.id = pr.racer
                            WHERE pr.participant = participant.id)
                    )
                )
                FROM participant
                LEFT JOIN participant_type ON participant.type = participant_type.id
                WHERE participant.race = race.id)
            ) AS result
            FROM race
            INNER JOIN race_status ON race.status = race_status.id
            WHERE race.id = ${id}
            GROUP BY race.id;`;

        let result = await dbHelper.query(sql);
        return {status: result.status, json: JSON.parse(JSON.stringify(result.json))[0].result}
    }

    async getRacesList(jsonData) {
        const conditions = jsonData.conditions;
        const offset = jsonData.offset;
        const limit = jsonData.limit;
        let whereStatement = "";

        if (conditions.length > 0) {
            whereStatement = `WHERE ${Object.entries(conditions).map(([key, value]) => `${value}`).join(' ')}`;
        }

        const sql = `
            SELECT race.id, race.name, race.date, race_status.name as status FROM ${this.tableName}
            JOIN race_status ON race.status = race_status.id
            ${whereStatement}
            LIMIT ${limit} OFFSET ${offset}`;

        return await dbHelper.query(sql);
    }

    async getRaces(jsonData) {
        return await dbHelper.selectMulti(jsonData, this.tableName);
    }

    async updateRace(jsonData) {
        return await dbHelper.update(jsonData, this.tableName);
    }

    async deleteRace(jsonData) {
        const getPartJson = {
            "conditions": [
                `race = ${jsonData.id}`
            ],
            "limit": 99999999,
            "offset": 0
        }

        let participantsList = await Participants.getParticipants(getPartJson);
        participantsList = JSON.parse(JSON.stringify(participantsList.json));

        if (participantsList && participantsList.length > 0) {
            await Promise.all(participantsList.map(async (participant) => {
                const currJson = {
                    id: participant.id
                };
                await Participants.deleteParticipants(currJson);
            }));
        }

        const raceJsonData = {
            "conditions": [
                `id = ${jsonData.id}`
            ]
        }

        return await dbHelper.delete(raceJsonData, this.tableName);
    }
}

module.exports = Races;