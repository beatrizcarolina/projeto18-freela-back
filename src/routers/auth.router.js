import { Router } from "express";
import { registerAdress, signin, signout, signup } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { adressSchema, signinSchema, signupSchema } from "../schemas/auth.schema.js";
import { validateAuth } from "../middlewares/validateAuth.js"

const authRouter = Router();
authRouter.post("/signup", validateSchema(signupSchema), signup);
authRouter.post("/adress", validateSchema(adressSchema), registerAdress);
authRouter.post("/signin", validateSchema(signinSchema), signin);
authRouter.delete("/signout", validateAuth, signout);

export default authRouter;