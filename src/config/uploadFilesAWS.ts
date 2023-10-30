import 'dotenv/config';

import crypto from 'crypto';
import multer, { Options } from 'multer';
import multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';

const mb = 1024 * 1024;

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !bucketName)
	throw new Error('Invalid AWS config in .env file'); // TODO: Create custom error

const s3Config = new S3Client({
	region: 'us-west-1',
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	},
});

const option: Options = {
	storage: multerS3({
		s3: s3Config,
		bucket: bucketName,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: (_, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);
				const fileName = `uploads/${hash.toString('hex')}-${
					file.originalname
				}`;
				cb(null, fileName);
			});
		},
	}),
	limits: { fileSize: 5 * mb },
};

const upload = multer(option);

export default upload;
