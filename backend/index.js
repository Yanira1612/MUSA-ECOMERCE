const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la BD
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));


// Ruta de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//RUTAS DE USUARIOS
const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);


// Rutas
const obrasRoutes = require('./routes/obras');
app.use('/api/obras', obrasRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
