const express           = require('express');
const router            = express.Router();
const DatabaseHelper    = require('../../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

router.use(express.json());

router.post('/testConn', (req, res) => {
    res.status(200).json({ data: 'Connection to races success' });
});

router.post('/createRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);

    try {
        const response = await dbHelper.create(jsonData, 'race');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRace', async (req, res) => {
    const jsonData = req.body;
    const id = jsonData.id;

    if (id <= 0) {
        res.status(500).json({ "Error": "no data for Id, " + id});
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
                                    INNER JOIN participant_racer pr ON racer.id = pr.racer
                                    WHERE pr.participant = participant.id
                                )
                            )
                        )
                        FROM participant
                        LEFT JOIN participant_type ON participant.type = participant_type.id
                        WHERE participant.race = race.id
                    )
                ) AS result
            FROM race
            INNER JOIN race_status ON race.status = race_status.id
            WHERE race.id = ${id}
            GROUP BY race.id;`;

        try {
            const result = await dbHelper.query(sql);
            res.status(result.status).json(JSON.parse(result.json[0].result));
        } catch (error) {
            res.status(500).json({"Error": error.message});
        }
    }
});

router.post('/getRacesList', async (req, res) => {
    const jsonData = req.body;
    const conditions = jsonData.conditions;
    const offset = jsonData.offset;
    const limit = jsonData.limit;
    let whereStatement = "";

    if (conditions.length > 0) {
        whereStatement = `WHERE ${Object.entries(conditions).map(([key, value]) => `${value}`).join(' ')}`;
    }

    const sql = `
        SELECT race.id, race.name, race.date, race_status.name as status FROM race
        JOIN race_status ON race.status = race_status.id
        ${whereStatement}
        LIMIT ${limit} OFFSET ${offset}`;

    try {
        const response = await dbHelper.query(sql);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getRaces', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.selectMulti(jsonData, 'race');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateRaces', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.update(jsonData, 'race');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteRaces', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.delete(jsonData, 'race');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

module.exports = router;