import '../processors/mailProcessor.js'

import mailQueue from '../queues/mailQueue.js'

export const addEmailtoMailQueue = async (emailData) => {
  console.log('Initiating email sending process')
  try {
    console.log('addEmailtoMailQueue payload:', emailData)
    const job = await mailQueue.add(emailData)
    console.log('email added to queue, job id=', job.id)
    return job
  } catch (error) {
    console.log('addEmailtoMailQueue error', error)
    throw error
  }
}

// import mailQueue from '../queues/mailQueue.js'

// export const addEmailtoMailQueue = async (emailData) => {
//   try {
//     console.log('addEmailtoMailQueue payload:', emailData);
//     const job = await mailQueue.add(emailData, {
//       attempts: 5,
//       backoff: { type: 'exponential', delay: 5000 }
//     });
//     console.log('email added to queue, job id=', job.id);
//     return job;
//   } catch (error) {
//     console.error('addEmailtoMailQueue error', error);
//     throw error;
//   }
// }
