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

chai.use(chaihttp);

describe('Unit Test API Omiso', () => {
  after(() => {
    Order.deleteMany({ idUser: '122222' })
      .then()
      .catch((e) => { console.log(`erre${e}`); });
    Menu.deleteMany({ name: 'testName' })
      .then()
      .catch((e) => { console.log(`erre${e}`); });
    User.deleteMany({ email: 'usertest@gmail.com' })
      .then()
      .catch((e) => { console.log(`erre${e}`); });
    User.deleteMany({ email: 'employétest@gmail.com' })
      .then()
      .catch((e) => { console.log(`erre${e}`); });
  });

  describe('#Test admin', () => {
    // test route user

    describe('#Test connexion', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'admintest@gmail.com',
          password: 'toto',
          role: 'admin',
        };
        chai.request(app)
          .post('/user/signup')
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
          .post('/user/login')
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
          .get('/user')
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
              .get(`/user/${doc._id}`)
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
              .delete(`/user/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });
    });

    // test route order

    describe('#Test Order route', () => {
      it('should GET all Order ', (done) => {
        chai.request(app)
          .get('/order')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it.skip('should POST Order ', (done) => {
        const post_Order = {
          idUser: '122222',
          OrderMenu: { menu: 'menu test', description: 'description test' },
        };

        chai.request(app)
          .post('/order')
          .set('Authorization', `bearer ${tokentest}`)
          .send(post_Order)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.a('object');
            done();
          });
      });

      it.skip('should GET Order by id ', (done) => {
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .get(`/order/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it.skip('should DELETE Order ', (done) => {
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .delete(`/order/${doc._id}`)
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

    // test route menu

    describe('#Test Menu route', () => {
      it('should POST menu ', (done) => {
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
            expect(res.body.menuItems[0]).to.have.property('quantity');
            expect(res.body.menuItems[0]).to.have.property('status');
            expect(res.body.menuItems[0]).to.have.property('request');
            done();
          });
      });

      it('should GET menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
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
                expect(res.body.menuItem).to.have.property('category');
                expect(res.body.menuItem).to.have.property('quantity');
                expect(res.body.menuItem).to.have.property('status');
                expect(res.body).to.have.property('request');
                done();
              });
          });
      });

      it('should DELETE menu by id ', (done) => {
        Menu.findOne({ name: 'testName' })
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
  });

  describe('#Test  Employé', () => {
    // runs once before the first test in this block
    before(() => {
      const OrderItem = new Order({
        _id: new mongoose.Types.ObjectId(),
        idUser: '122222',
        OrderMenu: 'req.body.OrderMenu',
      });
      OrderItem.save();

      const menuItem = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: 'testName',
        description: 'req.body.description',
        price: 5,
        category: 'req.body.category',
        quantity: 2,
        status: 'req.body.status',
        // image : req.file.path
      });

      // Saves MenuItem in the database
      menuItem.save();
    });

    // runs once before the first test in this block

    // test route user

    describe('#Test connexion ', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'employétest@gmail.com',
          password: 'toto',
          role: 'employé',
        };
        chai.request(app)
          .post('/user/signup')
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
          email: 'employétest@gmail.com',
          password: 'toto',
        };
        chai.request(app)
          .post('/user/login')
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
          .get('/user')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('users');
            expect(res.body.users).to.be.an('array');
            done();
          });
      });
      it('should Find user by id', (done) => {
        User.findOne({ email: 'employétest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .get(`/user/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it('should not Delete user by id', (done) => {
        User.findOne({ email: 'employétest@gmail.com' })
          .then((doc) => {
            chai.request(app)
              .delete(`/user/${doc._id}`)
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

    describe.skip('#Test Order route', () => {
      it('should GET all Order ', (done) => {
        chai.request(app)
          .get('/order')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('should not POST Order ', (done) => {
        const post_Order = {
          idUser: '122222',
          OrderMenu: { menu: 'menu test', description: 'description test' },
        };

        chai.request(app)
          .post('/order')
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
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .get(`/order/${doc._id}`)
              .set('Authorization', `bearer ${tokentest}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });

      it('should not DELETE Order ', (done) => {
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .delete(`/order/${doc._id}`)
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

  describe('#Test User ', () => {
    // runs once before the first test in this block
    before(() => {
      const OrderItem = new Order({
        _id: new mongoose.Types.ObjectId(),
        idUser: '122222',
        OrderMenu: 'req.body.OrderMenu',
      });
      OrderItem.save();

      const menuItem = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: 'testName',
        description: 'req.body.description',
        price: 5,
        category: 'req.body.category',
        quantity: 2,
        status: 'req.body.status',
        // image : req.file.path
      });

      // Saves MenuItem in the database
      menuItem.save();
    });
    // runs once before the first test in this block

    // test route user

    describe('#Test connexion ', () => {
      it('should signup user', (done) => {
        const userTest = {
          email: 'usertest@gmail.com',
          password: 'toto',
          role: '',
        };
        chai.request(app)
          .post('/user/signup')
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
          .post('/user/login')
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
          .get('/user')
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
              .get(`/user/${doc._id}`)
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
              .delete(`/user/${doc._id}`)
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

    describe.skip('#Test Order route', () => {
      it('should not GET all Order ', (done) => {
        chai.request(app)
          .get('/order')
          .set('Authorization', `bearer ${tokentest}`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should not POST Order ', (done) => {
        const post_Order = {
          idUser: '122222',
          OrderMenu: { menu: 'menu test', description: 'description test' },
        };

        chai.request(app)
          .post('/order')
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
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .get(`/order/${doc._id}`)
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
        Order.findOne({ idUser: '122222' })
          .then((doc) => {
            chai.request(app)
              .delete(`/order/${doc._id}`)
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
