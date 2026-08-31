// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema(
//   {
//     // Using name property while adding firstName/lastName support for virtual fullName
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       maxlength: [100, "Name cannot exceed 100 characters"],
//       trim: true,
//     },
//     department: {
//       type: String,
//       required: [true, "Department is required"],
//       trim: true,
//     },
//     age: {
//       type: Number,
//       required: [true, "Age is required"],
//       min: [15, "Age must be at least 15"],
//       max: [100, "Age cannot exceed 100"],
//     },
//     cgpa: {
//       type: Number,
//       required: [true, "CGPA is required"],
//       min: [0.0, "CGPA cannot be negative"],
//       max: [5.0, "CGPA cannot exceed 5.0"],
//     },
//     registrationDate: {
//       type: Date,
//       default: Date.now,
//     },
//     // Relationship: Link to Course model via ObjectId array
//     courses: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // 1. Virtual Full Name Property (capitalizes/formats name output)
// studentSchema.virtual("fullName").get(function () {
//   return this.name ? this.name.toUpperCase() : "";
// });

// // 2. Pre-save Logging Hook
// studentSchema.pre("save", function (next) {
//   console.log(`[HOOK] Saving student: ${this.name} (${this.department})`);
//   next();
// });

// const Student = mongoose.model("Student", studentSchema);

// export default Student;






import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [15, "Age must be at least 15"],
      max: [100, "Age cannot exceed 100"],
    },
    cgpa: {
      type: Number,
      required: [true, "CGPA is required"],
      min: [0.0, "CGPA cannot be negative"],
      max: [5.0, "CGPA cannot exceed 5.0"],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    // Relationship: Link to Course model via ObjectId array
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 1. Virtual Full Name Property
studentSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// 2. Pre-save Logging Hook
studentSchema.pre("save", function (next) {
  console.log(`[HOOK] Saving student: ${this.firstname} ${this.lastname} (${this.department})`);
  ;
});

// Prevents Mongoose overwrite/cache errors during hot reloads
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;