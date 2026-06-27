import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "@/config/openapi";
import "@/docs";

const generator = new OpenApiGeneratorV3(registry.definitions);

const swaggerSpec = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Mariia Back API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],
});

export default swaggerSpec;
