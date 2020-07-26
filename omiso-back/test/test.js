//import
const chai = require('chai');
const chaihttp = require ('chai-http');
const app = require('../app');
const { request } = require('chai');
const expect = require('chai').expect;

chai.use(chaihttp);


describe('Unit Test API Omiso',()=>{
    describe('#Test Order route', ()=>{
        
        it('should GET all the Order', (done)=>{
            chai.request(app)
                .get('/order')
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('array');
                 done();
                })
        })

        it('should GET valide Order by id', (done)=>{
            chai.request(app)
                .get('/order/5f1c2d31d718ec0588d42e34')
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('object');
                 done();
                })
        })

        it('should GET invalide Order by id', (done)=>{
            chai.request(app)
                .get('/order/4')
                .end((err, res) => {
                 expect(res).to.have.status(500);
                 expect(res.body).to.have.property('error').to.be.a('string');
                 done();
                })
        })


        it('should POST valide Order', (done)=>{

        const post_Order = {
            idUser: '122222',
            OrderMenu: {menu:'menu test',description:'description test'}
            }

        chai.request(app)
            .post('/order')
            .send(post_Order)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.a('object');                                  
                    done();
            })
        })

        it('should POST invalide order',(done)=>{

            chai.request(app)
            .post('/order')
            .send({})
            .end((err, res) => {
             expect(res).to.have.status(500);
             expect(res.body).to.have.property('error').to.be.a('string'); 
                done();                                 
            })
        })

        it('should DELETE invalide Order', (done)=>{
            chai.request(app)
                .delete('/order/4545')
                .end((err, res) => {
                 expect(res).to.have.status(500);
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('error').to.be.a('string')
                 done();
                })
        })


        it('should DELETE valide Order', (done)=>{
            chai.request(app)
                .delete('/order/5f1c28bf29a21a1978acff51')
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('n')
                 done();
                })
        })

//describe Route Items 

    describe('#Test Menu-items route', ()=>{

        it('should GET all menu-items', (done)=>{
            chai.request(app)
                .get('/menu-items')
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

        it('should GET valide menu-items by id', (done)=>{
            chai.request(app)
                .get('/menu-items/5f1d224efccaf30d106c571f')
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
                })
        })

        it('should GET invalide menu-items by id', (done)=>{
            chai.request(app)
                .get('/menu-items/5f1d2')
                .end((err, res) => {
                 expect(res).to.have.status(500);                 
                 expect(res.body).to.have.property('error').to.be.a('string');
                 done();
                })
        })

        it('should POST valide the menuItems', (done)=>{
            
            const post_order={
                "name": "test name",
                "description": "test description",
                "price": 4,
                "category": " test category",
                "quantity": 2,
                "status": "tesr status"
              } 

            chai.request(app)
                .post('/menu-items')
                .send(post_order)
                .end((err, res) => {
                 expect(res).to.have.status(201);
                 expect(res.body.createdMenuItem).to.be.an('object');
                 done();
                })
        })

        it('should POST invalide menuItems',(done)=>{

            chai.request(app)
            .post('/menu-items')
            .send({})
            .end((err, res) => {
             expect(res).to.have.status(500);
             expect(res.body).to.have.property('error').to.be.a('string'); 
                done();                                 
            })
        })

        it('should DELETE invalide menu-items by id', (done)=>{
            chai.request(app)
                .delete('/menu-items/4545')
                .end((err, res) => {
                 expect(res).to.have.status(500);
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('error').to.be.a('string')
                 done();
                })
        })


        it('should DELETE valide menu-items by id', (done)=>{
            chai.request(app)
                .delete('/menu-items/5f1d224efccaf30d106c571f')
                .end((err, res) => {
                 expect(res).to.have.status(200);
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('message')
                 done();
                })
        })




        
    })




    })
});