var should = require('should');
var request = require('request');
var expect = require('chai').expect;
var baseUrl = "http://localhost:3000";
var util = require('util');

var postrequest = require('superagent');

describe('API Endpoint /user', function () {
    it('Testing Post Request using Mocha', function (done) {
        postrequest.post('http://localhost:3000/user/register')
            .set('Content-Type', 'application/json')
            .send('{"name": "testuser", "username": "testusername", "email": "testemail@test.com", "password": "testpassword"}')
            .end(function (err, res) {
                //your code to Test
                done();
            })
    })    
})