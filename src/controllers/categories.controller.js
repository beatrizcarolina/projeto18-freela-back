import { getCategories } from "../repositories/categories.repository.js"

export async function getAllCategories(req,res) {
    try {
        const categories = await getCategories();
        res.send(categories);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}