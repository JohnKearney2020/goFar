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
        colorName: 'Seapine',
        colorHexCode: '',
        colorPrice: 99.99,
        clearance: false
      },
      {
        colorName: 'Med Indigo',
        colorHexCode: '',
        colorPrice: 79.99,
        clearance: false
      }
    ],
    sizes: [
      {
        color: 'Seapine',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'S',
        qty: 3
      },
      {
        color: 'Seapine',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'M',
        qty: 8
      },
      {
        color: 'Seapine',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'L',
        qty: 10
      },
      {
        color: 'Seapine',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'XL',
        qty: 0
      },
      {
        color: 'Seapine',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'XXL',
        qty: 3
      },
      {
        color: 'Seapine',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'M',
        qty: 1
      },
      {
        color: 'Seapine',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'L',
        qty: 20
      },
      {
        color: 'Seapine',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'XL',
        qty: 0
      },
      {
        color: 'Seapine',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'XXL',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'S',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'M',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'L',
        qty: 3
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'XL',
        qty: 1
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Regular', // 'Regular', 'Tall', 'Short
        size: 'XXL',
        qty: 6
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'M',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'L',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'XL',
        qty: 0
      },
      {
        color: 'Med Indigo',
        sizeCategory: 'Tall', // 'Regular', 'Tall', 'Short
        size: 'XXL',
        qty: 2
      },
    ],
    description1: 'Our premium ultralight has a streamlined fit that\'s built for mobility. Comfort is further enhanced with the soft, recycled ripstop polyester shell and its adjustable drawcord hem. But the real crux of this hoodie is the high-loft Premium Goose Down insulation. Maximum warmth. Minimum weight and bulk',
    description2: 'As an ultralight insulating layer, the MicroTherm is thinner than traditional down jackets. But that combination of minimal bulk and effective warmth is what makes it special, and is the result of its unique micro-channel construction and the exceptionally high-loft down that it holds close to the body for maximum thermal efficiency.',
    description3: 'NOTE: Temperature ratings are based on a controlled laboratory test by an independent university lab. Also consider: your sensitivity to cold and wind-chill; time of exposure; activity level; and use of layering.',
    // features: [
    //   { featuresBullet: '1.2 oz 20D recycled ripstop polyester shell—perfect balance of light weight and strength' },
    //   { featuresBullet: 'StormRepel® Super DWR—our longest lasting moisture-shedding finish' },
    //   { featuresBullet: '800 fill Responsible Down Standard (RDS) down, certified by Control Union More About RDS' },
    //   { featuresBullet: 'Trackmydown supply information on garment—learn where your down comes from and what makes premium down premium' },
    //   { featuresBullet: 'Insulated hood—elastic binding provides secure fit' },
    //   { featuresBullet: 'Secure zip pockets—media port in chest pocket' },
    //   { featuresBullet: 'Packs into chest pocket—space-saving compressibility' },
    //   { featuresBullet: 'Length, Reg Medium: 28\" | Weight: 13.4 oz | Down Fill Weight: 3.2 oz' },
    //   { featuresBullet: 'Active. An athletic fit. Close to the body without restricting mobility. Designed to fit over baselayers and lightweight midlayers.' }
    // ],
    features: [
      '1.2 oz 20D recycled ripstop polyester shell—perfect balance of light weight and strength',
      'StormRepel® Super DWR—our longest lasting moisture-shedding finish',
      '800 fill Responsible Down Standard (RDS) down, certified by Control Union More About RDS',
      'Trackmydown supply information on garment—learn where your down comes from and what makes premium down premium',
      'Insulated hood—elastic binding provides secure fit',
      'Secure zip pockets—media port in chest pocket',
      'Packs into chest pocket—space-saving compressibility',
      'Length, Reg Medium: 28\" | Weight: 13.4 oz | Down Fill Weight: 3.2 oz',
      'Active. An athletic fit. Close to the body without restricting mobility. Designed to fit over baselayers and lightweight midlayers.'
    ],
    care: 'Secure all garment closures before laundering. Machine wash cold delicate, separately, using mild detergent only. Do not bleach or use fabric softeners. Rinse thoroughly and remove promptly. Tumble dry low. Do not hang to dry. Do not iron or steam. Do not dry clean. For best results, dry with clean tennis ball.',
    materials: [ '100% polyester', 'Imported' ],
    // reviews: [], //come back to this
    rating: 4,
    numReviews: 1,
    defaultPrice: 99.99,
    // salePrice: 0,
    // clearance: false,
    // countInStock: 10
  }
]

export default products; //this is the ES modules way of exporting




// const products = [
//   {
//     name: 'Airpods Wireless Bluetooth Headphones',
//     image: '/images/airpods.jpg',
//     description:
//       'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
//     brand: 'Apple',
//     category: 'Electronics',
//     price: 89.99,
//     countInStock: 3,
//     rating: 4.5,
//     numReviews: 4,
//   },
//   {
//     name: 'iPhone 11 Pro 256GB Memory',
//     image: '/images/phone.jpg',
//     description:
//       'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
//     brand: 'Apple',
//     category: 'Electronics',
//     price: 599.99,
//     countInStock: 10,
//     rating: 4.0,
//     numReviews: 4,
//   },
//   {
//     name: 'Cannon EOS 80D DSLR Camera',
//     image: '/images/camera.jpg',
//     description:
//       'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
//     brand: 'Cannon',
//     category: 'Electronics',
//     price: 929.99,
//     countInStock: 5,
//     rating: 3,
//     numReviews: 3,
//   },
//   {
//     name: 'Sony Playstation 4 Pro White Version',
//     image: '/images/playstation.jpg',
//     description:
//       'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
//     brand: 'Sony',
//     category: 'Electronics',
//     price: 399.99,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 3,
//   },
//   {
//     name: 'Logitech G-Series Gaming Mouse',
//     image: '/images/mouse.jpg',
//     description:
//       'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
//     brand: 'Logitech',
//     category: 'Electronics',
//     price: 49.99,
//     countInStock: 7,
//     rating: 3.5,
//     numReviews: 2,
//   },
//   {
//     name: 'Amazon Echo Dot 3rd Generation',
//     image: '/images/alexa.jpg',
//     description:
//       'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
//     brand: 'Amazon',
//     category: 'Electronics',
//     price: 29.99,
//     countInStock: 0,
//     rating: 4,
//     numReviews: 4,
//   },
// ]

// export default products; //this is the ES modules way of exporting

// in order to use this on the backend before we've set up the backend for ES modules, we need to export via common js:
// module.exports = products
