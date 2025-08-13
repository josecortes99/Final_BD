// Importsmod libreria expres que permite crear rutas pata manejar las peticiones 
import express from 'express';

// importamos funcion de conectarDB
import { conectarDB } from '../db/db.js';

// crea un obejeto enrrutador de express, puede definir rutas y luego exportalas al app
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const connection = await conectarDB();
        const [rows] = await connection.execute(`SELECT 
            i.invoice_number,
            c.customer_name,
            ts.transaction_status
            FROM invoices i
            JOIN customers c ON i.customer_id = c.customer_id
            JOIN transactions t ON c.customer_id = t.customer_id
            JOIN transaction_statuses ts ON t.status_id = ts.status_id
            WHERE ts.transaction_status = "Pendiente"
            GROUP BY i.invoice_number, c.customer_name, ts.transaction_status
            ORDER BY ts.transaction_status DESC;`);
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
});

export default router;