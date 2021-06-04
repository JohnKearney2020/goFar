import {
  dkSmokeTinyImg
} from '../../../tinyImageConstants.js';

export const alchemist = 
{
  isRetired: false,
  name: `Alpine Sisu 50L Pack`,
  images: [
    {
      color: 'Dk Smoke',
      colorImages: [
        {
          source: '/images/ProductImages/Backpacks/alchemist/1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/2.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/3.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/4.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/5.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/6.jpg',
          isPrimaryImage: false,
        },
        {
          source: '/images/ProductImages/Backpacks/alchemist/7.jpg',
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
      colorName: 'Dk Smoke',
      colorHexCode: '',
      clearance: false,
      tinyImage: dkSmokeTinyImg
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 249.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Dk Smoke',
          colorSalePrice: 174.30,
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
    `Next generation of the guide built Alchemist takes its cues from the award-winning Sorcerer, with a more streamlined design, lighter weight, and improved shoulder straps and waist belt for less bulk and better weight distribution. Rugged, weather-resistant 630-denier nylon TPU stands up to the most demanding use and terrain. Patented full pack expansion with integrated pullout lid lets you quickly adjust to the size of your load, from 40L to 55L.`,
  ],
  features: [
    `Compression-molded back panel—comfort even when fully loaded`,
    `Removable BFF pad for use as bivi or first aid support`,
    `Removable waist belt pares weight to a minimum`,
    `Quick-release tool straps hold ice axe securely`,
    `Main compartment side zip—quick access to gear`,
    `Delrin internal frame with integrated tiedown points`,
    `Hydration sleeve—easy access to water`,
    `26.75" x 11.4" x 8.25" | Capacity: 40L to 55L | Weight: 3 lbs. 14 oz.`,
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
    },
    {
      heading: 'Hydration Ready',
      source: '/images/FeatureIcons/hydrationReady.svg'
    },
    {
      heading: 'Internal Frame',
      source: '/images/FeatureIcons/internalFrame.svg'
    }
  ],
  // defaultImages: [
  //   '',
  // ],
  defaultVideo: 'https://www.youtube.com/embed/lW6_ibnMBVI',
  videoThumbnail: '/images/ProductImages/Backpacks/alchemist/youtubeThumbnail.jpg',
}