import { db } from "../database/database.connection.js";

export async function newProduct(userid, product) {
    const { name, price, description, photo, category } = product;

    await db.query(`
        INSERT INTO products ("userid", "name", "price", "description", "photo", "categoryid", "status") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userid, name, price, description, photo, category, false]
    );
};

export async function getProducts() {
    const allProducts = await db.query(`SELECT * FROM products`);
    return allProducts.rows;
};

export async function getProductById(id){
    const allProducts = await db.query(`SELECT * FROM products WHERE "id" = $1`,[id]);
    return allProducts.rows[0];
};

export async function getProductsByUser(id) {
    const products = await db.query(`SELECT * FROM products WHERE "userid" = $1`,[id]);
    return products.rows;
};

export async function productState(id, status) {
    await db.query(`UPDATE products SET "status" = $2 WHERE "id" = $1`, [id, status]);
};

export async function deleteProduct(id) {
    console.log(id);
    await db.query(`DELETE FROM products WHERE id = $1`, [id]);
    
};

