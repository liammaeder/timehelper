const express       = require('express');
const router        = express.Router();
const dbConn        = require('../../controllers/DatabaseConnector');
const db            = new dbConn;

router.use(express.json());

router.post('/', (req, res) => {
    res.json({ data: 'Connection to races success' });
});

router.post('/createRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const values = jsonData.values;
    const sql = `
       INSERT INTO race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')}`;

    try {
        await db.connect();
        await db.select(sql, jsonData, (error, result) => {
            if (error) {
                res.status(500);
                res.json({ message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race created successfully",
                    result: result
                });
            }
        });
    } catch (error) {
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
                if (error) {
                    console.log(error);
                    res.status(500);
                    res.json({message: error});
                    return;
                }

                res.status(200);
                res.json(result);
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
    const sql = `
        SELECT * FROM race 
        WHERE ${Object.entries(condition).map(([key, value]) => `${value}`).join(' AND ')}
        LIMIT ${limit} OFFSET ${offset}`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races retrieved successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.post('/updateRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const condition = jsonData.condition;
    const values = jsonData.values;
    const sql = `
            UPDATE race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} 
            WHERE ${Object.entries(condition).map(([key, value]) => `${key} = '${value}'`).join(' AND ')}
            `;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race updated successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.post('/updateRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const idArray = jsonData.idArray;
    const values = jsonData.values;
    const sql = `UPDATE race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE id IN (${idArray.join(', ')})}`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races updated successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.delete('/deleteRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const id = jsonData.id;
    const sql = `DELETE FROM race WHERE id = ${id}`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race deleted successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.delete('/deleteRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const idArray = jsonData.idArray;
    const sql = `DELETE FROM race WHERE id IN (${idArray.join(', ')})`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races deleted successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

module.exports = router;