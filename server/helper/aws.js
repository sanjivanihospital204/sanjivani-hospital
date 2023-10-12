const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require("dotenv").config();

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

const upload = (bucketName) =>
    multer({
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `image-${Date.now()}.jpeg`);
            },
        })
    });

module.exports = {
    upload
};