import express from 'express';
import ExamCategory from '../models/ExamCategory.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all exam categories with basic info
// @route   GET /api/exam-categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await ExamCategory.find({}, 'name description icon');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam categories', error: error.message });
  }
});

// @desc    Get detailed exam category by ID
// @route   GET /api/exam-categories/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await ExamCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Exam category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam category', error: error.message });
  }
});

// @desc    Search exam categories
// @route   GET /api/exam-categories/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { query, level, examMode } = req.query;
    
    // Build search criteria
    const searchCriteria = {};
    
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'subcategories.name': { $regex: query, $options: 'i' } }
      ];
    }
    
    if (level) {
      searchCriteria['subcategories.level'] = level;
    }
    
    if (examMode) {
      searchCriteria['subcategories.examMode'] = examMode;
    }
    
    const categories = await ExamCategory.find(searchCriteria);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error searching exam categories', error: error.message });
  }
});

// @desc    Create new exam category (Admin only)
// @route   POST /api/exam-categories
// @access  Private/Admin
router.post('/', 
  protect, 
  checkRole(['admin']), 
  async (req, res) => {
    try {
      const newCategory = new ExamCategory(req.body);
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(400).json({ message: 'Error creating exam category', error: error.message });
    }
  }
);

// @desc    Update exam category (Admin only)
// @route   PUT /api/exam-categories/:id
// @access  Private/Admin
router.put('/:id', 
  protect, 
  checkRole(['admin']), 
  async (req, res) => {
    try {
      const updatedCategory = await ExamCategory.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Exam category not found' });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: 'Error updating exam category', error: error.message });
    }
  }
);

// @desc    Delete exam category (Admin only)
// @route   DELETE /api/exam-categories/:id
// @access  Private/Admin
router.delete('/:id', 
  protect, 
  checkRole(['admin']), 
  async (req, res) => {
    try {
      const deletedCategory = await ExamCategory.findByIdAndDelete(req.params.id);
      
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Exam category not found' });
      }
      
      res.json({ message: 'Exam category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting exam category', error: error.message });
    }
  }
);

export default router;
