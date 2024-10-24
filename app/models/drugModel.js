import mongoose from 'mongoose';

const DrugSchema = new mongoose.Schema({
  tabletName: {
    type: String,
    required: true,
    trim: true,
  },
  dosageMg: {
    type: Number,
    required: true,
  },
  perStripPieces: {
    type: Number,
    required: true,
  },
  manufacturerName: {
    type: String,
    required: true,
    trim: true,
  },
  preferablePeriod: {
    type: String,
    enum: ['before food', 'after food'],
    required: true,
  },
  forChild: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  storageConditions: {
    type: String,
    enum: ['cold', 'normal', 'hot'],
    required: true,
  },
  chemicalComposition: {
    type: String,
    required: true,
    trim: true,
  },
  needPrescription: {
    type: Boolean,
    required: true,
  },
  isGenericMedicine: {
    type: Boolean,
    required: true,
  },
  referenceUrl: {
    type: String,
    required: true,
    trim: true,
    match: /^https?:\/\/.+/i,  // URL validation using regex
  },
});

const Drug = mongoose.models.Drug || mongoose.model('Drug', DrugSchema);

export default Drug;
