// /*eslint no-unused-expressions: "off"*/
// import supertest from 'supertest';
// import should from 'should';
// import chai from 'chai';
// import { userDetail } from '../testFile';
// import app from '../../../server';
// import db from '../../models';


// const expect = chai.expect;
// const request = supertest(app);

// describe('User Model', () => {
//   let user;
//   describe('User validation', () => {
//     it('should create new user', (done) => {
//       db.User.create(user)
//         .then((newUser) => {
//           user = newUser;
//           done();
//         });
//     });
//     it('should be able to create a user', () => {
//       expect(user).to.exist;
//       expect(typeof user).to.equal('object');
//     });
//     it('user should have username', () => {
//       expect(user).to.exist;
//       expect(user).to.have.deep.property('username');
//     });
//     it('should create a user with first name & last name', () => {
//       expect(user.username).to.equal(helper.username);
//       expect(user.name).to.equal(helper.name);
//     });
//     it('should create a user with a valid email', () => {
//       expect(user.email).to.equal(helper.email);
//     });
//     it('should ensure that username is not null', () => {
//       db.User.create(helper.noUsername)
//         .catch((error) => {
//           expect(/notNull Violation: username cannot be null/
//             .test(error.message)).to.be.true;
//         });
//     });
//     it('should create a user with a defined role', (done) => {
//       db.User.findById(user.id, {
//           include: [db.Role]
//         })
//         .then((foundUser) => {
//           expect(foundUser.Role.title).to.equal('User');
//           done();
//         });
//     });
//   });
//   describe('Email validation', () => {
//     it('should ensure that email is authenthic', () => {
//       db.User.create(helper.invalidEmail)
//         .catch((error) => {
//           expect(/Validation error: Validation isEmail failed/
//             .test(error.message)).to.be.true;
//         });
//     });
//   });
//   describe('Password Validation', () => {
//     it('should be valid if compared', () => {
//       db.User.create(helper.newUser)
//         .then((createdUser) => {
//           expect(createdUser.validPassword(helper.newUser.password)).to.be.true;
//         });
//     });
//   });
// });
