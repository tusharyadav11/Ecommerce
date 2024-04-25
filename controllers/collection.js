 import collections from '../models/collections'
 import asynchandler from '../services/asynchandler'
 import customError from '../utils/customError'

 // creating the collection 
 export const createCollection = asynchandler(async (req,res)=>{
    // take the name from the frontend 
const  {name} = req.body
if(!name){
    throw new customError('name of the collection is mandatory ',400)  
}

// now taken the name and now we have to put it to the databsse
   const collectionname=  await Collection.create({
        name 
    })

    // throwing it now to the frontend
    res.status(200).json({
        success: true,
        message: "collection thrown with success",
        collectionname
    })

 })

 // now updating the value 
 export const updateCollection = asynchandler(async(req,res)=>{
        // existing value to be updated
    const {id: collectionId} = req.params
        // creating new value and adding 
        const  {name} = req.body
if(!name){
    throw new customError('name of the collection is mandatory ',400)  
}
    let updatedCollectionname= await  Collection.findByIdAndUpdate(
        collectionId,
        {name},
    
        {new: true,
        runValidators: true} 
    )
    if(!updatedCollectionname){
        throw new customError('collection name is not updateda as collectionId does not found in database',400)
    
    }
    // send response to the frontend 
    res.status(200).json({
        success: true,
        message: 'collection updated successfully  ',
        updateCollection
    })
 })

 // deleting the collection 
 export const deleteCollection = asynchandler(async(req,res)=>{
    const {id: collectionId} = req.params
    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)
    if(!collectionToDelete){
        throw new customError('collection id is not found in the  database',400)
    }

    collectionToDelete.remove()    // just removing the allocated space 
    res.status(200).json({
        success: true,
        message: 'collection deleted successfully  ',
        
    })
 })

// user is asking for all the connections 
export const getAllCollections = asynchandler(async(req,res)=>{
   const collectionsAll=  await Collection.find()

   if(!collectionsAll){
    throw new customError('No Collections found ',400)
   }
   res.status(200).json({
    status: true,
    message: 'all the data collections ',
    collectionsAll

   })

})

