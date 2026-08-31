

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  department: {
    type: String,
    required: true,
    unique: true,
  },
 
  salary: {
    type: Number,
    required: true,
    min: 0,
    max: 500000,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;