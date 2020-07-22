//import
const chai = require('chai');
const chaihttp = require ('chai-http');
const app = require('../app');
const expect  = require('chai').expect;

chai.use(chaihttp);

describe('apiomiso',()=>{
    describe('# Test Route Order',()=>{

        it('should list ALL order',(done)=>{
            chai.request(app)
                .get('/order')
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                });
                done()
        });

        it('should post one order',(done)=>{
            chai.request(app)
                .post('/order')
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                });
                done()
        });

        it('should delete one order',(done)=>{
            chai.request(app)
                .get('/order/1')
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                });
                done()
        });

        it('should list one order',(done)=>{
            chai.request(app)
                .get('/order/1')
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                });
                done()
        });

    })
})