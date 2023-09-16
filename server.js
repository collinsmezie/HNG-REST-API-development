const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

const uri = "mongodb+srv://collins:IOODaG8iW9uhBA3E@cluster0.wqhme71.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// Connect to MongoDB Atlas
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    startServer();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

function startServer() {
  const dbName = "HNGx";
  const collectionName = "users";
  const collection = client.db(dbName).collection(collectionName);

  // ... Define your API routes here ...
  app.post('/api/add_user', async (req, res) => {
    const nameValidator = /^[A-Za-z]+$/; 
    try {
      const { name } = req.body;
      if(!name || !nameValidator.test(name)){
        res.status(400).json({ error: 'Name must be a string containing only alphabetic characters' });
        return
      }
      const result = await collection.insertOne({ name });
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Get one user by ID

  app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the URL as a string

  try {
    const user = await collection.findOne({ _id: new ObjectId(userId) }); // Use ObjectId to convert the string to ObjectId
    if (!user) {
      // If no user is found, respond with a 404 Not Found status
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



 // Fetch all users

  app.get('/api/users', async (req, res) => {
    try {
      const users = await collection.find().toArray();
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
  // Update a user by ID
app.put('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body; // Assuming the updated user data is sent in the request body
  
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updatedUser }
      );
  
      if (result.matchedCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Delete a user by ID
app.delete('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(userId) });
  
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Handle errors during MongoDB connection
client.on('error', err => {
  console.error('MongoDB error:', err);
  process.exit(1);
});

