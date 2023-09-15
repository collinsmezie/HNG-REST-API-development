const express = require("express");
const userModel = require("./models");
const app = express();

//Create user
app.post("/api/add_user", async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ error: "person name is required." });
  }

  const user = new userModel({ name });

  try {
    await user.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(500).send(error);
  }
});


// Get all users
app.get("/api/users", async (request, response) => {
  try {
    const users = await userModel.find({});
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Get a single user by ID
app.get("/api/users/:id", async (request, response) => {
  const userId = request.params.id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).send("User not found");
    }
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Update a single user by ID
app.put("/api/users/:id", async (request, response) => {
  const userId = request.params.id;
  const updateData = request.body;

  try {
    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return response.status(404).send("User not found");
    }
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Delete a single user by ID
app.delete("/api/users/:id", async (request, response) => {
  const userId = request.params.id;

  try {
    const user = await userModel.findByIdAndRemove(userId);
    if (!user) {
      return response.status(404).send("User not found");
    }
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
