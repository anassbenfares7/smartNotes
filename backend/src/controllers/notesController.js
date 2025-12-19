import Note from '../models/Note.js';

// Get all notes
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
    }
}

// Get single note by ID
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch note', error: error.message });
    }
}


// Create new note
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();

        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create note', error: error.message });
    }
}


// Update note
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note', error: error.message });
    }
}

// Delete note
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
}