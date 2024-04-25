import aws from 'aws-sdk'
import s3 from '../config/s3.config'

// here in the next line bucketname is the name where i am storing the data
// key is unique for every photo or body can say from the user
// body is the data that ie the file or the photo is uploading 
export const s3FileUpload = async({bucketName, key , body,ContentType})=>{

    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType

    }).promise
}


// now to delete a file 
export const s3deletefile = async({bucketName, key })=>{
    return await s3.deleteObject({
        Bucket : bucketName,
        Key : key ,
        
    }).promise
}