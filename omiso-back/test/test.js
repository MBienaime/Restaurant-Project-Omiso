/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// Import models Data Base

const Order = require('../Models/OrderModel');
const Menu = require('../Models/MenuItemModel');
const User = require('../Models/UserModel');
require('dotenv').config({ path: './Config/config.env' });

// import
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');

const { expect } = require('chai');

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
  describe('#Unit test user admin', () => {
    // test route user admin

    describe('#Test Route Utilisateur #user admin', () => {
      it('Admin should register as admin', (done) => {
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

      it('Admin should login as admin', (done) => {
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

      it('Admin should Find all users', (done) => {
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
      it('Admin should find user by id', (done) => {
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

      it('Admin should  Delete user by id', (done) => {
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

    // test route menu user  admin

    describe('#Test Menu route #user admin', () => {
      it('Admin should POST menu ', (done) => {
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

      it('Admin should GET all menu ', (done) => {
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

      it('Admin shouldGET menu by id ', (done) => {
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

      it('Admin should DELETE menu by id ', (done) => {
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

    // test route order user admin

    describe('#Test Commande route #user admin', () => {
      it('Admin should GET all Order ', (done) => {
        chai.request(app)
          .get('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('Admin should POST Order ', (done) => {
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

      it('Admin should GET Order by id ', (done) => {
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

      it('Admin should DELETE Order ', (done) => {
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
  describe('#Unit test user employé', () => {
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
                order_Menu: [{ menu: menu._id, Number_MenuItem: 1 }],
                payment_id: 'test pyd',

              });
              OrderItem.save();
            });
        });
    });

    // runs once before the first test in this block

    // test route c

    describe('#Test Route utilisateur user employé', () => {
      it('Employé should signup employé', (done) => {
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

      it('Employé should login employé', (done) => {
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

      it('Employé should Find all users', (done) => {
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
      it('Employé should Find user by id', (done) => {
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

      it('Employé should not Delete user by id', (done) => {
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

    // test route order user Employé

    describe('#Test Commande route user employé', () => {
      it('Employé should GET all Order ', (done) => {
        chai.request(app)
          .get('/commande')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('Employé should not POST Order ', (done) => {
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

      it('Employé should GET Order by id ', (done) => {
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

      it('Employé should not DELETE Order ', (done) => {
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

    // test route menu user Employé

    describe('#Test Menu route user employé', () => {
      it('Employé should not POST menu ', (done) => {
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

      it('Employé should GET all menu ', (done) => {
        chai.request(app)
          .get('/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.menuItems).to.be.an('array');
            done();
          });
      });

      it('Employé should not GET menu by id ', (done) => {
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

      it('Employé should not DELETE menu by id ', (done) => {
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
  describe('#Unit test user client', () => {
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

    describe('#Test utilisateur route user client ', () => {
      it('Client should signup Client', (done) => {
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

      it('Client should login Client', (done) => {
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

      it('Client should not Find all users', (done) => {
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
      it('Client should Find not user by id', (done) => {
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

      it('Client should not Delete user by id', (done) => {
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

    describe('#Test Commande route user client', () => {
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

    describe('#Test Menu route user client', () => {
      it('Client should not POST menu ', (done) => {
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

      it('Client should GET all menu ', (done) => {
        chai.request(app)
          .get('/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.menuItems).to.be.an('array');
            done();
          });
      });

      it('Client should not GET menu by id ', (done) => {
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

      it('Client should not DELETE menu by id ', (done) => {
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
