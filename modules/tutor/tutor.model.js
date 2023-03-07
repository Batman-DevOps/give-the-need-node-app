const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TutorSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  picDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  city: String,
  reason: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.Mixed,
  },
  updatedBy: {
    type: mongoose.Schema.Types.Mixed,
  }
}, {
  timestamps: true,
}, { _id: false })

TutorSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

if (!mongoose.models.Tutor) {
  TutorSchema.plugin(AutoIncrement, { model: 'tutor', id: 'tutorId_counter' });
}

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = Tutor;