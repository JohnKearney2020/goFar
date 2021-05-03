const products = [
  {
    //============================================================================================================================
    //                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
    //============================================================================================================================
    // user: xxxx, //will be inserted with seeder script
    isRetired: false,
    name: `Men's MicroTherm® 2.0 Down Hooded Jacket`,
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
        tinyImage: '/images/TinyColorImages/MedIndigo_tiny.jpg'
      },
      {
        colorName: 'Seapine',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/Seapine_tiny.jpg'
      },
      {
        colorName: 'Storm',
        colorHexCode: '',
        clearance: true,
        tinyImage: '/images/TinyColorImages/Storm_tiny.jpg'
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
      `Our premium ultralight has a streamlined fit that's built for mobility. Comfort is further enhanced with the soft, recycled ripstop polyester shell and its adjustable drawcord hem. But the real crux of this hoodie is the high-loft Premium Goose Down insulation. Maximum warmth. Minimum weight and bulk`,
      `As an ultralight insulating layer, the MicroTherm is thinner than traditional down jackets. But that combination of minimal bulk and effective warmth is what makes it special, and is the result of its unique micro-channel construction and the exceptionally high-loft down that it holds close to the body for maximum thermal efficiency.`,
      // We can inject HTML directly into these strings thanks to the react-html-parser npm package
      `<span class="font-weight-bold">NOTE:</span> Temperature ratings are based on a controlled laboratory test by an independent university lab. Also consider: your sensitivity to cold and wind-chill; time of exposure; activity level; and use of layering.`
    ],
    features: [
      `1.2 oz 20D recycled ripstop polyester shell—perfect balance of light weight and strength`,
      `StormRepel® Super DWR—our longest lasting moisture-shedding finish`,
      `800 fill Responsible Down Standard (RDS) down, certified by Control Union More About RDS`,
      `Trackmydown supply information on garment—learn where your down comes from and what makes premium down premium`,
      `Insulated hood—elastic binding provides secure fit`,
      `Secure zip pockets—media port in chest pocket`,
      `Packs into chest pocket—space-saving compressibility`,
      `Length, Reg Medium: 28" | Weight: 13.4 oz | Down Fill Weight: 3.2 oz`,
      `Active. An athletic fit. Close to the body without restricting mobility. Designed to fit over baselayers and lightweight midlayers.`
    ],
    care: [`Secure all garment closures before laundering. Machine wash cold delicate, separately, using mild detergent only. Do not bleach or use fabric softeners. Rinse thoroughly and remove promptly. Tumble dry low. Do not hang to dry. Do not iron or steam. Do not dry clean. For best results, dry with clean tennis ball.`],
    materials: [ '100% polyester', 'Imported' ],
    reviews: [], //come back to this
    rating: 4,
    numReviews: 1,
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
    defaultVideo: 'https://www.youtube.com/embed/t2MGytLDf4I',
    videoThumbnail: 'https://i.imgur.com/ollJCiw.jpg'
  },
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
        tinyImage: '/images/TinyColorImages/AscentBlue_tiny.jpg'
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
  },
  //============================================================================================================================
  //                                              Next Product- Women's Guide Pro Pants
  //============================================================================================================================
  {
    // user: xxxx, //will be inserted with seeder script
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
          {
            source: 'https://i.imgur.com/jfK3DIn.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/eqrnbZU.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/j7ZABp4.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Dk Smoke',
        colorImages: [
          {
            source: 'https://i.imgur.com/OEihoac.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/OEihoac.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/IVimcga.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Dusty Sage',
        colorImages: [
          {
            source: 'https://i.imgur.com/e2xURf8.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/4j0fgO1.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/wRJZHT9.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Graphite',
        colorImages: [
          {
            source: 'https://i.imgur.com/JInTyQT.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/uuKA2vw.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/ODMqY2J.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Med Indigo',
        colorImages: [
          {
            source: 'https://i.imgur.com/1n7uZ7C.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/n5Xo2PY.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/tEZAcE3.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Mulberry',
        colorImages: [
          {
            source: 'https://i.imgur.com/xxUUx4s.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/oGjSOYI.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/LMs2zTS.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Pumice',
        colorImages: [
          {
            source: 'https://i.imgur.com/dXCapf9.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/4DZo5WC.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/4swshw9.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Rust',
        colorImages: [
          {
            source: 'https://i.imgur.com/4g2WVc0.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/3h2Okq5.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/Zbdt98d.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Slate Green',
        colorImages: [
          {
            source: 'https://i.imgur.com/XpOvVWf.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/wzI1qw6.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/QvVDjJX.jpg',
            isPrimaryImage: false,
          }
        ]
      }
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
      {
        colorName: 'Dk Smoke',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/DkSmoke_tiny.jpg'
      },
      {
        colorName: 'Dusty Sage',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/DustySage_tiny.jpg'
      },
      {
        colorName: 'Graphite',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/Graphite_tiny.jpg'
      },
      {
        colorName: 'Med Indigo',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/MedIndigo_tiny.jpg'
      },
      {
        colorName: 'Mulberry',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/Mulberry_tiny.jpg'
      },
      {
        colorName: 'Pumice',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/Pumice_tiny.jpg'
      },
      {
        colorName: 'Rust',
        colorHexCode: '',
        clearance: true,
        tinyImage: '/images/TinyColorImages/Rust_tiny.jpg'
      },
      {
        colorName: 'Slate Green',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/SlateGreen_tiny.jpg'
      }
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
          {
            color: 'Dk Smoke',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 11,
              }, {
                size: '2',
                qty: 2
              }, {
                size: '4',
                qty: 5
              }, {
                size: '6',
                qty: 10
              }, {
                size: '8',
                qty: 3
              }, {
                size: '10',
                qty: 20
              }, {
                size: '12',
                qty: 13
              }, {
                size: '14',
                qty: 1
              }, {
                size: '16',
                qty: 22
              }
            ]
          },
          {
            color: 'Dusty Sage',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 3,
              }, {
                size: '2',
                qty: 4
              }, {
                size: '4',
                qty: 11
              }, {
                size: '6',
                qty: 20
              }, {
                size: '8',
                qty: 6
              }, {
                size: '10',
                qty: 11
              }, {
                size: '12',
                qty: 10
              }, {
                size: '14',
                qty: 9
              }, {
                size: '16',
                qty: 0
              }
            ]
          },
          {
            color: 'Graphite',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 4,
              }, {
                size: '2',
                qty: 11
              }, {
                size: '4',
                qty: 9
              }, {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 0
              }, {
                size: '12',
                qty: 10
              }, {
                size: '14',
                qty: 9
              }, {
                size: '16',
                qty: 0
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 10,
              }, {
                size: '2',
                qty: 1
              }, {
                size: '4',
                qty: 0
              }, {
                size: '6',
                qty: 7
              }, {
                size: '8',
                qty: 20
              }, {
                size: '10',
                qty: 10
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 11
              }, {
                size: '16',
                qty: 6
              }
            ]
          },
          {
            color: 'Mulberry',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 0,
              }, {
                size: '2',
                qty: 11
              }, {
                size: '4',
                qty: 4
              }, {
                size: '6',
                qty: 5
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 1
              }, {
                size: '12',
                qty: 24
              }, {
                size: '14',
                qty: 0
              }, {
                size: '16',
                qty: 16
              }
            ]
          },
          {
            color: 'Pumice',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 10,
              }, {
                size: '2',
                qty: 0
              }, {
                size: '4',
                qty: 0
              }, {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 3
              }, {
                size: '10',
                qty: 20
              }, {
                size: '12',
                qty: 20
              }, {
                size: '14',
                qty: 20
              }, {
                size: '16',
                qty: 0
              }
            ]
          },
          {
            color: 'Rust',
            colorSalePrice: 54.99,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 6,
              }, {
                size: '2',
                qty: 12
              }, {
                size: '4',
                qty: 18
              }, {
                size: '6',
                qty: 3
              }, {
                size: '8',
                qty: 3
              }, {
                size: '10',
                qty: 12
              }, {
                size: '12',
                qty: 1
              }, {
                size: '14',
                qty: 0
              }, {
                size: '16',
                qty: 20
              }
            ]
          },
          {
            color: 'Slate Green',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 0,
              }, {
                size: '2',
                qty: 0
              }, {
                size: '4',
                qty: 0
              }, {
                size: '6',
                qty: 1
              }, {
                size: '8',
                qty: 8
              }, {
                size: '10',
                qty: 9
              }, {
                size: '12',
                qty: 11
              }, {
                size: '14',
                qty: 20
              }, {
                size: '16',
                qty: 20
              }
            ]
          },
        ] //End of sizeCategoryColorsAndSizes
      },
      { 
        sizeCategoryName: 'Petite',
        sizeCategoryDefaultPrice: 80.00,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Black',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 11,
              }, {
                size: '2',
                qty: 15
              }, {
                size: '4',
                qty: 0
              }, {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 30
              }, {
                size: '12',
                qty: 23
              }, {
                size: '14',
                qty: 2
              }, {
                size: '16',
                qty: 0
              }
            ]
          },
          {
            color: 'Dk Smoke',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 1,
              }, {
                size: '2',
                qty: 2
              }, {
                size: '4',
                qty: 3
              }, {
                size: '6',
                qty: 4
              }, {
                size: '8',
                qty: 5
              }, {
                size: '10',
                qty: 20
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 8
              }, {
                size: '16',
                qty: 9
              }
            ]
          },
          {
            color: 'Dusty Sage',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 8,
              }, {
                size: '2',
                qty: 9
              }, {
                size: '4',
                qty: 10
              }, {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 4
              }, {
                size: '10',
                qty: 4
              }, {
                size: '12',
                qty: 2
              }, {
                size: '14',
                qty: 11
              }, {
                size: '16',
                qty: 20
              }
            ]
          },
          {
            color: 'Graphite',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 10,
              }, {
                size: '2',
                qty: 20
              }, {
                size: '4',
                qty: 0
              }, {
                size: '6',
                qty: 3
              }, {
                size: '8',
                qty: 5
              }, {
                size: '10',
                qty: 6
              }, {
                size: '12',
                qty: 20
              }, {
                size: '14',
                qty: 15
              }, {
                size: '16',
                qty: 11
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 0,
              }, {
                size: '2',
                qty: 0
              }, {
                size: '4',
                qty: 2
              }, {
                size: '6',
                qty: 7
              }, {
                size: '8',
                qty: 10
              }, {
                size: '10',
                qty: 13
              }, {
                size: '12',
                qty: 6
              }, {
                size: '14',
                qty: 9
              }, {
                size: '16',
                qty: 9
              }
            ]
          },
          {
            color: 'Mulberry',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 10,
              }, {
                size: '2',
                qty: 21
              }, {
                size: '4',
                qty: 23
              }, {
                size: '6',
                qty: 5
              }, {
                size: '8',
                qty: 11
              }, {
                size: '10',
                qty: 0
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 15
              }, {
                size: '16',
                qty: 4
              }
            ]
          },
          {
            color: 'Pumice',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 0,
              }, {
                size: '2',
                qty: 12
              }, {
                size: '4',
                qty: 12
              }, {
                size: '6',
                qty: 12
              }, {
                size: '8',
                qty: 23
              }, {
                size: '10',
                qty: 0
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 5
              }, {
                size: '16',
                qty: 13
              }
            ]
          },
          {
            color: 'Rust',
            colorSalePrice: 54.99,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 16,
              }, {
                size: '2',
                qty: 16
              }, {
                size: '4',
                qty: 16
              }, {
                size: '6',
                qty: 16
              }, {
                size: '8',
                qty: 16
              }, {
                size: '10',
                qty: 16
              }, {
                size: '12',
                qty: 16
              }, {
                size: '14',
                qty: 16
              }, {
                size: '16',
                qty: 16
              }
            ]
          },
          {
            color: 'Slate Green',
            colorSalePrice: 60.00,
            sizeCategorySizes: [
              {
                size: '0',
                qty: 12,
              }, {
                size: '2',
                qty: 0
              }, {
                size: '4',
                qty: 6
              }, {
                size: '6',
                qty: 22
              }, {
                size: '8',
                qty: 13
              }, {
                size: '10',
                qty: 11
              }, {
                size: '12',
                qty: 1
              }, {
                size: '14',
                qty: 0
              }, {
                size: '16',
                qty: 8
              }
            ]
          },
        ] //End of sizeCategoryColorsAndSizes
      },
      { 
        sizeCategoryName: 'Tall',
        sizeCategoryDefaultPrice: 90.00,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Black',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 12
              }, {
                size: '8',
                qty: 2
              }, {
                size: '10',
                qty: 2
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 23
              }, {
                size: '16',
                qty: 20
              }, {
                size: '18',
                qty: 20
              }
            ]
          },
          {
            color: 'Dk Smoke',
            colorSalePrice: 0,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 5
              }, {
                size: '12',
                qty: 20
              }, {
                size: '14',
                qty: 23
              }, {
                size: '16',
                qty: 15
              }, {
                size: '18',
                qty: 10
              }
            ]
          },
          {
            color: 'Dusty Sage',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 12
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 5
              }, {
                size: '12',
                qty: 4
              }, {
                size: '14',
                qty: 0
              }, {
                size: '16',
                qty: 20
              }, {
                size: '18',
                qty: 15
              }
            ]
          },
          {
            color: 'Graphite',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 1
              }, {
                size: '8',
                qty: 2
              }, {
                size: '10',
                qty: 20
              }, {
                size: '12',
                qty: 11
              }, {
                size: '14',
                qty: 23
              }, {
                size: '16',
                qty: 20
              }, {
                size: '18',
                qty: 20
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 0
              }, {
                size: '12',
                qty: 0
              }, {
                size: '14',
                qty: 0
              }, {
                size: '16',
                qty: 0
              }, {
                size: '18',
                qty: 0
              }
            ]
          },
          {
            color: 'Mulberry',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 10
              }, {
                size: '8',
                qty: 10
              }, {
                size: '10',
                qty: 10
              }, {
                size: '12',
                qty: 10
              }, {
                size: '14',
                qty: 1
              }, {
                size: '16',
                qty: 4
              }, {
                size: '18',
                qty: 5
              }
            ]
          },
          {
            color: 'Pumice',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 0
              }, {
                size: '8',
                qty: 0
              }, {
                size: '10',
                qty: 0
              }, {
                size: '12',
                qty: 5
              }, {
                size: '14',
                qty: 5
              }, {
                size: '16',
                qty: 0
              }, {
                size: '18',
                qty: 0
              }
            ]
          },
          {
            color: 'Rust',
            colorSalePrice: 54.99,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 17
              }, {
                size: '8',
                qty: 1
              }, {
                size: '10',
                qty: 1
              }, {
                size: '12',
                qty: 7
              }, {
                size: '14',
                qty: 8
              }, {
                size: '16',
                qty: 11
              }, {
                size: '18',
                qty: 5
              }
            ]
          },
          {
            color: 'Slate Green',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '6',
                qty: 2
              }, {
                size: '8',
                qty: 7
              }, {
                size: '10',
                qty: 10
              }, {
                size: '12',
                qty: 10
              }, {
                size: '14',
                qty: 5
              }, {
                size: '16',
                qty: 0
              }, {
                size: '18',
                qty: 0
              }
            ]
          },
        ] //End of sizeCategoryColorsAndSizes
      },
      { 
        sizeCategoryName: 'Plus',
        sizeCategoryDefaultPrice: 90.00,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Black',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 0
              }, {
                size: '18W',
                qty: 10
              }, {
                size: '20W',
                qty: 15
              }, {
                size: '22W',
                qty: 2
              }, {
                size: '24W',
                qty: 7
              }
            ]
          },
          {
            color: 'Dk Smoke',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 0
              }, {
                size: '18W',
                qty: 0
              }, {
                size: '20W',
                qty: 0
              }, {
                size: '22W',
                qty: 2
              }, {
                size: '24W',
                qty: 0
              }
            ]
          },
          {
            color: 'Dusty Sage',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 10
              }, {
                size: '18W',
                qty: 10
              }, {
                size: '20W',
                qty: 15
              }, {
                size: '22W',
                qty: 2
              }, {
                size: '24W',
                qty: 0
              }
            ]
          },
          {
            color: 'Graphite',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 0
              }, {
                size: '18W',
                qty: 10
              }, {
                size: '20W',
                qty: 15
              }, {
                size: '22W',
                qty: 2
              }, {
                size: '24W',
                qty: 7
              }
            ]
          },
          {
            color: 'Med Indigo',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 5
              }, {
                size: '18W',
                qty: 5
              }, {
                size: '20W',
                qty: 4
              }, {
                size: '22W',
                qty: 1
              }, {
                size: '24W',
                qty: 2
              }
            ]
          },
          {
            color: 'Mulberry',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 0
              }, {
                size: '18W',
                qty: 0
              }, {
                size: '20W',
                qty: 4
              }, {
                size: '22W',
                qty: 5
              }, {
                size: '24W',
                qty: 1
              }
            ]
          },
          {
            color: 'Pumice',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 5
              }, {
                size: '18W',
                qty: 5
              }, {
                size: '20W',
                qty: 4
              }, {
                size: '22W',
                qty: 1
              }, {
                size: '24W',
                qty: 3
              }
            ]
          },
          {
            color: 'Rust',
            colorSalePrice: 54.99,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 15
              }, {
                size: '18W',
                qty: 20
              }, {
                size: '20W',
                qty: 24
              }, {
                size: '22W',
                qty: 0
              }, {
                size: '24W',
                qty: 0
              }
            ]
          },
          {
            color: 'Slate Green',
            colorSalePrice: 67.50,
            sizeCategorySizes: [
              {
                size: '16W',
                qty: 1
              }, {
                size: '18W',
                qty: 1
              }, {
                size: '20W',
                qty: 15
              }, {
                size: '22W',
                qty: 15
              }, {
                size: '24W',
                qty: 15
              }
            ]
          },
        ] //End of sizeCategoryColorsAndSizes
      },
    ],
    descriptions: [
      `Our Guides' choice for everything outside: from moving fast in the mountains to lounging in camp. Lightweight, packable, two-way stretch Flexion nylon/spandex provides mobility and has a durable water-repellent finish.`,
      `Eddie Bauer has partnered with bluesign® to ensure safe and sustainable textile production. By following their criteria, we are working to keep harmful chemicals out of the air and oceans — and out of our products.`,
    ],
    features: [
      `bluesign® certified fabric: Ensures safe and sustainable textile production`,
      `FreeShade® UPF 50+ sun protection: Sunscreen In Your Size®`,
      `StormRepel® DWR Finish: Sheds moisture so it doesn't soak in`,
      `Two secure zip cargo pockets: Keep essentials accessible`,
      `Inseam: Reg 32" | Petite 29" | Tall 35" | Wos 32"`,
      `Slightly Curvy. Sits below natural waist; mid-rise; moderately curvy through hip and thigh.`
    ],
    care: [`Machine wash cold delicate with like colors. Do not bleach or use fabric softeners. Tumble dry low. Remove promptly. Cool iron as desired.`],
    materials: [ `96% nylon/4% spandex`, `Imported` ],
    reviews: [], //come back to this
    rating: 5,
    numReviews: 12,
    featureIcons: [
      {
        heading: 'First Ascent',
        source: '/images/FeatureIcons/firstAscent.svg'
      },
      {
        heading: 'UPF 50+',
        source: '/images/FeatureIcons/upf50Plus.svg'
      },
      {
        heading: 'StormRepel Super DWR',
        source: '/images/FeatureIcons/stormRepelDWR.svg'
      },
      {
        heading: 'Secure Pocket',
        source: '/images/FeatureIcons/securePocket.svg'
      },
      {
        heading: 'Lightweight',
        source: '/images/FeatureIcons/lightWeight.svg'
      },
      {
        heading: 'Packable',
        source: '/images/FeatureIcons/packable.svg'
      },

    ],
    defaultImages: [
      'https://i.imgur.com/Xpi5sJR.jpg',
      'https://i.imgur.com/RrL1rZa.jpg',
      'https://i.imgur.com/oIV3hL6.jpg',
      'https://i.imgur.com/29u90UO.jpg'
    ],
    defaultVideo: 'https://www.youtube.com/embed/ObyTwHWmIy8',
    videoThumbnail: 'https://i.imgur.com/WUxjLKH.jpg'
  },
  //============================================================================================================================
  //                                          Next Product - Women's Trail Tight Leggings - High Rise
  //============================================================================================================================
  {
    isRetired: false,
    name: `Trail Tight Leggings - High Rise`,
    images: [
      {
        color: 'Black',
        colorImages: [
          {
            source: 'https://i.imgur.com/t6bd0WN.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://i.imgur.com/9qcyzBK.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://i.imgur.com/XkedRUF.jpg',
            isPrimaryImage: false,
          }
        ]
      },
      {
        color: 'Dk Loden',
        colorImages: [
          {
            source: 'https://imgur.com/fj3bNYp.jpg',
            isPrimaryImage: true,
          },
          {
            source: 'https://imgur.com/CrXAqJk.jpg',
            isPrimaryImage: false,
          },
          {
            source: 'https://imgur.com/U9ZLmvC.jpg',
            isPrimaryImage: false,
          }
        ]
      },
    ],
    brand: 'Eddie Bauer',
    subBrand: '',
    categories: ['Pants', 'Leggings'],
    gender: 'Women',
    hasSizes: true,
    colors: [
      {
        colorName: 'Black',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/Black_tiny.jpg'
      },
      {
        colorName: 'Dk Loden',
        colorHexCode: '',
        clearance: false,
        tinyImage: '/images/TinyColorImages/DkLoden_tiny.jpg'
      },
    ],
    sizes: [
      { 
        sizeCategoryName: 'Regular',
        sizeCategoryDefaultPrice: 90.00,
        sizeCategoryColorsAndSizes: [
          {
            color: 'Black',
            colorSalePrice: 63.00,
            sizeCategorySizes: [
              {
                size: 'XS',
                qty: 50,
              }, {
                size: 'S',
                qty: 50
              }, {
                size: 'M',
                qty: 50
              }, {
                size: 'L',
                qty: 50
              }, {
                size: 'XL',
                qty: 50
              }, {
                size: 'XXL',
                qty: 50
              },
            ]
          },
          {
            color: 'Dk Loden',
            colorSalePrice: 63.00,
            sizeCategorySizes: [
              {
                size: 'XS',
                qty: 50,
              }, {
                size: 'S',
                qty: 50
              }, {
                size: 'M',
                qty: 50
              }, {
                size: 'L',
                qty: 50
              }, {
                size: 'XL',
                qty: 50
              }, {
                size: 'XXL',
                qty: 50
              },
            ]
          },
        ] //End of sizeCategoryColorsAndSizes
      },
    ], //End of Sizes
    descriptions: [
      `The high-rise version of the best trail tights ever made—created specifically for hiking and scrambling, and perfectly adapted to any active or leisure pursuit. The moisture-wicking polyester/spandex stretch fabric features UPF sun protection and odor control technologies. Mesh piecing on legs enhance ventilation.`,
      `Models shown are 5'9" to 5'11" tall, wearing size S/4 or XL/16`,
    ],
    features: [
      `FreeDry® moisture wicking`,
      `FreeShade® UPF 50+ sun protection`,
      `Polygiene® odor control. Wear More. Wash Less®`,
      `Supportive, figure-flattering high-rise style`,
      `Two drop-in cargo pockets`,
      `Secure zip vertical pocket`,
      `Power Mesh waistband for secure fit that won't inch down in back during activities`,
      `Chemical-free Coolcore® crotch gusset wicks moisture`,
      `Inseam: 28" Reg | 25" Petite | 31" Tall | 28" Wos`,
      `Active; Our most athletic fit. Close to the body without restricting mobility.`
    ],
    care: [`Turn garment inside out. Machine wash cold delicate, separately, using mild liquid detergent. Do not bleach or use fabric softeners. Tumble dry low. Remove promptly. Do not iron. Do not dry clean.`],
    materials: [ `88% polyester/12% spandex`, `Imported` ],
    reviews: [], //come back to this
    rating: 0,
    numReviews: 0,
    featureIcons: [
      {
        heading: 'Moisture Wicking',
        source: '/images/FeatureIcons/moistureWicking.svg'
      },
      {
        heading: 'Odor Control',
        source: '/images/FeatureIcons/odorControl.svg'
      },
      {
        heading: 'UPF 50',
        source: '/images/FeatureIcons/upf50Plus.svg'
      },
      {
        heading: 'Stretch',
        source: '/images/FeatureIcons/stretch.svg'
      },
      {
        heading: 'Secure Pocket',
        source: '/images/FeatureIcons/securePocket.svg'
      },
    ],
    defaultImages: [
      'https://i.imgur.com/KgG5qP8.jpg',
      'https://i.imgur.com/zfzFGc3.jpg',
      'https://i.imgur.com/wguAaFV.jpg',
      'https://i.imgur.com/18MJFYR.jpg',
      'https://i.imgur.com/Xiveq8G.jpg',
    ],
    defaultVideo: '',
    videoThumbnail: ''
  },
]

export default products; //this is the ES modules way of exporting

