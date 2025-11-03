import express from 'express';
import cors from 'cors';
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import productsRoutes from './routes/productroutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());

app.get('/ecommerce-project', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
}); 