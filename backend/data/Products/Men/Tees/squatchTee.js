import {
  grayHtrTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const squatchTee = 
{

  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: `Graphic T-Shirt - Red, White & Blue Squatch`,
  images: [
    {
      color: 'Gray Htr',
      colorImages: [
        {
          source: '/images/ProductImages/Tees/squatchTee/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Tees/squatchTee/2.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Tees/squatchTee/3.jpg',
          isPrimaryImage: false,
        }
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: '',
  categories: ['Tees', 'T-shirts', 'Shirts'],
  gender: 'men',
  hasSizes: true,
  colors: [
    {
      colorName: 'Gray Htr',
      colorHexCode: '',
      clearance: false,
      tinyImage: grayHtrTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 25.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Gray Htr',
          colorSalePrice: 0,
          sizeCategorySizes: [
            {
              size: 'S',
              qty: 5,
            }, {
              size: 'M',
              qty: 8
            }, {
              size: 'L',
              qty: 10
            }, {
              size: 'XL',
              qty: 0
            }, {
              size: 'XXL',
              qty: 10
            }
          ]
        },
      ] //End of sizeCategoryColorsAndSizes
    },
    { 
      sizeCategoryName: 'Tall',
      sizeCategoryDefaultPrice: 28.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Gray Htr',
          colorSalePrice: 0,
          sizeCategorySizes: [
            {
              size: 'L',
              qty: 20
            }, {
              size: 'XL',
              qty: 4
            }
          ]
        },              
      ]
    },
  ],
  descriptions: [
    `Our graphic T-shirts raise the bar on comfort and quality. Sporting exclusive screenprint images, each shirt is purposely developed using a soft, lighter weight cotton/polyester. The cool, comfortable fabric resists shrinking, won't twist out of shape after washing, and holds its color, even through regular use.`,
    `Models shown are 6'0" to 6'2" tall, wearing size M/32x32.`,
  ],
  features: [
    `Classic. A universal fit. Not too slim, not too relaxed on body.`,
  ],
  care: [`Turn garment inside out. Machine wash cold with like colors. Do not bleach. Tumble dry medium. Remove promptly. Warm iron as desired.`],
  materials: [ '60% cotton/40% polyester', 'Imported' ],
  reviews: [], //come back to this
  rating: 0,
  numReviews: 0,
  featureIcons: [],
  defaultImages: [],
  defaultVideo: '',
  videoThumbnail: ''
}