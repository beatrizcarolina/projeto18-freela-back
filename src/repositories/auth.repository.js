import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function searchUser(email) {
    const foundUser = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
    return foundUser.rows[0];
};

export async function newUser(name, email, phone, cpf, password) {
    await db.query(`
        INSERT INTO users ("name", "email", "phone", "cpf" ,"password") VALUES ( $1, $2, $3, $4, $5 )`, 
        [name, email, phone, cpf, password]);
};

export async function checkPassword(email, password) {
    const foundUser = await searchUser(email);
    if (!foundUser) {
        return false;
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
        return foundUser;
    }
    return false;
};

export async function createAddress(email, cep, state, city, address) {
    const foundUser = await searchUser(email);
    await db.query(`
        INSERT INTO addresses ("user_id", "cep", "state", "city", "address") VALUES ($1, $2, $3, $4, $5)`, 
        [foundUser.id, cep, state, city, address]);
};

export async function newSession(userId, token) {
    await db.query(`
        INSERT INTO sessions ("userid","token") VALUES ($1,$2)`, 
        [userId, token]);
};

export async function deleteUser(token) {
    await db.query(`
        DELETE FROM sessions WHERE token = $1`, [token]);
};