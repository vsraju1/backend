import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

//configure cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});

const uploadOnCloudinary = async (localFileUrl) => {
    try {
        if (!localFileUrl) {
            return null
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFileUrl, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFileUrl) // remove the locally saved file as the upload operation got failed
        return null
    }
}

export {uploadOnCloudinary}


