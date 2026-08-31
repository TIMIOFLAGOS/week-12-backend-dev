import express from "express";
import { createStudent, getAllStudents,   deleteStudent,    getStudentById, updateStudent,  filterStudentByDepartment,
  sortStudents} from "../controllers/student.js";






const router = express.Router();

router.post("/register", createStudent);
router.get("/", getAllStudents);
router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);
        
router.get("/department/:department", filterStudentByDepartment);
router.get("/sort", sortStudents);
router.get("/:id", getStudentById);
export default router;