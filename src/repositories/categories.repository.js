import { db } from "../database/database.connection.js";

export async function getCategories() {
    const categories = await db.query(`SELECT * FROM categories`);
    return categories.rows;
};