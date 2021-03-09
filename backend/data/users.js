//Remember, that data we create here in the data folder must match the models we created in our 'models' folder or mongoose won't let us use it in our db

import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gofar.com',
    password: bcrypt.hashSync('12345', 10), //normally this would best be done asynchronously, but it's fine here synchronously w/ just 3 users
    isAdmin: true,
    wishList: [],
    cart: []
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    wishList: [],
    cart: []
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    wishList: [],
    cart: []
  }
];

export default users;