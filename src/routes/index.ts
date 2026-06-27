import { Router } from "express";
import userRoutes from "@/routes/user.routes";
import authRoutes from "@/routes/auth.routes";
import mariiaStepRoutes from "@/routes/mariiaStep.routes";
import mariiaNotifyRoutes from "@/routes/mariiaNotify.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/mariia-steps", mariiaStepRoutes);
router.use("/auth", authRoutes);
router.use("/mariia-notify", mariiaNotifyRoutes);

export default router;
