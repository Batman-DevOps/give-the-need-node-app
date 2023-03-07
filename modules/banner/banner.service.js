const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Banner = db.Banner;

require('dotenv').config();
const AWS = require('aws-sdk');
const ID = process.env.ID;
const SECRET = process.env.SECRET;
// The name of the bucket that you have created
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "us-east-1"
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    uploadProfilePicture,
    delete: _delete
};

async function getAll(filter) {
    return await Banner.find(filter);
}

async function getById(id) {
    return await Banner.findById(id);
}

function create(banner) {
    return new Promise((resolve, reject) => {
        try {
            
            Banner.create(banner, function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function update(banner) {
    return await Banner.findByIdAndUpdate(banner._id, banner);
}

async function uploadProfilePicture(bannerId, bannerParam) {

    return new Promise(async (resolve, reject) => {
        let bannerUpdateResult = await update(bannerId, bannerParam);
        if (bannerUpdateResult) {
            let fileUploadResult = await uploadFile(bannerParam);
            Banner.updateOne(
                { _id: bannerId },
                { profilePicDetails: fileUploadResult }
            ).exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
        }
    });
}

const uploadFile = (req) => {
    return new Promise(async (resolve, reject) => {
        let file = req.file;
        let fileName = `${(new Date().toJSON().slice(0, 19))}_` + file.originalname;
        // Read content from the file
        const fileContent = file.buffer.toString();
        // const fileContent = fs.readFileSync(file.originalname, 'utf8');

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: file.buffer
        };

        // Uploading files to the bucket
        s3.upload(params, function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

async function _delete(id) {
    await Banner.findByIdAndRemove(id);
}