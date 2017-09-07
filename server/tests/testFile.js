export const documentDetail = [{
  id: 1,
  ownerId: 5,
  title: 'Hello World',
  content: 'Welcome to this world',
  access: 'private',
  ownerRoleId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 2,
  ownerId: 4,
  title: 'Joy',
  content: 'Joy to the world',
  access: 'private',
  ownerRoleId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 3,
  ownerId: 2,
  title: 'We are making progress',
  content: 'Andela is fun, Andela is awesome',
  access: 'public',
  ownerRoleId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 4,
  ownerId: 5,
  title: 'I have headache',
  content: 'I am very weary but no time for rest',
  access: 'public',
  ownerRoleId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 5,
  ownerId: 6,
  title: 'Good better best ',
  content: 'My better is becoming much better',
  access: 'role',
  createdAt: new Date(),
  updatedAt: new Date()
}];

export const userDetail = [{
  id: 4,
  username: 'jbaby',
  firstname: 'yems',
  lastname: 'meee',
  email: 'yems@yems.com',
  password: '12345678',
  roleId: 1
}, {
  id: 1,
  username: 'bestie',
  firstname: 'yemzi',
  lastname: 'yale',
  email: 'seun@seun.com',
  password: '12345678',
  roleId: 2
}, {
  id: 5,
  username: 'tolu',
  firstname: 'seun',
  lastname: 'tolu',
  email: 'one@one.com',
  password: '12345678',
  roleId: 3
}, {
  id: 6,
  username: 'titi',
  firstname: 'bola',
  lastname: 'tolu',
  email: 'me@you.com',
  password: '12345678',
  roleId: 3
}];

export const roleDetail = [{
  id: 1,
  title: 'Superadmin',
  createdAt: new Date(),
  updatedAt: new Date()
},{
  id: 2,
  title: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
},{
  id: 3,
  title: 'regular',
  createdAt: new Date(),
  updatedAt: new Date()
}];

export const defaultUser = [{
  id: 10,
  username: 'newnew',
  firstname: 'newnew',
  lastname: 'newnew',
  email: 'newnew@mail.com',
  password: '1111111111'
},
{
  id: 11,
  username: 'admin',
  firstname: 'admin',
  lastname: 'admin',
  email: 'admin@mail.com',
  password: 'password',
  roleId: 2
}];

export const invalidUserParams = [
  {
    username: 'meeee',
    firstname: 'some',
    lastname: 'one',
    email: 'hellooooo',
    password: 'hello@01'
  },
  {
    firstname: 'bae',
    lastname: 'friend',
    email: 'bae@bae.com',
    password: 'hello@01'
  },
  {
    firstname: 'heeey',
    lastname: 'friend',
    email: 'bae@b',
    password: 'hello@01'
  },
  {
    username: 'meeee',
    firstname: 'heeey',
    lastname: 'friend',
    email: 'bae@b',
    password: 'hello@01'
  }

];
