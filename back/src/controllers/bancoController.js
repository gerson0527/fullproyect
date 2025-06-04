const Banco = require('../models/Banco');

exports.getBancos = async (req, res) => {
  try {
    const bancos = await Banco.find();
    res.json(bancos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBanco = async (req, res) => {
  try {
    const banco = new Banco(req.body);
    const nuevoBanco = await banco.save();
    res.status(201).json(nuevoBanco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBanco = async (req, res) => {
  try {
    const banco = await Banco.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(banco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanco = async (req, res) => {
  try {
    await Banco.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banco eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBancoById = async (req, res) => {
  try {
    const banco = await Banco.findById(req.params.id);
    res.json(banco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};