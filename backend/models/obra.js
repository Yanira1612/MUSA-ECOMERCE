const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    imagen: { type: String }, // URL o nombre de archivo de la imagen
    categoria: { type: String },
    artista: { type: String }, // Para simplificar, solo el nombre o ID del artista
    estado: { type: String, default: 'Disponible' } // Disponible, Vendida, En negociación, etc.
}, {
    timestamps: true
});

module.exports = mongoose.model('Obra', ObraSchema);
