import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to the database

  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

startServer().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
