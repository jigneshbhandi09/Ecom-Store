const express = require('express');
const cors = require('cors');
const prisma = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===== Routes ===== //

// Get all products with optional limit, sort, filter
app.get('/api/products', async (req, res) => {
    const { category, sort, limit, page } = req.query;

    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    const orderBy = {};
    if (sort === 'price_asc') orderBy.price = 'asc';
    else if (sort === 'price_desc') orderBy.price = 'desc';
    else if (sort === 'name_asc') orderBy.name = 'asc';
    else if (sort === 'name_desc') orderBy.name = 'desc';

    const where = {};
    if (category) where.category = category;

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy,
            skip,
            take
        });
        const total = await prisma.product.count({ where });
        res.json({ products, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Add item to cart
app.post('/api/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cartItem = await prisma.cart.create({
            data: { productId, quantity }
        });
        res.json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get all cart items with product details
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await prisma.cart.findMany({
            include: { product: true }
        });
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
