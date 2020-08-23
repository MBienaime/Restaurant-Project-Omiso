/* eslint-disable no-undef */
// Import models Data Base
const mongoose = require('mongoose');
const Order = require('../Models/OrderModel');
const Menu = require('../Models/MenuItemModel');
const User = require('../Models/UserModel');
require('dotenv').config({ path: './Config/config.env' });

// import
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const { request } = require('chai');
const { expect } = require('chai');
const { findOne } = require('../Models/UserModel');

chai.use(chaihttp);

describe('Unit Test API Omiso', () => {
  after(() => {
    Menu.deleteMany({ name: 'testName' })
      .then()
      .catch((e) => { console.log(e); });
    User.deleteMany({ email: 'usertest@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });
    User.deleteMany({ email: 'employetest@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });

    User.deleteMany({ email: 'admintest@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });

    User.deleteMany({ email: 'employetest2@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });

    User.deleteMany({ email: 'usertest2@gmail.com' })
      .then()
      .catch((e) => { console.log(e); });
  });

  describe('#Test admin', () => {
    // test route admin

    describe('#Test connexion', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'admintest@gmail.com',
          lastname: 'utilisateur test',
          firstname: 'uilisateur test',
          password: 'toto',
          role: 'admin',
          phone_number: '065520605252',
        };
        chai.request(app)
          .post('/utilisateur/inscription')
          .send(userTest)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });

      it('should login user', (done) => {
        const userTest = {
          email: 'admintest@gmail.com',
          password: 'toto',
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

      it('should Find all users', (done) => {
        chai.request(app)
          .get('/utilisateur')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('users');
            expect(res.body.users).to.be.an('array');
            done();
          });
      });
      it('should Find user by id', (done) => {
        User.findOne({ email: 'admintest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .get(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it('should Delete user by id', (done) => {
        User.findOne({ email: 'admintest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .delete(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });
    });

    // test route menu

    describe('#Test Menu route', () => {
      it('should POST menu ', (done) => {
        const post_order = {
          name: 'testMenu',
          description: 'test description',
          price: 4,
          category: 'Plat',
        };

        chai.request(app)
          .post('/menu')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_order)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.createdMenuItem).to.be.an('object');
            done();
          });
      });

      it('should GET all menu ', (done) => {
        chai.request(app)
          .get('/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.menuItems).to.be.an('array');
            expect(res.body.menuItems[0]).to.have.property('_id');
            expect(res.body.menuItems[0]).to.have.property('name');
            expect(res.body.menuItems[0]).to.have.property('description');
            expect(res.body.menuItems[0]).to.have.property('price');
            expect(res.body.menuItems[0]).to.have.property('category');
            done();
          });
      });

      it('should GET menu by id ', (done) => {
        Menu.findOne({ name: 'testMenu' })
          .then((doc) => {
            chai.request(app)
              .get(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.menuItem).to.have.property('_id');
                expect(res.body.menuItem).to.have.property('name');
                expect(res.body.menuItem).to.have.property('description');
                expect(res.body.menuItem).to.have.property('price');
                expect(res.body).to.have.property('request');
                done();
              });
          });
      });

      it('should DELETE menu by id ', (done) => {
        Menu.findOne({ name: 'testMenu' })
          .then((doc) => {
            chai.request(app)
              .delete(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
              });
          });
      });
    });

    // test route order

    describe('#Test Order route', () => {
      it('should GET all Order ', (done) => {
        chai.request(app)
          .get('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('should POST Order ', (done) => {
        const post_Order = {
          order_Menu: [{ menu: '5f305acf4e56382fe806fc84', Number_MenuItem: 1 }],

        };
        chai.request(app)
          .post('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_Order)
          .end((err, res) => {
            expect(res).to.have.status(200);
          });

        setTimeout(done(), 3000);
      });

      it('should GET Order by id ', (done) => {
        User.findOne({ email: 'admintest@gmail.com' })
          .then((user) => {
            Order.findOne({ id_User: user._id })
              .then((doc) => {
                chai.request(app)
                  .get(`/commande/${doc._id}`)
                  .set('Authorization', `bearer ${tokentest}`)
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                  });
              });
          });
      });

      it('should DELETE Order ', (done) => {
        User.findOne({ email: 'admintest@gmail.com' })
          .then((user) => {
            Order.findOne({ id_User: user._id })
              .then((doc) => {
                chai.request(app)
                  .delete(`/commande/${doc._id}`)
                  .set('Authorization', `bearer ${tokentest}`)
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('n');
                  });
                done();
              });
          });
      });
    });
  });
  describe('#Test  Employé', () => {
    // runs once before the first test in this block
    before(() => {
      const menuItem = new Menu({
        name: 'testName',
        description: 'req.body.description',
        price: 5,
        category: 'plat',
        // image : req.file.path
      });
      // Saves MenuItem in the database
      menuItem.save();

      const userTest = new User({
        email: 'employetest2@gmail.com',
        lastname: 'utilisateur test',
        firstname: 'uilisateur test',
        password: 'toto',
        role: 'client',
        phone_number: '065520605252',
      });
      userTest.save()
        .then((user) => {
          Menu.findOne({ name: 'testName' })
            .then((menu) => {
              const OrderItem = new Order({
                date_Order: '2020-08-22T17:26:34.000+00:00',
                total_Price: 4,
                total_Items: 52,
                id_User: user._id,
                order_Menu: [{ menu: '5f4222de689ea61214629dea', Number_MenuItem: 1 }],
                payment_id: 'test pyd',

              });
              OrderItem.save();
            });
        });
    });

    // runs once before the first test in this block

    // test route user

    describe('#Test connexion ', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'employetest@gmail.com',
          lastname: 'utilisateur test',
          firstname: 'uilisateur test',
          password: 'toto',
          role: 'employé',
          phone_number: '065520605252',
        };
        chai.request(app)
          .post('/utilisateur/inscription')
          .send(userTest)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('User created');
            done();
          });
      });

      it('should login user', (done) => {
        const userTest = {
          email: 'employetest@gmail.com',
          password: 'toto',
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

      it('should Find all users', (done) => {
        chai.request(app)
          .get('/utilisateur')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('users');
            expect(res.body.users).to.be.an('array');
            done();
          });
      });
      it('should Find user by id', (done) => {
        User.findOne({ email: 'employetest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .get(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it('should not Delete user by id', (done) => {
        User.findOne({ email: 'employetest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .delete(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });

    // test route order

    describe('#Test Order route', () => {
      it('should GET all Order ', (done) => {
        chai.request(app)
          .get('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('should not POST Order ', (done) => {
        const post_Order = {

          OrderMenu: { menu: 'menu test', description: 'description test' },
        };

        chai.request(app)
          .post('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_Order)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should GET Order by id ', (done) => {
        Order.findOne({ total_Items: 1 })
          .then((doc) => {
            chai.request(app)
              .get(`/commande/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it('should not DELETE Order ', (done) => {
        Order.findOne({ total_Items: 1 })
          .then((doc) => {
            chai.request(app)
              .delete(`/commande/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });

    // test route menu

    describe('#Test Menu route', () => {
      it('should not POST menu ', (done) => {
        const postMenu = {
          name: 'testName',
          description: 'test description',
          price: 4,
          category: ' test category',
          quantity: 2,
          status: 'tesr status',
        };
        chai.request(app)
          .post('/menu')
          .set('Authorization', `bearer ${tokentest}`)
          .send(postMenu)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should GET all menu ', (done) => {
        chai.request(app)
          .get('/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.menuItems).to.be.an('array');
            done();
          });
      });

      it('should not GET menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
          .then((doc) => {
            chai.request(app)
              .get(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });

      it('should not DELETE menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
          .then((doc) => {
            chai.request(app)
              .delete(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });
  });

  describe('#Test User ', () => {
    // runs once before the first test in this block
    before(() => {
      const menuItem = new Menu({
        name: 'testName',
        description: 'req.body.description',
        price: 5,
        category: 'plat',
        // image : req.file.path
      });
      // Saves MenuItem in the database
      menuItem.save();

      const userTest = new User({
        email: 'usertest2@gmail.com',
        lastname: 'utilisateur test',
        firstname: 'uilisateur test',
        password: 'toto',
        role: 'employé',
        phone_number: '065520605252',
      });
      userTest.save()
        .then((user) => {
          Menu.findOne({ name: 'testName' })
            .then((menu) => {
              const OrderItem = new Order({
                date_Order: '2020-08-22T17:26:34.000+00:00',
                total_Price: 4,
                total_Items: 52,
                id_User: user._id,
                order_Menu: [{ menu: menu._id, Number_MenuItem: 1 }],
                payment_id: 'test pyd',

              });
              OrderItem.save();
            });
        });
    });

    // runs once before the first test in this block

    // test route user

    describe('#Test connexion ', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'usertest@gmail.com',
          lastname: 'utilisateur test',
          firstname: 'uilisateur test',
          password: 'toto',
          phone_number: '065520605252',
        };
        chai.request(app)
          .post('/utilisateur/inscription')
          .send(userTest)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('User created');
            done();
          });
      });

      it('should login user', (done) => {
        const userTest = {
          email: 'usertest@gmail.com',
          password: 'toto',
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

      it('should not Find all users', (done) => {
        chai.request(app)
          .get('/utilisateur')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });
      it('should Find not user by id', (done) => {
        User.findOne({ email: 'usertest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .get(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });

      it('should not Delete user by id', (done) => {
        User.findOne({ email: 'usertest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .delete(`/utilisateur/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });

    // test route order

    describe('#Test Order route', () => {
      it('should not GET all Order ', (done) => {
        chai.request(app)
          .get('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should not POST Order ', (done) => {
        User.findOne({ email: 'usertest2@gmail.com' })
          .then();
        const post_Order = {

          OrderMenu: { menu: 'menu test', description: 'description test' },
        };

        chai.request(app)
          .post('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_Order)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should not GET Order by id ', (done) => {
        Order.findOne({ total_Items: 1 })
          .then((doc) => {
            chai.request(app)
              .get(`/commande/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });

      it('should not DELETE Order ', (done) => {
        Order.findOne({ total_Items: 1 })
          .then((doc) => {
            chai.request(app)
              .delete(`/commande/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });

    // test route menu

    describe('#Test Menu route', () => {
      it('should not POST menu ', (done) => {
        const post_order = {
          name: 'testName',
          description: 'test description',
          price: 4,
          category: ' test category',
          quantity: 2,
          status: 'tesr status',
        };
        chai.request(app)
          .post('/menu')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_order)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should GET all menu ', (done) => {
        chai.request(app)
          .get('/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.menuItems).to.be.an('array');
            done();
          });
      });

      it('should not GET menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
          .then((doc) => {
            chai.request(app)
              .get(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });

      it('should not DELETE menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
          .then((doc) => {
            chai.request(app)
              .delete(`/menu/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized');
                done();
              });
          });
      });
    });
  });
});
