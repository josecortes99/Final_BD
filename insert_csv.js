// insertar_csv.js
import fs from 'fs';
import csv from 'csv-parser';
import { conectarDB } from './db/db.js';

const archivoCSV = './uploads/payments.csv';

async function insertarCSV() {
  const connection = await conectarDB();
  console.log('Conectado a la base de datos');

  fs.createReadStream(archivoCSV)
    .pipe(csv()) 
    .on('data', async (fila) => {
      try {
        const { paid_amount,invoice_id,transaction_id } = fila;

        const query = ('INSERT INTO payments ( paid_amount,invoice_id,transaction_id ) VALUES (?, ?, ?)')

        const [rows] = await connection.execute(query, [ paid_amount,invoice_id,transaction_id ]);

        console.log(`Insertado: ${paid_amount}`);
      } catch (err) {
        console.error('Error insertando fila:', err);
      }
    })
    .on('end', () => {
      console.log('Inserción completa desde CSV');
      connection.end();
    });
}

insertarCSV();
