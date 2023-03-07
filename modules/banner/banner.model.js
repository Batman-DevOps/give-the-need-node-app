const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BannerSchema = new mongoose.Schema({
  _id: Number,
  description: string,
  bannerPicDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  remarks: {
    type: String,
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

BannerSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

if (!mongoose.models.Banner) {
  // accountSchema.plugin(AutoIncrement,{id:'bannerId_counter',inc_field:'bannerId' });
  BannerSchema.plugin(AutoIncrement, { model: 'banner', id: 'bannerId_counter' });
}

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;