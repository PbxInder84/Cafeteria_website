import { Storage } from '@google-cloud/storage';
import path from 'path';

// Path to your service account key file
const serviceKeyPath = path.join(__dirname, 'google-service-account.json'); // Adjust the path if needed

// Instantiate a Google Cloud Storage client
const storage = new Storage({
  keyFilename: serviceKeyPath,  // Path to the service account key JSON
});

const bucket = storage.bucket('your-bucket-name'); // Replace with your bucket name

export { storage, bucket };
