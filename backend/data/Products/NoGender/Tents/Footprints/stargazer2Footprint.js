import {
  blueTinyImg,
} from '../../../../tinyImageConstants.js';

export const stargazer2Footprint =
//============================================================================================================================
//                                                Next Product - Stargazer Tent
//============================================================================================================================
{
  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: 'Stargazer 2 Footprint',
  images: [
    {
      color: 'Blue',
      colorImages: [
        {
          source: '/images/ProductImages/Tents/Footprints/stargazer2Footprint.jpg',
          isPrimaryImage: true,
        }
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: 'First Ascent',
  categories: ['Tents', 'Camping', 'First Ascent', 'Footprint'],
  gender: 'none',
  hasSizes: false,
  colors: [
    {
      colorName: 'Blue',
      colorHexCode: '',
      clearance: false,
      tinyImage: blueTinyImg
    }
  ],
  sizes: [
    {
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 50.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Blue',
          colorSalePrice: 35.00,
          sizeCategorySizes: [
            {
              size: 'ONE SIZE',
              qty: 10,
            }
          ]
        },
      ],
    }
  ],
  descriptions: [
    `Sized specifically for our Stargazer 2 tent, this nylon ground cloth protects the tent bottom from stones, twigs, and other abrasive material. Its StormRepel® DWR finish also provides an additional moisture barrier. Cut slightly smaller than the Stargazer 2's floor.`
  ],
  features: [
    `49.75" x 84.25"`,
  ],
  care: [`Do not wash or bleach. Spot clean with warm water and mild detergent. Air dry. Do not dry clean.`],
  materials: [ `100% nylon`, `Imported` ],
  reviews: [], //come back to this
  rating: 0,
  numReviews: 0,
  featureIcons: [
    {
      heading: 'First Ascent',
      source: '/images/FeatureIcons/firstAscent.svg'
    }
  ],
  defaultVideo: '',
  videoThumbnail: ''
}