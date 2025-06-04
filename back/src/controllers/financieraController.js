const Financiera = require('../models/Financiera');

exports.getFinancieras = async (req, res) => {
  try {
    const financieras = await Financiera.find();
    res.json(financieras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFinanciera = async (req, res) => {
  try {
    const financiera = new Financiera(req.body);
    const nuevaFinanciera = await financiera.save();
    res.status(201).json(nuevaFinanciera);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFinanciera = async (req, res) => {
  try {
    const financiera = await Financiera.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(financiera);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFinanciera = async (req, res) => {
  try {
    await Financiera.findByIdAndDelete(req.params.id);
    res.json({ message: 'Financiera eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinancieraById = async (req, res) => {
  try {
    const financiera = await Financiera.findById(req.params.id);
    res.json(financiera);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}