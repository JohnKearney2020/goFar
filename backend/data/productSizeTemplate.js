//This is the object template for a product with sizes
const dontIncludeThis =
{
  isRetired: false,
  name: `Women's Guide Pro Pants`,
  images: [
    {
      color: 'Black',
      colorImages: [
        {
          source: 'https://i.imgur.com/7Rf2aLz.jpg',
          isPrimaryImage: true,
        },
      ]
    },
  ],
  brand: 'Eddie Bauer',
  subBrand: 'First Ascent',
  categories: ['Pants', 'First Ascent'],
  gender: 'Women',
  hasSizes: true,
  colors: [
    {
      colorName: 'Black',
      colorHexCode: '',
      clearance: false,
      tinyImage: '/images/TinyColorImages/Black_tiny.jpg'
    },
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 80.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Black',
          colorSalePrice: 60.00,
          sizeCategorySizes: [
            {
              size: '0',
              qty: 3,
            }, {
              size: '2',
              qty: 8
            }, {
              size: '4',
              qty: 10
            }, {
              size: '6',
              qty: 9
            }, {
              size: '8',
              qty: 0
            }, {
              size: '10',
              qty: 11
            }, {
              size: '12',
              qty: 23
            }, {
              size: '14',
              qty: 5
            }, {
              size: '16',
              qty: 12
            }
          ]
        },
      ] //End of sizeCategoryColorsAndSizes
    },
  ], //End of Sizes
  descriptions: [
    ``,
    ``,
  ],
  features: [
    ``,
    ``,
  ],
  care: [``],
  materials: [ `96% nylon/4% spandex`, `Imported` ],
  reviews: [], //come back to this
  rating: 5,
  numReviews: 12,
  featureIcons: [
    {
      heading: 'First Ascent',
      source: '/images/FeatureIcons/firstAscent.svg'
    },
  ],
  defaultImages: [
    'https://i.imgur.com/Xpi5sJR.jpg',
  ],
  defaultVideo: 'https://www.youtube.com/embed/ObyTwHWmIy8',
  videoThumbnail: 'https://i.imgur.com/WUxjLKH.jpg'
},