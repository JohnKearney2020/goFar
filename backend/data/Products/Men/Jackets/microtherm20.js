import {
  medIndigoTinyImg,
  seapineTinyImg,
  stormTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const microtherm20 = 
{

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
      tinyImage: medIndigoTinyImg
    },
    {
      colorName: 'Seapine',
      colorHexCode: '',
      clearance: false,
      tinyImage: seapineTinyImg
    },
    {
      colorName: 'Storm',
      colorHexCode: '',
      clearance: true,
      tinyImage: stormTinyImg
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
}