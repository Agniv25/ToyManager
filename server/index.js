const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
// const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for authorization
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Add a new toy
app.post("/toys", authenticateToken, async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const toy = await prisma.toy.create({
      data: { name, description, price: parseFloat(price) },
    });
    res.status(201).json(toy);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Get toy information by name
app.get("/toys", async (req, res) => {
  try {
    const data = await prisma.toy.findMany();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
app.get("/toys/:name", async (req, res) => {
  const { name } = req.params;

  const toy = await prisma.toy.findUnique({
    where: { name },
  });

  if (!toy) {
    return res.status(404).json({ error: "Toy not found" });
  }

  res.json(toy);
});

// Modify toy information
app.put("/toys/:name", authenticateToken, async (req, res) => {
  const { name } = req.params;
  const { description, price } = req.body;

  try {
    const toy = await prisma.toy.update({
      where: { name },
      data: { description, price: parseFloat(price) },
    });
    res.json(toy);
  } catch (error) {
    res.status(404).json({ error: "Toy not found" });
  }
});

// Delete a toy
app.delete("/toys/:name", authenticateToken, async (req, res) => {
  const { name } = req.params;

  try {
    await prisma.toy.delete({
      where: { name },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Toy not found" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
