// import {mongoose} from "mongoose";

// const authSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 100,
//     },
//     lastname: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 100,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minLength: 8,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const Auth = mongoose.model("Auth", authSchema);

// export default Auth;



import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;