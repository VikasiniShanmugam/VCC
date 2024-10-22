import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializing Express app
const app = express();

// Middleware to receive JSON
app.use(express.json());

// Adding the API end-points and the route handlers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// MongoDB connection URL
const mongoUrl = "mongodb+srv://vikasinishanmugam21:1234@cluster0.bq61k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connecting to MongoDB using Mongoose
mongoose
  .connect(mongoUrl, {
    dbName: "demo_db", 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Connected to DB successfully");

    // Listening to requests if DB connection is successful
    app.listen(4000, () => 
      console.log("Listening on port 4000")
    );
  })
  .catch((err) => console.log(err));
