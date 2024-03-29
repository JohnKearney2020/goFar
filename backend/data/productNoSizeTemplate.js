
export const stargazerTent =
  //============================================================================================================================
  //                                                Next Product - Stargazer Tent
  //============================================================================================================================
  {
    // user: xxxx, //will be inserted with seeder script
    isRetired: false,
    name: 'Stargazer 2.0 2-Person Tent',
    images: [
      {
        color: 'Ascent Blue',
        colorImages: [
          {
            source: 'https://i.imgur.com/raySpzc.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/NIFBSIY.jpg',
            isPrimaryImage: false,
          },
        ]
      },
    ],
    brand: 'Eddie Bauer',
    subBrand: 'First Ascent',
    categories: ['Tents', 'Camping', 'First Ascent'],
    gender: 'none',
    hasSizes: false,
    colors: [
      {
        colorName: 'Ascent Blue',
        colorHexCode: '',
        clearance: false,
        tinyImage: ascentBlueTinyImg
      }
    ],
    sizes: [
      {
        sizeCategoryName: 'ONE SIZE',
        sizeCategoryDefaultPrice: 399,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Ascent Blue',
            colorSalePrice: 349,
            sizeCategorySizes: [
              {
                size: 'ONE SIZE',
                qty: 30,
              }
            ]
          },
        ],
      }
    ],
    descriptions: [
      `The new, enhanced version of our award-winning 2-person backpacking tent. With a slightly larger footprint and more interior space, the 2.0 adds to the Stargazer's reputation as a best-in-class 3-season tent. Designed by our First Ascent guides, it features superior materials for outstanding weather protection, steep-wall construction, easy setup, and a tub floor that keeps you dry even in the wettest conditions.`
    ],
    features: [
      `Steep-wall design for maximum interior living space`,
      ``,
      ``,
      ``,
      ``,
      ``,
      ``,
      ``
    ],
    care: [`To clean your tent, set it up, wipe with a damp sponge and rinse it with fresh water. Dry completely before storage. Never machine wash.`],
    materials: [ `15D nylon mesh | 15D nylon canopy | 15D nylon flysheet | 5000mm coated 30D ripstop nylon floor`, `Imported` ],
    reviews: [], //come back to this
    rating: 5,
    numReviews: 3,
    featureIcons: [
      {
        heading: 'First Ascent',
        source: '/images/FeatureIcons/firstAscent.svg'
      },
      {
        heading: '2 Person',
        source: '/images/FeatureIcons/2Person.svg'
      },
      {
        heading: '3 Season',
        source: '/images/FeatureIcons/3Season.svg'
      }
    ],
    defaultVideo: 'https://www.youtube.com/embed/UbTsyJpWRNM',
    videoThumbnail: 'https://i.imgur.com/dzmEpmT.jpg'
  }