require('dotenv').config(); // Adicione esta linha no início do arquivo

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3019;

// Serve arquivos estáticos da pasta onde o server.js está localizado
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Conectar ao MongoDB usando a connection string do arquivo .env
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

// Configuração do esquema e modelo do MongoDB
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    choice: String
});

const Users = mongoose.model("data", userSchema);

// Rota para servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para manipular o formulário
app.post('/post', async (req, res) => {
    const { name, email, phone, choice } = req.body;
    const user = new Users({
        name,
        email,
        phone,
        choice
    });
    await user.save();
    console.log(user);
    res.send("Form Submission Successful");
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});