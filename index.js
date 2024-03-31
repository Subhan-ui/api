const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const jwt = require('jsonwebtoken');

const URI =
  "mongodb+srv://Subhan:subhanshoukat@cluster0.irhschr.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    dbName: "Users",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Some Error occurred: " + err.message);
  });

app.listen(port, () => {
  console.log("app is listening on port: " + port);
});

const User = require("./models/user");
const Student = require("./models/student");

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, name, agno, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    } else {
      const newUser = new User({ email, name, agno, password });
      await newUser.save();
      console.log("Successfully created new user");
      return res.status(200).json({ message: "Successfully created new user" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error occured: " });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Your do not have an account with this email");
      return res.status(400).json({
        message: "we don't have an account registered with this email",
      });
    } else if (user.password !== password) {
      return res.status(403).json({ message: "Invalid password" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Login failed" + error.message });
  }
});

app.get("/details/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.type("application/json");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Login failed" + error.message });
  }
});

app.post("/mark", async (req, res) => {
  const { name, agno, time } = req.body;
  console.log([name, agno, time]);
  try {
    const newStudent = new Student({ name, agno, time });
    await newStudent.save();
    res.status(200).json({ message: "Your attendance is marked" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while marking your attendance" });
  }
});

app.get("/getAttendance", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ message: "You can see your attendace" });
  } catch (error) {
    res.status(500).json({ message: "Error occured: " + error.message });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: "Your all data is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occured: " + error.message });
  }
});

// Below code is related to schedule only
const Schedule = require("./models/schedule");
app.post("/addSchedule", async (req, res) => {
  const { day, classRoom, time, degree, teacher, course } = req.body;
  console.log([day, classRoom, time, degree, teacher, course]);
  try {
    const newSchedule = new Schedule({
      day,
      classRoom,
      time,
      degree,
      teacher,
      course,
    });
    await newSchedule.save();
    console.log("new schedule saved");
    res.status(200).json({ message: "Schedule is added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("unable to save schedule");
  }
});

app.get("/getSchedule", async (req, res) => {
  try {
    const schedule = await Schedule.find({});
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
