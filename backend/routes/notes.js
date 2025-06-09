// backend/routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/notes called');
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('GET /api/notes error:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/notes called with:', req.body);
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error('POST /api/notes error:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT (update) a note
router.put('/:id', async (req, res) => {
  try {
    console.log(`PUT /api/notes/${req.params.id} called`);
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    console.error('PUT /api/notes error:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    console.log(`DELETE /api/notes/${req.params.id} called`);
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('DELETE /api/notes error:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
