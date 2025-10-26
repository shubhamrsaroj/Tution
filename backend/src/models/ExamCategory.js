import mongoose from 'mongoose';

const ExamSubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  eligibility: { type: String, required: true },
  courses: [String],
  subjects: [String],
  examMode: { type: String, enum: ['Online', 'Offline', 'Hybrid'] },
  frequency: { type: String },
  conductingBody: { type: String },
  level: { 
    type: String, 
    enum: ['National', 'State', 'Entrance', 'Regional'], 
    default: 'National' 
  },
  ageRange: {
    min: Number,
    max: Number
  },
  selectionProcess: [String],
  purpose: String
});

const ExamCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Board Exams',
      'Engineering & Pharmacy Entrance',
      'Law Entrance',
      'Defence Exams',
      'Government Job Exams',
      'Banking & RBI Exams',
      'MBA & Management',
      'Maritime Exams'
    ]
  },
  subcategories: [ExamSubcategorySchema],
  description: String,
  icon: String
}, { timestamps: true });

// Pre-populate with exam categories
ExamCategorySchema.statics.initializeCategories = async function() {
  const existingCategories = await this.countDocuments();
  if (existingCategories === 0) {
    const categories = [
      {
        name: 'Board Exams',
        description: 'Exams for 11th and 12th Standard',
        subcategories: [
          {
            name: 'CBSE Boards',
            eligibility: 'After completing Class 10 (for 11th), Class 11 (for 12th)',
            courses: ['Science (PCM)', 'Science (PCB)'],
            examMode: 'Offline',
            frequency: 'Once a year (March–April)',
            conductingBody: 'CBSE',
            level: 'National',
            purpose: 'Qualifying for higher education & competitive exams'
          }
        ]
      },
      {
        name: 'Engineering & Pharmacy Entrance',
        description: 'Entrance exams for technical and medical courses',
        subcategories: [
          {
            name: 'MHT CET',
            eligibility: '12th pass (Science with PCM/PCB)',
            courses: ['Engineering (B.E/B.Tech)', 'Pharmacy (B.Pharm)', 'Agriculture'],
            subjects: ['Physics', 'Chemistry', 'Maths/Biology'],
            examMode: 'Online',
            frequency: 'Once a year (May)',
            conductingBody: 'State CET Cell, Maharashtra',
            level: 'State',
          }
        ]
      },
      {
        name: 'Law Entrance',
        description: 'Entrance exams for law programs',
        subcategories: [
          {
            name: 'LLB (5-year Integrated)',
            eligibility: '12th pass',
            courses: ['Integrated LLB'],
            subjects: ['Legal Aptitude', 'GK', 'English', 'Reasoning', 'Maths'],
            examMode: 'Online',
            conductingBody: 'Various Institutions',
            level: 'National',
            subcategories: ['MHT CET (Law)', 'CLAT', 'AILET', 'SLAT']
          },
          {
            name: 'LLB (3-year)',
            eligibility: 'Graduation',
            courses: ['LLB'],
            examMode: 'Online',
            conductingBody: 'Various Institutions',
            level: 'National',
            subcategories: ['MHT CET (Law 3 Years)', 'DU LLB', 'BHU LLB']
          }
        ]
      }
      // Add other categories similarly
    ];

    await this.create(categories);
  }
};

const ExamCategory = mongoose.model('ExamCategory', ExamCategorySchema);

// Initialize categories when the model is first used
ExamCategory.initializeCategories().catch(console.error);

export default ExamCategory;
