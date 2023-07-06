const mongoose=require('mongoose')
const webScrap=mongoose.Schema({
    urlName:{
        type:String,
        required:[true,"URL field must be filled"]
    },
    wordCount:{
        type:Number
        
    },
    linksInPages:{
        type:[String],
        
    },
    mediaLinks:{
        type:[String]
    },
    Favourite:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('ScrapDetails',webScrap)