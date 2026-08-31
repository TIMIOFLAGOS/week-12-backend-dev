// import express from "express"
// import { loginUser, registerUser } from "../controllers/auth.js"
// import { authenticate, authorize } from "../middleware/authmiddleware.js";
// const router = express.Router()

// router.post("/register", registerUser)
// router.post("/login", loginUser)


// // Protected profile route (Any logged-in user)
// router.get("/profile", authenticate, getUserProfile);

// // Example: Admin-only profile route
// router.get("/admin/profile", authenticate, authorize("admin"), getUserProfile);

// export default router


import express from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/auth.js"; // Added getUserProfile
import { authenticate, authorize } from "../middleware/authmiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile route (Any logged-in user)
router.get("/profile", authenticate, getUserProfile);

// Admin-only profile route
router.get("/admin/profile", authenticate, authorize("admin"), getUserProfile);

export default router;