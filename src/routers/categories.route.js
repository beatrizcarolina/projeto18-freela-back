import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { getAllCategories } from "../controllers/categories.controller.js"

const categoryRouter = Router();
categoryRouter.get("/categories", validateAuth, getAllCategories);

export default categoryRouter;