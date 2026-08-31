import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
    departmentName:{
        type:String,
        required: true,
    },
       duration:{
    type:Number,
        required: true,
       }
    ,
instructor:{
       type:String,
        required: true,
}
 
})

const department = mongoose.model("department",departmentSchema);
export default department;