// Import models Data Base
const mongoose = require("mongoose");
const Order = require('../Models/OrderModel');
const Menu = require("../Models/MenuItemModel");
const User = require("../Models/UserModel");
require('dotenv').config({path:'./Config/config.env'})

//import
const chai = require('chai');
const chaihttp = require ('chai-http');
const app = require('../app');
const { request } = require('chai');
const expect = require('chai').expect;

chai.use(chaihttp);

describe('Unit Test API Omiso',()=>{

    User.deleteOne({ email: 'fabtest@gmail.com' })
    .then()
    .catch();
    
    //test route user 

    describe('#Test connexion user',()=>{

        it('should signup user', (done)=>{
            const userTest = {
                email: 'fabtest@gmail.com',
                password: 'toto'
                }
            chai.request(app)
                .post('/user/signup')
                .send(userTest)
                .end((err, res) => {
                 expect(res).to.have.status(201);
                 expect(res.body).to.be.an('object')
                 expect(res.body).to.have.property('message');
                 done();
            })
        })

        it('should login user', (done)=>{
            const userTest = {
                email: 'fabtest@gmail.com',
                password: 'toto'
                }
            chai.request(app)
                .post('/user/login')
                .send(userTest)
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('object')
                 expect(res.body).to.have.property('message')
                 expect(res.body).to.have.property('token');
                 tokentest = res.body.token;
                 done(); 
            })   
        }) 
        


    })

    //test route order

    describe('#Test Order route', ()=>{        
        
        it('should GET all Order (User Admin)', (done)=>{
            chai.request(app)
                .get('/order')  
                .set("Authorization",'bearer '+tokentest)                             
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('array');
                 done();
                })
        })

        it('should POST Order (user admin)', (done)=>{

        const post_Order = {
            idUser: '122222',
            OrderMenu: {menu:'menu test',description:'description test'}
            }

        chai.request(app)
            .post('/order')
            .set("Authorization",'bearer '+tokentest)
            .send(post_Order)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.a('object');                                  
                    done();
            })
        })

        it('should GET Order by id (user admin)', (done)=>{

            Order.findOne({idUser:'122222'})
                 .then((doc) => {                     
                    chai.request(app)
                        .get("/order/"+ doc._id)
                        .set("Authorization",'bearer '+tokentest)
                        .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        done();
                        })
                 })            
        }) 

        it('should DELETE Order', (done)=>{

            Order.findOne({idUser:'122222'})
                 .then((doc) => {
                    chai.request(app)                    
                    .delete("/order/"+ doc._id)
                    .set("Authorization",'bearer '+tokentest)
                    .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('n')                    
                    });
                     done();

                 })

        })

//describe Route Menu 

    describe('#Test Menu route', ()=>{

        it('should POST menu', (done)=>{
            
            const post_order={
                "name": "testName",
                "description": "test description",
                "price": 4,
                "category": " test category",
                "quantity": 2,
                "status": "tesr status"
              } 

            chai.request(app)
                .post('/menu')
                .set("Authorization",'bearer '+tokentest)
                .send(post_order)
                .end((err, res) => {
                 expect(res).to.have.status(201);
                 expect(res.body.createdMenuItem).to.be.an('object');
                 done();
                })
        })

        it('should GET all menu', (done)=>{
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
                })
        })

        

        it('should GET menu by id', (done)=>{

            Menu.findOne({name:"testName"})
                .then((doc)=>{
                    chai.request(app)
                        .get('/menu/'+doc._id)
                        .set("Authorization",'bearer '+tokentest)
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
                    
                })
        })

        it('should DELETE menu by id', (done)=>{

            Menu.findOne({name: "testName"})
                .then((doc)=>{
                    chai.request(app)
                        .delete('/menu/'+doc._id)
                        .set("Authorization",'bearer '+tokentest)
                        .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message')
                        done();
                    });
                })
                
        })        
    })
    describe('#Test User route',()=>{        

    })
    })
});