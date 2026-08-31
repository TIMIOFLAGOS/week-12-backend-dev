// import Student from "../model/student.js";
// import bcrypt from "bcrypt";

// // Helper to escape special regex characters and prevent ReDoS attacks
// const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// /**
//  * Create a new student
//  * @param {*} req
//  * @param {*} res
//  */
// export const createStudent = async (req, res) => {
//   try {
//     const { name, department, cgpa, age, password, courses } = req.body;

//     // Hash password if provided
//     let hashedPassword;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(password, salt);
//     }

//     const newStudent = new Student({
//       name,
//       department,
//       cgpa,
//       age,
//       password: hashedPassword,
//       courses,
//     });

//     const savedStudent = await newStudent.save();

//     res.status(201).json({
//       savedStudent,
//       message: "<==========Student created successfully==========>",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating student",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Get all students
//  * @param {*} req
//  * @param {*} res
//  */
// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find().populate("courses");

//     res.status(200).json({
//       students,
//       message: "<==========Students fetched successfully==========>",
//       data: students,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching students", error: error.message });
//   }
// };

// /**
//  * Get a student by ID
//  * @param {*} req
//  * @param {*} res
//  */
// export const getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const student = await Student.findById(id).populate("courses");

//     if (!student) {
//       return res.status(404).json({
//         message: "Student not found",
//       });
//     }

//     return res.status(200).json({
//       student,
//       message: "<==========Student fetched successfully==========>",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error fetching student",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Update a student
//  * @param {*} req
//  * @param {*} res
//  */
// export const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, department, age, cgpa, password, courses } = req.body;

//     const updateData = { name, department, age, cgpa, courses };

//     // Hash new password if user is updating it
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updateData.password = await bcrypt.hash(password, salt);
//     }

//     const updatedStudent = await Student.findByIdAndUpdate(
//       id,
//       updateData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).populate("courses");

//     if (!updatedStudent) {
//       return res.status(404).json({
//         message: "Student not found",
//       });
//     }

//     res.status(200).json({
//       updatedStudent,
//       message: "<==========Student updated successfully==========>",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating student",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Delete a student
//  * @param {*} req
//  * @param {*} res
//  */
// export const deleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedStudent = await Student.findByIdAndDelete(id);

//     if (!deletedStudent) {
//       return res.status(404).json({
//         message: "Student not found",
//       });
//     }

//     res.status(200).json({
//       deletedStudent,
//       message: "<==========Student deleted successfully==========>",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting student",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Filter students by department with pagination
//  * @param {*} req
//  * @param {*} res
//  */
// export const filterStudentByDepartment = async (req, res) => {
//   try {
//     const { department } = req.params;

//     const page = Math.max(1, parseInt(req.query.page, 10) || 1);
//     const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
//     const skip = (page - 1) * limit;

//     const filter = {
//       department: { $regex: new RegExp(`^${escapeRegex(department)}$`, "i") },
//     };

//     const total = await Student.countDocuments(filter);
//     const students = await Student.find(filter)
//       .populate("courses")
//       .skip(skip)
//       .limit(limit);

//     if (!students || students.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: `No students found in ${department} department.`,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: students.length,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//       data: students,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching students by department",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Sort students with pagination
//  * @param {*} req
//  * @param {*} res
//  */
// export const sortStudents = async (req, res) => {
//   try {
//     const { field = "cgpa", order = "desc" } = req.query;

//     const allowedFields = ["cgpa", "name", "department", "createdAt"];
//     const sortField = allowedFields.includes(field) ? field : "cgpa";
//     const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

//     const page = Math.max(1, parseInt(req.query.page, 10) || 1);
//     const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
//     const skip = (page - 1) * limit;

//     const total = await Student.countDocuments();
//     const students = await Student.find()
//       .populate("courses")
//       .sort({ [sortField]: sortOrder })
//       .skip(skip)
//       .limit(limit);

//     res.status(200).json({
//       success: true,
//       count: students.length,
//       sortBy: sortField,
//       order: order,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//       data: students,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error sorting students",
//       error: error.message,
//     });
//   }
// };



import Student from "../model/student.js";
import bcrypt from "bcrypt";

// Helper to escape special regex characters and prevent ReDoS attacks
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Create / Register a new student
 */
export const createStudent = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      department,
      cgpa,
      age,
      courses,
    } = req.body;

    // Hash password if provided
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newStudent = new Student({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phoneNumber,
      department,
      cgpa,
      age,
      courses,
    });

    const savedStudent = await newStudent.save();

    // Hide password in response
    const studentResponse = savedStudent.toObject();
    delete studentResponse.password;

    res.status(201).json({
      savedStudent: studentResponse,
      message: "<==========Student created successfully==========>",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};

/**
 * Get all students
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("courses")
      .select("-password");

    res.status(200).json({
      students,
      message: "<==========Students fetched successfully==========>",
      data: students,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

/**
 * Get a student by ID
 */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate("courses")
      .select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      student,
      message: "<==========Student fetched successfully==========>",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    });
  }
};

/**
 * Update a student
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      department,
      age,
      cgpa,
      password,
      courses,
    } = req.body;

    const updateData = {
      firstname,
      lastname,
      email,
      phoneNumber,
      department,
      age,
      cgpa,
      courses,
    };

    // Hash new password if updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("courses")
      .select("-password");

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      updatedStudent,
      message: "<==========Student updated successfully==========>",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
};

/**
 * Delete a student
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id).select("-password");

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      deletedStudent,
      message: "<==========Student deleted successfully==========>",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};

/**
 * Filter students by department with pagination
 */
export const filterStudentByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const filter = {
      department: { $regex: new RegExp(`^${escapeRegex(department)}$`, "i") },
    };

    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter)
      .populate("courses")
      .select("-password")
      .skip(skip)
      .limit(limit);

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No students found in ${department} department.`,
      });
    }

    res.status(200).json({
      success: true,
      count: students.length,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching students by department",
      error: error.message,
    });
  }
};

/**
 * Sort students with pagination
 */
export const sortStudents = async (req, res) => {
  try {
    const { field = "cgpa", order = "desc" } = req.query;

    const allowedFields = ["cgpa", "firstname", "lastname", "department", "createdAt"];
    const sortField = allowedFields.includes(field) ? field : "cgpa";
    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const total = await Student.countDocuments();
    const students = await Student.find()
      .populate("courses")
      .select("-password")
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: students.length,
      sortBy: sortField,
      order: order,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sorting students",
      error: error.message,
    });
  }
};