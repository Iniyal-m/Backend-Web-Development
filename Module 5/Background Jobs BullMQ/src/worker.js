
'use strict';

const { Worker } = require('bullmq');
const { connection } = require('./queue');
const { transporter } = require('./email');

const worker = new Worker(
  'email',
  async (job) => {
    if (job.name === 'otp') {
      const { email, otp } = job.data;

      await transporter.sendMail({
        to: email,
        subject: 'Email Verification OTP',
        text: `Your verification OTP is ${otp}. It expires in 10 minutes.`
      });
    }
  },
  {
    connection,
    settings: {
      backoffStrategy: (attemptsMade) => 1000 * Math.pow(2, attemptsMade - 1)
    }
  }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});

module.exports = worker;
