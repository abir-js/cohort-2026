import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegiesterDto from "./dto/register.dto.js";

const router = Router();

router.post("/register", validate(RegiesterDto), controller.registerController);

export default router;
