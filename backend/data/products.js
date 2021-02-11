const products = [
  {
    // user: xxxx, //will be inserted with seeder script
    name: 'MicroTherm® 2.0 Down Hooded Jacket',
    images: [
      {
        color: 'Seapine',
        source: 'https://i.imgur.com/T7pSpXB.jpg',
        isPrimaryImage: true
      },
      {
        color: 'Med Indigo',
        source: 'https://i.imgur.com/9xoTDVf.jpg',
        isPrimaryImage: true
      },
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
        // colorPrice: 89.99,
        clearance: false,
        tinyImage: '/images/microtherm_MedIndigo_tiny.jpg'
      },
      {
        colorName: 'Seapine',
        colorHexCode: '',
        // colorPrice: 79.99,
        clearance: false,
        tinyImage: '/images/microtherm_Seapine_tiny.jpg'
      }
    ],
    // sizes: [
    //   {
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
        ]
      },
    ],
    description1: 'Our premium ultralight has a streamlined fit that\'s built for mobility. Comfort is further enhanced with the soft, recycled ripstop polyester shell and its adjustable drawcord hem. But the real crux of this hoodie is the high-loft Premium Goose Down insulation. Maximum warmth. Minimum weight and bulk',
    description2: 'As an ultralight insulating layer, the MicroTherm is thinner than traditional down jackets. But that combination of minimal bulk and effective warmth is what makes it special, and is the result of its unique micro-channel construction and the exceptionally high-loft down that it holds close to the body for maximum thermal efficiency.',
    description3: 'NOTE: Temperature ratings are based on a controlled laboratory test by an independent university lab. Also consider: your sensitivity to cold and wind-chill; time of exposure; activity level; and use of layering.',
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
    care: 'Secure all garment closures before laundering. Machine wash cold delicate, separately, using mild detergent only. Do not bleach or use fabric softeners. Rinse thoroughly and remove promptly. Tumble dry low. Do not hang to dry. Do not iron or steam. Do not dry clean. For best results, dry with clean tennis ball.',
    materials: [ '100% polyester', 'Imported' ],
    reviews: [], //come back to this
    rating: 4,
    numReviews: 1,
    defaultPrice: 0,
    defaultSalePrice: 0
  }
]

export default products; //this is the ES modules way of exporting

