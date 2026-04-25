const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./users.json";

// Read users
const getUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
};

// Save users
const saveUsers = (users) =>
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

/* ---------------- SIGNUP ---------------- */
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const users = getUsers();

  const exists = users.find((u) => u.email === email);

  if (exists) {
    return res
      .status(400)
      .json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    role: role || "Employee",
  };

  users.push(newUser);
  saveUsers(users);

  res.json({ message: "Signup successful" });
});

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    user: {
      name: user.name,
      role: user.role,
      email: user.email,
    },
    token,
  });
});

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
});

app.set("io", io);

server.listen(process.env.PORT, () =>
  console.log("Server running on 5000")
);