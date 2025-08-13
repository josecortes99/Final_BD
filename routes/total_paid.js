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
            c.customer_name,
            SUM(t.transaction_amount) AS total_paid
            FROM customers c
            JOIN transactions t ON c.customer_id = t.customer_id
            GROUP BY c.customer_name
            ORDER BY total_paid DESC;`);
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
});

export default router;