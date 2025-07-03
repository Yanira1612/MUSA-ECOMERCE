const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar usuario (artista o comprador)
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al registrar' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'secreto123', { expiresIn: '1h' });

        res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});

module.exports = router;
