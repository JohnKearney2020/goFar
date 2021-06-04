import {
  blackTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const elkHorizonTee = 
{

  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: `Graphic T-Shirt - Elk Horizon`,
  images: [
    {
      color: 'Black',
      colorImages: [
        {
          source: '/images/ProductImages/Tees/elkHorizonTee/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Tees/elkHorizonTee/2.jpg',
          isPrimaryImage: false,
        }
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: '',
  categories: ['Tees', 'T-shirts', 'Shirts', 'Graphic Tees'],
  gender: 'men',
  hasSizes: true,
  colors: [
    {
      colorName: 'Black',
      colorHexCode: '',
      clearance: false,
      tinyImage: blackTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 25.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Black',
          colorSalePrice: 0,
          sizeCategorySizes: [
            {
              size: 'S',
              qty: 3,
            }, {
              size: 'M',
              qty: 5
            }, {
              size: 'L',
              qty: 5
            }, {
              size: 'XXL',
              qty: 10
            }
          ]
        },
      ] //End of sizeCategoryColorsAndSizes
    },
  ],
  descriptions: [
    `Our graphic T-shirts raise the bar on comfort and quality. Sporting exclusive screenprint images, each shirt is purposely developed using a soft, lighter weight cotton/polyester. The cool, comfortable fabric resists shrinking, won't twist out of shape after washing, and holds its color, even through regular use.`,
    `Models shown are 6'0" to 6'2" tall, wearing size M/32x32.`,
  ],
  features: [
    `Classic. A universal fit. Not too slim, not too relaxed on body.`,
  ],
  care: [`Turn garment inside out. Machine wash cold with like colors. Only non-chlorine bleach when needed. Tumble dry medium. Remove promptly. Warm iron as desired. Do not iron on print.`],
  materials: [ '60% cotton/40% polyester', 'Imported' ],
  reviews: [], //come back to this
  rating: 0,
  numReviews: 0,
  featureIcons: [],
  defaultImages: [],
  defaultVideo: '',
  videoThumbnail: ''
}