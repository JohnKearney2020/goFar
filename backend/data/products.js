const products = [
  {
    // user: xxxx, //will be inserted with seeder script
    name: 'MicroTherm® 2.0 Down Hooded Jacket',
    images: [
      {
        color: 'Seapine',
        colorImages: [
          {
            source: 'https://i.imgur.com/T7pSpXB.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/udaTRbn.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/ILPYxGF.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Med Indigo',
        colorImages: [
          {
            source: 'https://i.imgur.com/9xoTDVf.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/M9yFrev.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/DKeuDFh.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Storm',
        colorImages: [
          {
            source: 'https://i.imgur.com/RZoZpvz.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/bsPrUMV.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/CHFh1pw.jpg',
            isPrimaryImage: false,
          }
        ]
      }
    ],
    brand: 'Eddie Bauer',
    subBrand: 'First Ascent',
    categories: ['Jackets', 'Winter'],
    gender: 'Men',
    hasSizes: true,
    colors: [
      {
        colorName: 'Med Indigo',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/microtherm_MedIndigo_tiny.jpg'
      },
      {
        colorName: 'Seapine',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/microtherm_Seapine_tiny.jpg'
      },
      {
        colorName: 'Storm',
        colorHexCode: '',
        clearance: true,
        tinyImage: '/images/microtherm_Storm_tiny.jpg'
      }
    ],
    sizes: [
      { 
        sizeCategoryName: 'Regular',
        sizeCategoryDefaultPrice: 99.99,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Seapine',
            colorSalePrice: 89.99,
            sizeCategorySizes: [
              {
                size: 'S',
                qty: 3,
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
                qty: 3
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 79.99,
            sizeCategorySizes: [
              {
                size: 'S',
                qty: 0
              }, {
                size: 'M',
                qty: 0
              }, {
                size: 'L',
                qty: 3
              }, {
                size: 'XL',
                qty: 1
              }, {
                size: 'XXL',
                qty: 6
              }
            ]
          },              
          {
            color: 'Storm',
            colorSalePrice: 59.99,
            sizeCategorySizes: [
              {
                size: 'S',
                qty: 11
              }, {
                size: 'M',
                qty: 2
              }, {
                size: 'L',
                qty: 7
              }, {
                size: 'XL',
                qty: 9
              }, {
                size: 'XXL',
                qty: 0
              }
            ]
          },              
        ] //End of sizeCategoryColorsAndSizes
      },
      { 
        sizeCategoryName: 'Tall',
        sizeCategoryDefaultPrice: 109.99,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Seapine',
            colorSalePrice: 99.99,
            sizeCategorySizes: [
              {
                size: 'M',
                qty: 1
              }, {
                size: 'L',
                qty: 20
              }, {
                size: 'XL',
                qty: 0
              }, {
                size: 'XXL',
                qty: 0
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 0,
            sizeCategorySizes: [
              {
                size: 'M',
                qty: 2
              }, {
                size: 'L',
                qty: 3
              }, {
                size: 'XL',
                qty: 8
              }, {
                size: 'XXL',
                qty: 7
              }
            ]
          },              
          {
            color: 'Storm',
            colorSalePrice: 69.99,
            sizeCategorySizes: [
              {
                size: 'M',
                qty: 0
              }, {
                size: 'L',
                qty: 1
              }, {
                size: 'XL',
                qty: 8
              }, {
                size: 'XXL',
                qty: 0
              }
            ]
          },              
        ]
      },
    ],
    descriptions: [
      'Our premium ultralight has a streamlined fit that\'s built for mobility. Comfort is further enhanced with the soft, recycled ripstop polyester shell and its adjustable drawcord hem. But the real crux of this hoodie is the high-loft Premium Goose Down insulation. Maximum warmth. Minimum weight and bulk',
      'As an ultralight insulating layer, the MicroTherm is thinner than traditional down jackets. But that combination of minimal bulk and effective warmth is what makes it special, and is the result of its unique micro-channel construction and the exceptionally high-loft down that it holds close to the body for maximum thermal efficiency.',
      // We can inject HTML directly into these strings thanks to the react-html-parser npm package
      '<span class="font-weight-bold">NOTE:</span> Temperature ratings are based on a controlled laboratory test by an independent university lab. Also consider: your sensitivity to cold and wind-chill; time of exposure; activity level; and use of layering.'
    ],
    features: [
      '1.2 oz 20D recycled ripstop polyester shell—perfect balance of light weight and strength',
      'StormRepel® Super DWR—our longest lasting moisture-shedding finish',
      '800 fill Responsible Down Standard (RDS) down, certified by Control Union More About RDS',
      'Trackmydown supply information on garment—learn where your down comes from and what makes premium down premium',
      'Insulated hood—elastic binding provides secure fit',
      'Secure zip pockets—media port in chest pocket',
      'Packs into chest pocket—space-saving compressibility',
      'Length, Reg Medium: 28" | Weight: 13.4 oz | Down Fill Weight: 3.2 oz',
      'Active. An athletic fit. Close to the body without restricting mobility. Designed to fit over baselayers and lightweight midlayers.'
    ],
    care: ['Secure all garment closures before laundering. Machine wash cold delicate, separately, using mild detergent only. Do not bleach or use fabric softeners. Rinse thoroughly and remove promptly. Tumble dry low. Do not hang to dry. Do not iron or steam. Do not dry clean. For best results, dry with clean tennis ball.'],
    materials: [ '100% polyester', 'Imported' ],
    reviews: [], //come back to this
    rating: 4,
    numReviews: 1,
    defaultPrice: 0,
    defaultSalePrice: 0,
    featureIcons: [
      {
        heading: 'First Ascent',
        source: '/images/FeatureIcons/firstAscent.svg'
      },
      {
        heading: 'Temp Rating (Moderate Activity)',
        source: '/images/FeatureIcons/tempRatingMinus10.svg'
      },
      {
        heading: 'Fill Power',
        source: '/images/FeatureIcons/fillPower800.svg'
      },
      {
        heading: 'StormRepel Super DWR',
        source: '/images/FeatureIcons/stormRepelDWR.svg'
      },
      {
        heading: 'Windproof',
        source: '/images/FeatureIcons/windproof.svg'
      },
      {
        heading: 'Recycled Materials',
        source: '/images/FeatureIcons/recycledMaterials.svg'
      }
    ],
    defaultImages: [
      'https://i.imgur.com/VQBuiSz.jpg',
      'https://i.imgur.com/ojDjEst.jpg',
      'https://i.imgur.com/vriRA6i.jpg',
      'https://i.imgur.com/NCqQUk1.jpg',
      'https://i.imgur.com/Jvmk2f4.jpg',
      'https://i.imgur.com/TWCmNx9.jpg',
      'https://i.imgur.com/qxYfSCG.jpg'
    ],
    defaultVideo: 'https://www.youtube.com/embed/t2MGytLDf4I'
  },
  {
    // user: xxxx, //will be inserted with seeder script
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
          {
            source: 'https://i.imgur.com/W0NtUyi.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/uzkKA33.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/SmikVH2.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/jCyPoqi.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/XfWQsRt.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/truHPYn.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/OnH2IhS.jpg',
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
        tinyImage: '/images/microtherm_AscentBlue_tiny.jpg'
      }
    ],
    sizes: [],
    descriptions: [
      `The new, enhanced version of our award-winning 2-person backpacking tent. With a slightly larger footprint and more interior space, the 2.0 adds to the Stargazer's reputation as a best-in-class 3-season tent. Designed by our First Ascent guides, it features superior materials for outstanding weather protection, steep-wall construction, easy setup, and a tub floor that keeps you dry even in the wettest conditions.`
    ],
    features: [
      `Steep-wall design for maximum interior living space`,
      `DAC Featherlite aluminum pole construction`,
      `Color-coded single-pole system for quick, easy setup`,
      `Highly durable tub floor keeps you dry in the worst weather`,
      `Full-size, lightweight rainfly`,
      `Four interior pockets for organizing small items`,
      `Convertible door & fly—use a trekking pole to pitch out the door for increased air flow and sheltered storage`,
      `84" x 61" x 45" | 34 sq. ft. interior space | 15 sq. fit. vestibule space | 4 lbs 4 oz`
    ],
    care: [`To clean your tent, set it up, wipe with a damp sponge and rinse it with fresh water. Dry completely before storage. Never machine wash.`],
    materials: [ `15D nylon mesh | 15D nylon canopy | 15D nylon flysheet | 5000mm coated 30D ripstop nylon floor`, `Imported` ],
    reviews: [], //come back to this
    rating: 5,
    numReviews: 3,
    defaultPrice: 399.00,
    defaultSalePrice: 349.00,
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
    defaultImages: [],
    defaultVideo: 'https://www.youtube.com/embed/UbTsyJpWRNM'
  }
]

export default products; //this is the ES modules way of exporting





// const products = [
//   {
//     // user: xxxx, //will be inserted with seeder script
//     name: 'MicroTherm® 2.0 Down Hooded Jacket',
//     images: [
//       {
//         color: 'Seapine',
//         source: 'https://i.imgur.com/T7pSpXB.jpg',
//         isPrimaryImage: true
//       },
//       {
//         color: 'Med Indigo',
//         source: 'https://i.imgur.com/9xoTDVf.jpg',
//         isPrimaryImage: true
//       },
//     ],
//     brand: 'Eddie Bauer',
//     subBrand: 'First Ascent',
//     categories: ['Jackets', 'Winter'],
//     gender: 'Men',
//     hasSizes: true,
//     colors: [
//       {
//         colorName: 'Med Indigo',
//         colorHexCode: '',
//         // colorPrice: 89.99,
//         clearance: false,
//         tinyImage: '/images/microtherm_MedIndigo_tiny.jpg'
//       },
//       {
//         colorName: 'Seapine',
//         colorHexCode: '',
//         // colorPrice: 79.99,
//         clearance: false,
//         tinyImage: '/images/microtherm_Seapine_tiny.jpg'
//       }
//     ],
//     // sizes: [
//     //   {
//     sizes: [
//       { 
//         sizeCategoryName: 'Regular',
//         sizeCategoryDefaultPrice: 99.99,
//         sizeCategoryColorsAndSizes: [
//           {
//             color: 'Seapine',
//             colorSalePrice: 89.99,
//             sizeCategorySizes: [
//               {
//                 size: 'S',
//                 qty: 3,
//               }, {
//                 size: 'M',
//                 qty: 8
//               }, {
//                 size: 'L',
//                 qty: 10
//               }, {
//                 size: 'XL',
//                 qty: 0
//               }, {
//                 size: 'XXL',
//                 qty: 3
//               }
//             ]
//           },
//           {
//             color: 'Med Indigo',
//             colorSalePrice: 79.99,
//             sizeCategorySizes: [
//               {
//                 size: 'S',
//                 qty: 0
//               }, {
//                 size: 'M',
//                 qty: 0
//               }, {
//                 size: 'L',
//                 qty: 3
//               }, {
//                 size: 'XL',
//                 qty: 1
//               }, {
//                 size: 'XXL',
//                 qty: 6
//               }
//             ]
//           },              
//         ] //End of sizeCategoryColorsAndSizes
//       },
//       { 
//         sizeCategoryName: 'Tall',
//         sizeCategoryDefaultPrice: 109.99,
//         sizeCategoryColorsAndSizes: [
//           {
//             color: 'Seapine',
//             colorSalePrice: 99.99,
//             sizeCategorySizes: [
//               {
//                 size: 'M',
//                 qty: 1
//               }, {
//                 size: 'L',
//                 qty: 20
//               }, {
//                 size: 'XL',
//                 qty: 0
//               }, {
//                 size: 'XXL',
//                 qty: 0
//               }
//             ]
//           },
//           {
//             color: 'Med Indigo',
//             colorSalePrice: 0,
//             sizeCategorySizes: [
//               {
//                 size: 'M',
//                 qty: 2
//               }, {
//                 size: 'L',
//                 qty: 3
//               }, {
//                 size: 'XL',
//                 qty: 8
//               }, {
//                 size: 'XXL',
//                 qty: 7
//               }
//             ]
//           },              
//         ]
//       },
//     ],
//     descriptions: [
//       'Our premium ultralight has a streamlined fit that\'s built for mobility. Comfort is further enhanced with the soft, recycled ripstop polyester shell and its adjustable drawcord hem. But the real crux of this hoodie is the high-loft Premium Goose Down insulation. Maximum warmth. Minimum weight and bulk',
//       'As an ultralight insulating layer, the MicroTherm is thinner than traditional down jackets. But that combination of minimal bulk and effective warmth is what makes it special, and is the result of its unique micro-channel construction and the exceptionally high-loft down that it holds close to the body for maximum thermal efficiency.',
//       // We can inject HTML directly into these strings thanks to the react-html-parser npm package
//       '<span class="font-weight-bold">NOTE:</span> Temperature ratings are based on a controlled laboratory test by an independent university lab. Also consider: your sensitivity to cold and wind-chill; time of exposure; activity level; and use of layering.'
//     ],
//     features: [
//       '1.2 oz 20D recycled ripstop polyester shell—perfect balance of light weight and strength',
//       'StormRepel® Super DWR—our longest lasting moisture-shedding finish',
//       '800 fill Responsible Down Standard (RDS) down, certified by Control Union More About RDS',
//       'Trackmydown supply information on garment—learn where your down comes from and what makes premium down premium',
//       'Insulated hood—elastic binding provides secure fit',
//       'Secure zip pockets—media port in chest pocket',
//       'Packs into chest pocket—space-saving compressibility',
//       'Length, Reg Medium: 28" | Weight: 13.4 oz | Down Fill Weight: 3.2 oz',
//       'Active. An athletic fit. Close to the body without restricting mobility. Designed to fit over baselayers and lightweight midlayers.'
//     ],
//     care: ['Secure all garment closures before laundering. Machine wash cold delicate, separately, using mild detergent only. Do not bleach or use fabric softeners. Rinse thoroughly and remove promptly. Tumble dry low. Do not hang to dry. Do not iron or steam. Do not dry clean. For best results, dry with clean tennis ball.'],
//     materials: [ '100% polyester', 'Imported' ],
//     reviews: [], //come back to this
//     rating: 4,
//     numReviews: 1,
//     defaultPrice: 0,
//     defaultSalePrice: 0,
//     featureIcons: [
//       {
//         heading: 'First Ascent',
//         source: '/images/FeatureIcons/firstAscent.svg'
//       },
//       {
//         heading: 'Temp Rating (Moderate Activity)',
//         source: '/images/FeatureIcons/tempRatingMinus10.svg'
//       },
//       {
//         heading: 'Fill Power',
//         source: '/images/FeatureIcons/fillPower800.svg'
//       },
//       {
//         heading: 'StormRepel Super DWR',
//         source: '/images/FeatureIcons/stormRepelDWR.svg'
//       },
//       {
//         heading: 'Windproof',
//         source: '/images/FeatureIcons/windproof.svg'
//       },
//       {
//         heading: 'Recycled Materials',
//         source: '/images/FeatureIcons/recycledMaterials.svg'
//       }
//     ],
//   }
// ]

// export default products; //this is the ES modules way of exporting

