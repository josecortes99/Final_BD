// archivo principal punto entrada backend

// Importaciones
import express from 'express';
import cors from 'cors';  // Middleware necesario para que tu API pueda ser consumida desde un frontend.
import dotenv from 'dotenv'
import customersRoutes from './routes/customers_routes.js';
import totalPaydRoutes from './routes/total_paid.js';
import pendingInvoicesRoutes from './routes/pending_invoices.js';
import platformTransactionsRoutes from './routes/platform_transactions.js';


// cargar variables archivo .env
dotenv.config();

// Creacion app y configuracion puerto
const app = express();
const PORT = 3000;  // Número del puerto donde escuchará tu servidor (en este caso 3000).

// Middlewares globales
app.use(cors());  // Permite que tu API sea accesible desde otras aplicaciones web.
app.use(express.json());  // Permite que Express entienda cuerpos de peticiones en formato JSON

// Rutas
app.use('/customers', customersRoutes);
app.use('/totalPayd', totalPaydRoutes);
app.use('/pendingInvoices', pendingInvoicesRoutes);
app.use('/platformTransactions', platformTransactionsRoutes);


// levanta el Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
