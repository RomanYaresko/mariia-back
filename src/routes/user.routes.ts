import { Router } from "express";
import { userController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/register", userController.register);
router.get("/current", authMiddleware, userController.current);

export default router;
