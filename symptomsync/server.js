const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://srinidhi:nidhineha123@players.m5m7g.mongodb.net/?retryWrites=true&w=majority&appName=Players');

// Symptom Schema
const symptomSchema = new mongoose.Schema({
    name: String,
    description: String,
    severity: { type: String, enum: ['Mild', 'Moderate', 'Severe'] },
    duration: { type: Number, required: true }, // duration as number
    durationUnit: { type: String, enum: ['Hours', 'Days', 'Weeks'], required: true },
    associatedConditions: [String],
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: { type: Date, default: Date.now }
});

const Symptom = mongoose.model('Symptom', symptomSchema);

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    contactNumber: String,
    address: String,
    dateOfBirth: Date
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, firstName, lastName, age, gender, contactNumber, address, dateOfBirth } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({
            email,
            password,
            firstName,
            lastName,
            age,
            gender,
            contactNumber,
            address,
            dateOfBirth
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error });
    }
});



// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Should be "Bearer token"
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

app.get('/api/patient/profile', protect, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Patient not found' });
    res.json(user);
});


app.patch('/api/patient/profile', protect, async (req, res) => {
    const { firstName, lastName, age, gender, contactNumber, address, dateOfBirth } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, age, gender, contactNumber, address, dateOfBirth },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'Patient not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

// Protected Routes (Symptom CRUD)
app.post('/symptoms', protect, async (req, res) => {
    const { name, description, severity, duration, durationUnit, associatedConditions } = req.body;

    if (!name || !description || !severity || !duration || !durationUnit) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const symptom = new Symptom({
        name,
        description,
        severity,
        duration,
        durationUnit,
        associatedConditions
    });

    try {
        await symptom.save();
        res.status(201).send(symptom);
    } catch (error) {
        res.status(500).json({ message: 'Error saving symptom', error });
    }
});

app.get('/symptoms', protect, async (req, res) => {
    const symptoms = await Symptom.find();
    res.send(symptoms);
});

app.get('/symptoms/:id', protect, async (req, res) => {
    const symptom = await Symptom.findById(req.params.id);
    if (!symptom) return res.status(404).send();
    res.send(symptom);
});

app.patch('/symptoms/:id', protect, async (req, res) => {
    const { name, description, severity, duration, durationUnit, associatedConditions } = req.body;
    const updatedSymptom = await Symptom.findByIdAndUpdate(
        req.params.id,
        { name, description, severity, duration, durationUnit, associatedConditions },
        { new: true }
    );
    if (!updatedSymptom) return res.status(404).send();
    res.send(updatedSymptom);
});

app.delete('/symptoms/:id', protect, async (req, res) => {
    const symptom = await Symptom.findByIdAndDelete(req.params.id);
    if (!symptom) return res.status(404).send();
    res.send(symptom);
});

app.delete('/symptoms', async (req, res) => {
    await Symptom.deleteMany({});
    res.status(200).send({ message: 'All symptoms deleted' });
});

app.delete('/users', async (req, res) => {
    await User.deleteMany({});
    res.status(200).send({ message: 'All symptoms deleted' });
});

app.listen(8080, () => console.log('Server running on port 8080'));
