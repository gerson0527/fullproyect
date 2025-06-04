const { Objetivo, Asesor } = require('../models');

const objetivoController = {
  getAllObjetivos: async (req, res) => {
    try {
      const objetivos = await Objetivo.findAll({
        include: [{ model: Asesor }]
      });
      res.json(objetivos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getObjetivoById: async (req, res) => {
    try {
      const objetivo = await Objetivo.findByPk(req.params.id, {
        include: [{ model: Asesor }]
      });
      if (objetivo) {
        res.json(objetivo);
      } else {
        res.status(404).json({ message: 'Objetivo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getObjetivosByAsesor: async (req, res) => {
    try {
      const objetivos = await Objetivo.findAll({
        where: { asesorId: req.params.asesorId },
        include: [{ model: Asesor }]
      });
      res.json(objetivos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createObjetivo: async (req, res) => {
    try {
      const objetivo = await Objetivo.create(req.body);
      res.status(201).json(objetivo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateObjetivo: async (req, res) => {
    try {
      const objetivo = await Objetivo.findByPk(req.params.id);
      if (objetivo) {
        await objetivo.update(req.body);
        res.json(objetivo);
      } else {
        res.status(404).json({ message: 'Objetivo no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteObjetivo: async (req, res) => {
    try {
      const objetivo = await Objetivo.findByPk(req.params.id);
      if (objetivo) {
        await objetivo.destroy();
        res.json({ message: 'Objetivo eliminado' });
      } else {
        res.status(404).json({ message: 'Objetivo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = objetivoController;