const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}