const express   = require('express');
const router    = express.Router();
const dbConn    = require('../../controllers/DatabaseConnector');
const db        = new dbConn;
const tableName = 'race';

router.use(express.json());

router.post('/', (req, res) => {
    res.status(200);
    res.json({ data: 'Connection to races success' });
});

router.post('/createRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const values = jsonData.values;

    try {
        await db.create(tableName, values, (error, result) => {
            const response = handleCallback(error, result);
            res.status(response.status);
            res.json(response.json);
        });
    } catch (error) {
        res.status(500);
        res.json({"Error": error.message});
    }
});

router.post('/getRace', async (req, res) => {
    const jsonData = req.body;
    const id = jsonData.id;

    if (id <= 0) {
        res.status(200);
        res.json({message: "no data for Id, -1"});
    } else {
        const sql = `
            SELECT
                JSON_OBJECT(
                    'id', race.id,
                    'name', race.name,
                    'date', race.date,
                    'status', race_status.name,
                    'participants', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', participant.id,
                                'type', participant_type.name,
                                'time', participant.total_time,
                                'racers', (
                                    SELECT JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'id', racer.id,
                                            'name', racer.name
                                        )
                                    )
                                    FROM racer
                                    LEFT JOIN user ON racer.user_id = user.id
                                    WHERE racer.participant_id = participant.id
                                )
                            )
                        )
                        FROM participant
                        LEFT JOIN participant_type ON participant.type_id = participant_type.id
                        WHERE participant.race_id = race.id
                    )
                ) AS result
            FROM race
            JOIN race_status ON race.status_id = race_status.id
            WHERE race.id = ${id}
            GROUP BY race.id`;

        try {
            db.query(sql, (error, result) => {
                const response = handleCallback(error, result);
                res.status(response.status);
                res.json(response.json);
            });
        } catch (error) {
            res.status(500);
            res.json({"Error": error.message});
        }
    }
});

router.post('/getRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const condition = jsonData.condition;
    const limit = jsonData.limit;
    const offset = jsonData.offset;

    try {
        await db.select(tableName, condition, limit, offset, (error, result) => {
            const response = handleCallback(error, result);
            res.status(response.status);
            res.json(response.json);
        });
    } catch (error) {
        res.status(500);
        res.json({"Error": error.message});
    }
});

router.post('/updateRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const conditions = jsonData.conditions;
    const values = jsonData.values;

    try {
        await db.update(tableName, values, conditions, (error, result) => {
            const response = handleCallback(error, result);
            res.status(response.status);
            res.json(response.json);
        });
    } catch (error) {
        res.status(500);
        res.json({"Error": error.message});
    }
});

router.post('/deleteRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const conditions = jsonData.conditions;

    try {
        await db.delete(tableName, conditions, (error, result) => {
            const response = handleCallback(error, result);
            res.status(response.status);
            res.json(response.json);
        });
    } catch (error) {
        res.status(500);
        res.json({"Error": error.message});
    }
});

function handleCallback(error, result) {
    let response = {};

    if (error) {
        response.status = 500;
        response.json = {message: error};
    } else {
        response.status = 200;
        response.json = {
            message: "Races updated successfully",
            result: result
        };
    }

    return response;
}

module.exports = router;