import {
  silverTinyImg
} from '../../../tinyImageConstants.js';

export const alpineSisu = 
{
  isRetired: false,
  name: `Alpine Sisu 50L Pack`,
  images: [
    {
      color: 'Silver',
      colorImages: [
        {
          source: '/images/ProductImages/Backpacks/alpineSisu/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Backpacks/alpineSisu/2.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alpineSisu/3.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alpineSisu/4.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alpineSisu/5.jpg',
          isPrimaryImage: false,
        },
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: 'First Ascent',
  categories: ['Gear', 'Backpacks', 'Technical Backpacks', 'First Ascent'],
  gender: 'none',
  hasSizes: false,
  colors: [
    {
      colorName: 'Silver',
      colorHexCode: '',
      clearance: false,
      tinyImage: silverTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 299.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Silver',
          colorSalePrice: 209.30,
          sizeCategorySizes: [
            {
              size: 'ONE SIZE',
              qty: 20,
            }
          ]
        },
      ] //End of sizeCategoryColorsAndSizes
    }
  ], //End of Sizes
  descriptions: [
    `The ultimate ski-mountaineering pack. Combining the best of our top-loading Terrain 55L Pack with the original Sisu, this new Alpine version is the evolution of what our ski guides carry. Top-loading design, with a new single zip back-panel access to the main compartment—no more rummaging deep into the pack to find what you're looking for.`,
  ],
  features: [
    `Durable ripstop nylon construction: Compression-molded back panel`,
    `Exterior zip pocket: For skins and emergency shovel/probe`,
    `Removable lid: Multiple zip pockets for storage`,
    `Side compression straps: Balance your loads`,
    `Multiple ski carry options: Versatile, adaptable design`,
    `Hydration-compatible: Manage hydration more easily`,
    `27.9" x 11.75" x 10" / 50L / 3,051 cu. in.`,
  ],
  care: [],
  materials: [ `Imported` ],
  reviews: [], //come back to this
  rating: 0,
  numReviews: 0,
  featureIcons: [
    {
      heading: 'First Ascent',
      source: '/images/FeatureIcons/firstAscent.svg'
    },
    {
      heading: 'Internal Frame',
      source: '/images/FeatureIcons/internalFrame.svg'
    },
    {
      heading: 'Hydration Ready',
      source: '/images/FeatureIcons/hydrationReady.svg'
    }
  ],
  // defaultImages: [
  //   '',
  // ],
  defaultVideo: 'https://www.youtube.com/embed/8b3QfVNKdNg',
  videoThumbnail: '/images/ProductImages/Backpacks/alpineSisu/youtubeThumbnail.jpg',
}
