import { Job, Queue, Worker } from "bullmq";
import { redisConnection, defaultQueueOptions } from "../config/queue.js";
import { sendMail } from "../config/mail.js";

interface QueueEmailJobDataType {
  to: string;
  subject: string;
  body: string;
}

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

//Worker

export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data: QueueEmailJobDataType = job.data;
    console.log("The data in the queue is : ", data);
    await sendMail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  }
);
