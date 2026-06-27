import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/config/swagger";
import apiRoutes from "@/routes/index";
import { env } from "@/config/env";
import { GENERAL_MESSAGES } from "@/constants/messages/general.messages";

const app = express();
const corsAllowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (
      corsAllowedOrigins.includes("*") ||
      corsAllowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(GENERAL_MESSAGES.CORS_ORIGIN_NOT_ALLOWED));
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", apiRoutes);
app.use(
  "/",
  helmet({ contentSecurityPolicy: false }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
