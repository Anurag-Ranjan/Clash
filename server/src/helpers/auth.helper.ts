import { ZodError } from "zod";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { emailQueue, emailQueueName } from "../jobs/EmailJobs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const formatError = (error: ZodError) => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message || null;
  });

  return errors;
};

export const formatMailBody = async (
  fileName: string,
  payload: {},
  sendTo: string,
  subject: string
) => {
  const html = await ejs.renderFile(
    __dirname + `/../views/emails/${fileName}.ejs`,
    payload
  );

  await emailQueue.add(emailQueueName, {
    to: sendTo,
    subject: subject,
    body: html,
  });
};
