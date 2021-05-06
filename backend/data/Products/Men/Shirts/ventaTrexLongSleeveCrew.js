import {
  dkLodenTinyImg,
  dkTealTinyImg,
  salsaTinyImg
} from '../../../tinyImageConstants.js';

// ============================================================================================================================
//                                    First Product - Men's Microtherm 2.0 Down Hooded Jacket
//============================================================================================================================
export const ventaTrexLongSleeveCrew = 
{

  // user: xxxx, //will be inserted with seeder script
  isRetired: false,
  name: `Ventatrex Long-Sleeve Crew`,
  images: [
    {
      color: 'Dk Loden',
      colorImages: [
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/dkLoden1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/dkLoden2.jpg',
          isPrimaryImage: false,
        }
      ]
    },
    {
      color: 'Dk Teal',
      colorImages: [
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/dkTeal1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/dkTeal2.jpg',
          isPrimaryImage: false,
        }
      ]
    },
    {
      color: 'Salsa',
      colorImages: [
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/salsa1.jpg',
          isPrimaryImage: true,
        },
        {
          source: '/images/ProductImages/Shirts/ventatrexLongSleeve/salsa2.jpg',
          isPrimaryImage: false,
        }
      ]
    }
  ],
  brand: 'Eddie Bauer',
  subBrand: '',
  categories: ['Shirts', 'Long Sleeve Shirts'],
  gender: 'men',
  hasSizes: true,
  colors: [
    {
      colorName: 'Dk Loden',
      colorHexCode: '',
      clearance: false,
      tinyImage: dkLodenTinyImg
    },
    {
      colorName: 'Dk Teal',
      colorHexCode: '',
      clearance: false,
      tinyImage: dkTealTinyImg
    },
    {
      colorName: 'Salsa',
      colorHexCode: '',
      clearance: true,
      tinyImage: salsaTinyImg
    }
  ],
  sizes: [
    { 
      sizeCategoryName: 'Regular',
      sizeCategoryDefaultPrice: 50.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Dk Loden',
          colorSalePrice: 35.00,
          sizeCategorySizes: [
            {
              size: 'S',
              qty: 20,
            }, {
              size: 'M',
              qty: 20
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
          color: 'Dk Teal',
          colorSalePrice: 37.50,
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
          color: 'Salsa',
          colorSalePrice: 32.50,
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
              qty: 20
            }, {
              size: 'XXL',
              qty: 20
            }
          ]
        },              
      ] //End of sizeCategoryColorsAndSizes
    },
    { 
      sizeCategoryName: 'Tall',
      sizeCategoryDefaultPrice: 55.00,
      sizeCategoryColorsAndSizes: [
        {
          color: 'Dk Loden',
          colorSalePrice: 38.50,
          sizeCategorySizes: [
            {
              size: 'M',
              qty: 1
            }, {
              size: 'L',
              qty: 20
            }, {
              size: 'XL',
              qty: 5
            }, {
              size: 'XXL',
              qty: 5
            }, {
              size: 'XXXL',
              qty: 11
            }
          ]
        },
        {
          color: 'Dk Teal',
          colorSalePrice: 38.50,
          sizeCategorySizes: [
            {
              size: 'M',
              qty: 4
            }, {
              size: 'L',
              qty: 4
            }, {
              size: 'XL',
              qty: 8
            }, {
              size: 'XXL',
              qty: 12
            }, {
              size: 'XXXL',
              qty: 0
            }
          ]
        },              
        {
          color: 'Salsa',
          colorSalePrice: 36.00,
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
            }, {
              size: 'XXXL',
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
    `SalsaRepel® Super DWR—our longest lasting moisture-shedding finish`,
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
  rating: 0,
  numReviews: 0,
  featureIcons: [],
  defaultImages: [],
  defaultVideo: '',
  videoThumbnail: ''
}