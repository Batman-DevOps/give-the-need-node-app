const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const YouthSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  picDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  city: String,
  type: {
    type: String,
    enum: ['Youth', 'Mentor'],
    default: 'Youth'
  },
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

YouthSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

if (!mongoose.models.Youth) {
  YouthSchema.plugin(AutoIncrement, { model: 'youth', id: 'youthId_counter' });
}

const Youth = mongoose.model('Youth', YouthSchema);

module.exports = Youth;