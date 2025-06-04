const Asesor = require('../models/Asesor');

exports.getAllAsesores = async (req, res) => {
  try {
    const asesores = await Asesor.find();
    res.json(asesores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAsesor = async (req, res) => {
  try {
    const asesor = new Asesor(req.body);
    const nuevoAsesor = await asesor.save();
    res.status(201).json(nuevoAsesor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAsesor = async (req, res) => {
  try {
    const asesor = await Asesor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(asesor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAsesor = async (req, res) => {
  try {
    await Asesor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asesor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAsesorById = async (req, res) => {
  try {
    const asesor = await Asesor.findById(req.params.id);
    if (!asesor) {
      return res.status(404).json({ message: 'Asesor no encontrado' });
    }
    res.json(asesor);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}
