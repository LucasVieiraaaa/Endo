require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3019;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    choice: String
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    const { name, email, phone, choice } = req.body;
    console.log('Received data:', { name, email, phone, choice });
    const user = new Users({
        name,
        email,
        phone,
        choice
    });
    try {
        await user.save();
        console.log('User saved:', user);
        res.json({ message: "Form Submission Successful" });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: "Error saving user" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
