const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Ruta para obtener todos los usuarios (solo para pruebas)
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
});

module.exports = router;
