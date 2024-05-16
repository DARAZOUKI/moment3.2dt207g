// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.static('src'));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workexperiences', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for work experiences
const workExperienceSchema = new mongoose.Schema({
    companyname: String,
    jobtitle: String,
    location: String,
    startdate: Date,
    enddate: Date,
    description: String
});

// Create model based on schema
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

// Routes
// GET all work experiences
app.get('/workexperiences', async (req, res) => {
    try {
        const workExperiences = await WorkExperience.find();
        res.json(workExperiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new work experience
app.post('/workexperiences', async (req, res) => {
    const newWorkExperience = new WorkExperience(req.body);
    try {
        await newWorkExperience.save();
        res.status(201).json({ message: 'Work experience added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT (update) a work experience
app.put('/workexperiences/:id', async (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    try {
        // Check if the ID parameter is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        // Find the document by ID and update its fields
        const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(id, {
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description
        });

        // Check if the document was found and updated
        if (!updatedWorkExperience) {
            return res.status(404).json({ error: 'Work experience not found' });
        }

        res.json({ message: 'Work experience updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a work experience
app.delete('/workexperiences/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the ID parameter is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // Find the document by ID and delete it
        const deletedWorkExperience = await WorkExperience.findByIdAndDelete(id);

        // Check if the document was found and deleted
        if (!deletedWorkExperience) {
            return res.status(404).json({ error: 'Work experience not found' });
        }

        res.json({ message: 'Work experience deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
