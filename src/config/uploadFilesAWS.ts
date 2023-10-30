import multer, { Options } from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { S3Client } from '@aws-sdk/client-s3';

const mb = 1024 * 1024;

// TODO: Put real data
const s3Config = new S3Client({
	region: 'us-west-1',
	credentials: {
		accessKeyId: '',
		secretAccessKey: '',
	},
});

const option: Options = {
	storage: multerS3({
		s3: s3Config,
		bucket: 'BUCKET_NAME', // TODO
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
