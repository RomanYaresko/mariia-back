import * as nodemailer from "nodemailer";
import { setDefaultResultOrder } from "node:dns";
import { env } from "@/config/env";

setDefaultResultOrder("ipv4first");

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  connectionTimeout: 60_000,
  greetingTimeout: 60_000,
  socketTimeout: 60_000,
});
