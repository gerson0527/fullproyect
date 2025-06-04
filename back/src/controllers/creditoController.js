const Credito = require('../models/Credito');

exports.getCreditos = async (req, res) => {
  try {
    const creditos = await Credito.find()
      .populate('cliente')
      .populate('asesor')
      .populate('banco');
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCredito = async (req, res) => {
  try {
    const credito = new Credito(req.body);
    const nuevoCredito = await credito.save();
    res.status(201).json(nuevoCredito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCredito = async (req, res) => {
  try {
    const credito = await Credito.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(credito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCredito = async (req, res) => {
  try {
    await Credito.findByIdAndDelete(req.params.id);
    res.json({ message: 'Crédito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCreditosByCliente = async (req, res) => {
  try {
    const creditos = await Credito.find({ cliente: req.params.clienteId })
      .populate('asesor')
      .populate('banco');
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCreditosByAsesor = async (req, res) => {
  try {
    const creditos = await Credito.find({ asesor: req.params.asesorId })
      .populate('cliente')
      .populate('banco');
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCreditoById = async (req, res) => {
  try {
    const credito = await Credito.findById(req.params.id)
     .populate('cliente')
     .populate('asesor')
     .populate('banco');
    res.json(credito);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

exports.getAllCreditos = async (req, res) => {
  try {
    const creditos = await Credito.find()
     .populate('cliente')
     .populate('asesor')
     .populate('banco');
    res.json(creditos);

  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}