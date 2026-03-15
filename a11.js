const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store items
let items = [
    { id: 1, title: 'Item 1', description: 'This is item 1' },
    { id: 2, title: 'Item 2', description: 'This is item 2' },
];

// -------------------------
// GET /items - Get all items
// -------------------------
app.get('/items', (req, res) => {
    res.json(items);
});

// -------------------------
// GET /items/:id - Get item by ID
// -------------------------
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// -------------------------
// POST /items - Create new item
// -------------------------
app.post('/items', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newItem = {
        id: items.length + 1,
        title,
        description: description || ''
    };

    items.push(newItem);
    res.status(201).json(newItem); // 201 Created
});

// -------------------------
// PUT /items/:id - Update an item
// -------------------------
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        if (title) items[itemIndex].title = title;
        if (description) items[itemIndex].description = description;

        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// -------------------------
// DELETE /items/:id - Delete an item
// -------------------------
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        items.splice(itemIndex, 1);
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});