const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1/glb-store")
var db=mongoose.connection
db.on("error",console.error.bind("error"))
db.once("open",()=>{
    console.log("db connection successfull");
    
})
module.exports=db