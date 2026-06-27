import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { mariiaStepController } from "@/controllers/mariiaStep.controller";

const router = Router();

router.get("/head", authMiddleware, mariiaStepController.getHead);
router.get("/:id", authMiddleware, mariiaStepController.getById);

export default router;
