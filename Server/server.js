import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================
app.use(cors());

app.use(express.json());


// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(err);

  });


// ================= USER SCHEMA =================
const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model(
  "User",
  userSchema
);


// ================= TASK SCHEMA =================
const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Pending",
      },

      priority: {
        type: String,
        default: "Medium",
      },

      dueDate: {
        type: String,
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const Task = mongoose.model(
  "Task",
  taskSchema
);


// ================= AUTH MIDDLEWARE =================
const authMiddleware = (
  req,
  res,
  next
) => {

  const token =
    req.headers.authorization;

  if (!token) {

    return res.status(401).json({
      message: "No Token",
    });

  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token",
    });

  }
};


// ================= HOME =================
app.get("/", (req, res) => {

  res.send(
    "SyncTask Backend Running 🚀"
  );

});


// ================= REGISTER =================
app.post(
  "/api/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({
          message:
            "User Already Exists",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

      res.status(201).json({
        message:
          "Register Successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);


// ================= LOGIN =================
app.post(
  "/api/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          message:
            "User Not Found",
        });

      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Password",
        });

      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);


// ================= GET TASKS =================
app.get(
  "/api/tasks",
  authMiddleware,
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          userId:
            req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(tasks);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);


// ================= ADD TASK =================
app.post(
  "/api/tasks",
  authMiddleware,
  async (req, res) => {

    try {

      const newTask =
        await Task.create({
          title:
            req.body.title,

          priority:
            req.body.priority,

          dueDate:
            req.body.dueDate,

          userId:
            req.user.id,
        });

      res.status(201).json(
        newTask
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);


// ================= UPDATE TASK =================
app.put(
  "/api/tasks/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,

          {
            title:
              req.body.title,

            status:
              req.body.status,

            priority:
              req.body.priority,

            dueDate:
              req.body.dueDate,
          },

          {
            new: true,
          }
        );

      res.json(updatedTask);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Update Failed",
      });

    }
  }
);


// ================= DELETE TASK =================
app.delete(
  "/api/tasks/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Delete Failed",
      });

    }
  }
);


// ================= SERVER =================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});