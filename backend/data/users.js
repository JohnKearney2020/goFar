//Remember, that data we create here in the data folder must match the models we created in our 'models' folder or mongoose won't let us use it in our db

import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gofar.com',
    password: bcrypt.hashSync('12345', 10), //normally this would best be done asynchronously, but it's fine here synchronously w/ just 3 users
    isAdmin: true,
    addresses: [{
      isPrimary: true,
      addressName: 'Home',
      line1: '3 Hermann Museum Circle Dr',
      line2: 'Apt 1112',
      city: 'Houston',
      state: 'TX',
      zipCode: '77004'
    }],
    phoneNumber: '123-456-7890',
    wishList: [],
    cart: []
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    addresses: [{
      isPrimary: true,
      addressName: 'The Cannon West',
      line1: '1334 Brittmore Rd',
      line2:'#1327',
      city: 'Houston',
      state: 'TX',
      zipCode: '77004'
    }],
    phoneNumber: '123-456-7890',
    wishList: [],
    cart: []
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    addresses: [{
      isPrimary: true,
      addressName: 'Houston Zoo',
      line1: '6200 Hermann Park Dr',
      line2: '',
      city: 'Houston',
      state: 'TX',
      zipCode: '77030'
    }],
    phoneNumber: '123-456-7890',
    wishList: [],
    cart: []
  },
  {
    name: 'Guest',
    email: 'guest@example.com',
    password: bcrypt.hashSync('12345', 10),
    addresses: [{
      isPrimary: true,
      addressName: 'Johnson Space Center',
      line1: '2101 E NASA Pkwy',
      line2: '',
      city: 'Houston',
      state: 'TX',
      zipCode: '77058'
    }],
    phoneNumber: '123-456-7890',
    wishList: [],
    cart: []
  },
];

export default users;