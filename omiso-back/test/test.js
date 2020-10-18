/* eslint-disable no-undef */
require('dotenv').config({ path: './Config/config.env' });

// import
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = require('chai');
const User = require('../Models/UserModel');
const Order = require('../Models/OrderModel');
const app = require('../app');

chai.use(chaihttp);

describe('Test interface user', () => {
  before(() => {
    User.deleteMany({ email: 'usertest@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });

    Order.deleteMany({ comment: 'test order' })
      .then()
      .catch((e) => { console.log(e); });
  });

  it('user should signup Client', (done) => {
    const userTest = {
      email: 'usertest@gmail.com',
      lastname: 'utilisateur test',
      firstname: 'uilisateur test',
      password: 'toto',
      phone_number: '0655414114',
    };
    chai.request(app)
      .post('/utilisateur/inscription')
      .send(userTest)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Compte créé avec succès');
        done();
      });
  });

  it('user should login Client', (done) => {
    const userTest = {
      email: 'usertest@gmail.com',
      lastname: 'utilisateur test',
      firstname: 'uilisateur test',
      password: 'toto',
      phone_number: '065520605252',
    };
    chai.request(app)
      .post('/utilisateur/login')
      .send(userTest)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        tokentest = res.body.token;
        done();
      });
  });

  it('user should GET all menu ', (done) => {
    chai.request(app) 
      .get('/menu')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.menuItems).to.be.an('array');
        expect(res.body.menuItems[0]).to.have.property('price');
        expect(res.body.menuItems[0]).to.have.property('category');
        expect(res.body.menuItems[0]).to.have.property('name');
        expect(res.body.menuItems[0]).to.have.property('urlImage');
        done();
      });
  });

  it('user should POST Order', (done) => {
    const postOrder = {
      Orders:
         { menus: [{ menu: '5f66fc6d279f073aa8e0bf38', Number_MenuItem: 4 }], comment: 'test order' },
    };
    chai.request(app)
      .post('/commande')
      .set('Authorization', `bearer ${tokentest}`)
      .send(postOrder)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    setTimeout(done(), 3000);
  });
});
