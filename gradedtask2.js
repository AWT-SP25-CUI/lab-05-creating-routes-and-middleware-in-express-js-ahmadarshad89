const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// In-memory products data
let products = [
    { id: 1, name: 'Laptop',    price: 1200, category: 'electronics', inStock: true  },
    { id: 2, name: 'Phone',     price: 800,  category: 'electronics', inStock: true  },
    { id: 3, name: 'T-Shirt',   price: 25,   category: 'clothing',    inStock: false },
    { id: 4, name: 'Headphones',price: 150,  category: 'electronics', inStock: true  },
    { id: 5, name: 'Jeans',     price: 60,   category: 'clothing',    inStock: true  },
];

// GET /products — with optional filters
app.get('/products', (req, res) => {
    let result = products;

    // Filter by category
    if (req.query.category) {
        result = result.filter(p =>
            p.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    // Filter by maxPrice
    if (req.query.maxPrice) {
        const max = parseFloat(req.query.maxPrice);
        if (isNaN(max)) {
            return res.status(400).json({ error: 'maxPrice must be a number' });
        }
        result = result.filter(p => p.price <= max);
    }

    // Filter by inStock
    if (req.query.inStock !== undefined) {
        const inStock = req.query.inStock === 'true';
        result = result.filter(p => p.inStock === inStock);
    }

    res.json(result);
});

// GET /products/:id — get one product
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

// POST /products — add new product (Bonus)
app.post('/products', (req, res) => {
    const { name, price, category, inStock } = req.body;

    // Validation
    if (!name || !price || !category || inStock === undefined) {
        return res.status(400).json({ error: 'All fields required: name, price, category, inStock' });
    }
    if (typeof price !== 'number') {
        return res.status(400).json({ error: 'price must be a number' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        category,
        inStock
    };

    products.push(newProduct);
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
});

// 404 for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(4000, () => {
    console.log('Task 2 running at http://localhost:4000');
});