import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { productsSchema } from "../schemas/products.schema.js";
import { addProduct, editProductState, getAllProducts, productsById, removeProduct, userProducts } from "../controllers/products.controller.js";

const productsRouter = Router();
productsRouter.post("/products", validateAuth, validateSchema(productsSchema), addProduct);
productsRouter.get("/products", validateAuth, getAllProducts);
productsRouter.get("/products/my", validateAuth, userProducts);
productsRouter.get("/products/:id", validateAuth, productsById);
productsRouter.put("/products/:id/:status", validateAuth, editProductState);
productsRouter.delete("/products/:id", validateAuth, removeProduct);

export default productsRouter;