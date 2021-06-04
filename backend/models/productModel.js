import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  //we want to know which user created the product. We do this by setting the 'type' and then the 'ref'
  //the 'ref' references the model where we can find that ObjectId
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isRetired: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  images: [
    {
      color: {
        type: String,
        required: true
      },
      colorImages: [{
        source: {
          type: String,
          required: true,
        },
        isPrimaryImage: {
          type: Boolean,
          required: true,
          default: false
        }
      }],
    }
  ],
  brand: {
    type: String,
    required: true
  },
  subBrand: {
    type: String
  },
  categories: [{
    type: String,
    required: true,
  }],
  gender: {
    type: String
  },
  hasSizes: {
    type: Boolean,
    required: true
  },
  colors: [{
    colorName: {
      type: String,
      required: true
    },
    colorHexcode: {
      type: String,
      required: false
    },
    clearance: {
      type: Boolean,
      default: false
    },
    tinyImage: {
      type: String,
      required: true
    }
  }],
  sizes: [{
    sizeCategoryName: {
      type: String,
      required: true
    },
    sizeCategoryDefaultPrice: {
      type: Number,
      required: true
    },
    sizeCategoryColorsAndSizes: [{
      color: {
        type: String,
        required: true
      },
      colorSalePrice: {
        type: Number,
        required: true
      },
      sizeCategorySizes: [{
        size: {
          type: String,
          required: true
        },
        qty: {
          type: Number,
          required: true
        }
      }]
    }]
  }],
  descriptions: [{
    type: String,
    required: true,
  }],
  features: [{ type: String }],
  care: [{ type: String }],
  materials: [{ type: String }],
  rating: { //the average of all user ratings
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  featureIcons: [{
    heading: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  }],
  defaultImages: [{
    type: String,
    required: true
  }],
  defaultVideo: {
    type: String,
    required: false
  },
  videoThumbnail: {
    type: String,
    required: false
  }
}, {
  //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
  timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;