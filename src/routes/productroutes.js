import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const getProductsStmt = db.prepare(`
        SELECT * FROM products_details
      `);
    const products = getProductsStmt.all();
    if(!products) {
      return res.status(404).json({success: false, message: 'Currently no products available'});
    }
    res.status(200).json({success: true, products});
  } catch (error) {
    console.log('Internal server error', error.message)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
});

export default router;