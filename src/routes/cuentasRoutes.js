const express = require('express');
const router = express.Router();
const {
  getAllCuentas,
  getCuentaById,
  searchCuentas,
  getCuentasBalance
} = require('../controllers/cuentasController');

router.get('/cuentas', getAllCuentas);
router.get('/cuenta/:id', getCuentaById);
router.get('/cuentasQuery', searchCuentas);
router.get('/cuentasBalance', getCuentasBalance);

module.exports = router;