import {
  dustedIndigoTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const bigHikeTee = 
{

  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: `Graphic T-Shirt - Big Hike`,
  images: [
    {
      color: 'Dusted Indigo',
      colorImages: [
        {
          source: '/images/ProductImages/Tees/bigHikeTee/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Tees/bigHikeTee/2.jpg',
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
      colorName: 'Dusted Indigo',
      colorHexCode: '',
      clearance: false,
      tinyImage: dustedIndigoTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 25.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Dusted Indigo',
          colorSalePrice: 17.50,
          sizeCategorySizes: [
            {
              size: 'S',
              qty: 0,
            }, {
              size: 'M',
              qty: 10
            }, {
              size: 'L',
              qty: 10
            }, {
              size: 'XL',
              qty: 10
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