
const Category = require('../models/category');
const Product = require('../models/product');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('Category', () => {
    beforeEach(async(done) => {
        await Category.remove({})
        done();           
    });     
    describe('/GET category', () => {
        it('it should GET all the categories', (done) => {
            chai.request(server)
            .get(`/api/${process.env.API_VERSION}/category`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true);
                res.body.category.should.be.a('array');
                res.body.category.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('/POST category', () => {
        it('it should not POST a category without title field', (done) => {
            let category = {
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/category`)
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Category title is missing.');
                done();
            });
        });
        it('it should POST a parent category', (done) => {
            let category = {
                title : "mobile"
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/category`)
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(true);
                res.body.should.have.property('message');
                res.body.should.have.property('category');
                res.body.message.should.be.eql('Category added successfully.');
                done();
            });
        });
        it('it should POST a child category', (done) => {
            let category = {
                title : "64gb",
                parent : "mobile"
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/category`)
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(true);
                res.body.should.have.property('message');
                res.body.should.have.property('category');
                res.body.message.should.be.eql('Category added successfully.');
                done();
            });
        });
    });
});


describe('Product', () => {
    beforeEach(async(done) => {
        await Product.remove({});
        done();           
    });
    describe('/GET product', () => {
        it('it should GET all the categories', (done) => {
            chai.request(server)
            .get(`/api/${process.env.API_VERSION}/product`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true);
                res.body.products.should.be.a('array');
                res.body.products.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('/POST product', () => {
        it('it should not POST a product without title field', (done) => {
            let product = {
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.status.should.be.eql(false);
                  res.body.should.have.property('message');
                  res.body.message.should.be.eql('Product title is missing.');
                done();
            });
        });
        it('it should not POST a product without categories field', (done) => {
            let product = {
                title : "mobile"
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Please select at least one category for product.');
                done();
            });
        });
        it('it should not POST a product without quantity field', (done) => {
            let product = {
                title : "mobile",
                categories : ["mobile", "mobile/64gb"]
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Product quantity is missing.');
                done();
            });
        });
        it('it should not POST a product with non-numeric quantity field', (done) => {
            let product = {
                title : "mobile",
                categories : ["mobile", "mobile/64gb"],
                quantity : "we",
                price : 60000
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Invalid product quantity.');
                done();
            });
        });
        it('it should not POST a product without price field', (done) => {
            let product = {
                title : "mobile",
                categories : ["mobile", "mobile/64gb"],
                quantity : 10
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Product price is missing.');
                done();
            });
        });
        it('it should not POST a product with non-mnumeric price field', (done) => {
            let product = {
                title : "mobile",
                categories : ["mobile", "mobile/64gb"],
                quantity : 10,
                price : "hgfas"
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Invalid product price.');
                done();
            });
        });
        it('it should POST a child product', (done) => {
            let product = {
                title : "Apple iPhone 6S+",
                categories : ["mobile", "mobile/64gb"],
                quantity : 10,
                price : 60000
            }
            chai.request(server)
            .post(`/api/${process.env.API_VERSION}/product`)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.status.should.be.eql(true);
                res.body.should.have.property('message');
                res.body.should.have.property('product');
                res.body.message.should.be.eql('Product added successfully.');
                done();
            });
        });
    });
});