import { deleteProduct, getProductById, productState, getProducts, getProductsByUser, newProduct } from "../repositories/products.repository.js";

export async function addProduct(req,res) {
    const userId = res.locals.userId;
    const product = req.body;

    try {
        await newProduct(userId, product);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function getAllProducts(req,res) {

    try {
        const products = await getProducts();
        return res.send(products);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function userProducts(req,res) {
    const userId = res.locals.userId;

    try {
        const products = await getProductsByUser(userId);
        res.send(products);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function productsById(req,res) {
    const { id } = req.params;

    try {
        const product = await getProductById(id);
        res.send(product);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function editProductState(req,res) {
    const { id, status } = req.params;

    try {
        await productState(id, status);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function removeProduct(req,res) {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const product = await getProductById(id);
        if (product.userid !== userId) {
            return res.status(401).send("Produto não foi deletado");
        }
        await deleteProduct(id);
        return res.sendStatus(204);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};