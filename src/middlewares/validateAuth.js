import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE "token"=$1`, [token]);
    
        if (session.rowCount === 0) {
            return res.sendStatus(401);
        }
        res.locals.userId = session.rows[0].userid;
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
};