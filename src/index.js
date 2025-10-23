const express = require('express');
const cuentasRoutes = require('./routes/cuentasRoutes');

const app = express();
const PORT = 3130;

app.use(express.json());

app.use('/', cuentasRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Servidor API de Cuentas - Examen II',
    endpoints: [
      'GET /cuentas - Obtener todas las cuentas',
      'GET /cuenta/:id - Obtener cuenta por ID',
      'GET /cuentasQuery?queryParam=valor - Buscar por ID, nombre o género',
      'GET /cuentasBalance - Obtener balance total de cuentas activas'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});