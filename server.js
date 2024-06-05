//server.js
// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create an Express application
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Define the Schema for Work Experience
const workExperienceSchema = new mongoose.Schema({
  companyname: { type: String, required: true },
  jobtitle: { type: String, required: true },
  location: String,
  startdate: Date,
  enddate: Date,
  description: String,
});

// Create a model for Work Experience using the schema
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

// Routes
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'src')));

// Routes for API
// Define your API routes here



// GET all work experiences
app.get('/workexperiences', async (req, res) => {
  try {
    const workExperiences = await WorkExperience.find();
    res.json(workExperiences);
  } catch (error) {
    console.error('Error retrieving work experiences:', error);
    res.status(500).json({ error: 'An error occurred while retrieving work experiences' });
  }
});

// POST a new work experience
app.post('/workexperiences', async (req, res) => {
  const newWorkExperience = req.body;

  try {
    const workExperience = await WorkExperience.create(newWorkExperience);
    res.status(201).json({ message: 'Work experience added successfully', id: workExperience._id });
  } catch (error) {
    console.error('Error adding new work experience:', error);
    res.status(500).json({ error: 'An error occurred while adding new work experience' });
  }
});

// PUT (update) a work experience
app.put('/workexperiences/:id', async (req, res) => {
  const id = req.params.id;
  const updatedWorkExperience = req.body;

  try {
    await WorkExperience.findByIdAndUpdate(id, updatedWorkExperience);
    res.json({ message: 'Work experience updated successfully' });
  } catch (error) {
    console.error('Error updating work experience:', error);
    res.status(500).json({ error: 'An error occurred while updating work experience' });
  }
});

// DELETE a work experience
app.delete('/workexperiences/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await WorkExperience.findByIdAndDelete(id);
    res.json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting work experience:', error);
    res.status(500).json({ error: 'An error occurred while deleting work experience' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
