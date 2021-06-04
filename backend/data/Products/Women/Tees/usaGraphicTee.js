import {
  salsaTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const usaGraphicTee = 
{

  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: `Graphic T-Shirt - USA Flag`,
  images: [
    {
      color: 'Salsa',
      colorImages: [
        {
          source: '/images/ProductImages/Tees/usaGraphicTee/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Tees/usaGraphicTee/2.jpg',
          isPrimaryImage: false,
        }
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: '',
  categories: ['Tees', 'T-shirts', 'Shirts', 'Graphic Tees'],
  gender: 'women',
  hasSizes: true,
  colors: [
    {
      colorName: 'Salsa',
      colorHexCode: '',
      clearance: false,
      tinyImage: salsaTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 25.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Salsa',
          colorSalePrice: 17.50,
          sizeCategorySizes: [
            {
              size: 'XS',
              qty: 4,
            },{
              size: 'S',
              qty: 10,
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
    `The ultimate in simple comfort. This short-sleeve T-shirt is an ultrasoft, shrink-resistant blend of cotton/polyester for easy-care convenience.`,
    `Models shown are 5'9" to 5'11" tall, wearing size S/4.`,
  ],
  features: [
    `Length, Reg Small: 25"`,
    `Relaxed. A generous fit. Relaxed on body.`,
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