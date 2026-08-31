// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import mongoose from "mongoose";
// import dns from "node:dns"; // 1. Import Node's DNS module

// // 2. Force Node.js to use Google and Cloudflare DNS resolvers
// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// import { MONGO_URI, PORT } from "./config/config.js";

// import studentRoutes from "./routes/routes.js";

// import authRoutes from "./routes/routes.js"





// import employeeRoutes from "./routes/employee.js";




// const app = express();

// // Middleware
// app.use(express.json({ limit: "30mb" }));
// app.use(cors());
// app.use(morgan("dev"));

// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);

//     console.log(
//       "<========= DATABASE CONNECTED SUCCESSFULLY =======>"
//     );
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//   }
// };

// // Routes
// app.use("/api/v1/student", studentRoutes);
// app.use("/api/v1/auth", authRoutes);






// app.use("/api/v1/employee", employeeRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
//   connectDB();
// });



import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dns from "node:dns";

// Force Node.js to use IPv4 DNS resolution for MongoDB Atlas stability
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { MONGO_URI, PORT } from "./config/config.js";

// Route Imports
import studentRoutes from "./routes/routes.js";
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employee.js";

const app = express();

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(cors());
app.use(morgan("dev"));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `<========= DATABASE CONNECTED SUCCESSFULLY: ${conn.connection.name} =======>`
    );
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

// API Routes
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", employeeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDB();
});