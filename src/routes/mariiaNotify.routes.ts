import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { mariiaNotifyController } from "@/controllers/mariiaNotify.controller";

const router = Router();

router.post("/", authMiddleware, mariiaNotifyController.notify);

export default router;
