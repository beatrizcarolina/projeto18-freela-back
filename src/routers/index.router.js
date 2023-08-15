import { Router } from "express";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import categoryRouter from "./categories.route.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);
router.use(categoryRouter);

export default router;