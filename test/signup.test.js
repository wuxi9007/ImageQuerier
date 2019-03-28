const User = require('../models').User;
const expect = require('chai').expect;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const baseURL = 'http://localhost:3210/';

describe('Login test', () => {
    const req = {
        email: 'foo@bar.com',
        token: 'test'
    };
    it('User should not exist', (done) => {
        chai.request(baseURL).post('login').send(req).end((err, res) => {
            expect(res.body.code).to.equal(204);
            done();
        });
    });

    it('Email message', (done) => {
        chai.request(baseURL).post('login').send(req).end((err, res) => {
            expect(res.body.success).to.equal('Email does not exist.');
            done();
        });
    });

    it('Should register user', (done) => {
        chai.request(baseURL).post('signup').send(req).end((err, res) => {
            expect(res.body.code).to.equal(200);
            done();
        });
    });
    
    it('Should log user in', (done) => {
        chai.request(baseURL).post('login').send(req).end((err, res) => {
            expect(res.body.code).to.equal(200);
            done();
        });
    });
});
