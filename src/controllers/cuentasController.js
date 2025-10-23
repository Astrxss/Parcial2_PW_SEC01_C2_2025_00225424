const cuentas = require('../data/cuentas');

const getAllCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

const getCuentaById = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find(c => c.id === id);
  
  if (cuenta) {
    res.json({
      finded: true,
      account: cuenta
    });
  } else {
    res.json({
      finded: false,
      account: null
    });
  }
};

const searchCuentas = (req, res) => {
  const queryParam = req.query.queryParam;
  
  if (!queryParam) {
    return res.status(400).json({
      error: "Debe proporcionar el parámetro 'queryParam'"
    });
  }

  let resultado = cuentas.filter(c => c.id === queryParam);
  
  if (resultado.length === 0) {
    resultado = cuentas.filter(c => 
      c.name.toLowerCase().includes(queryParam.toLowerCase())
    );
  }
  
  if (resultado.length === 0) {
    resultado = cuentas.filter(c => 
      c.gender.toLowerCase() === queryParam.toLowerCase()
    );
  }

  if (resultado.length === 1) {
    return res.json({
      finded: true,
      account: resultado[0]
    });
  }
  
  if (resultado.length > 1) {
    return res.json({
      finded: true,
      data: resultado
    });
  }
  
  res.json({
    finded: false
  });
};

const getCuentasBalance = (req, res) => {
  const cuentasActivas = cuentas.filter(c => c.isActive === true);
  
  if (cuentasActivas.length === 0) {
    return res.json({
      status: false,
      accountBalance: 0
    });
  }

  const totalBalance = cuentasActivas.reduce((sum, cuenta) => {
    const balance = parseFloat(cuenta.balance.replace(/[$,]/g, ''));
    return sum + balance;
  }, 0);

  res.json({
    status: true,
    accountBalance: totalBalance.toFixed(2)
  });
};

module.exports = {
  getAllCuentas,
  getCuentaById,
  searchCuentas,
  getCuentasBalance
};