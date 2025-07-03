const express = require('express');
const router = express.Router();
const Obra = require('../models/obra');

// Obtener todas las obras
router.get('/', async (req, res) => {
    try {
        const obras = await Obra.find();
        res.json(obras);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Crear una nueva obra
router.post('/', async (req, res) => {
    const obra = new Obra({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        artista: req.body.artista,
        estado: req.body.estado
    });

    try {
        const nuevaObra = await obra.save();
        res.status(201).json(nuevaObra);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;