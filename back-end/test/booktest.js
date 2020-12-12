var should = require('should');
var request = require('request');
var expect = require('chai').expect;
var baseUrl = "http://localhost:3000";
var util = require('util');

var postrequest = require('superagent');

describe('API Endpoint /books', function() {
    // GET - GET all books
    it('It should return all Books', function(done) {
        request.get({ url: baseUrl + '/api/books' },
            function(error, response, body) {            		
                    expect(response.statusCode).to.equal(200);
                    console.log(JSON.parse(body));
                done();
            });
    });    

    // POST - POST a book
    it("Testing Post Request using Mocha", function(done) {
        postrequest.post('localhost:3000/api/books')
        .set('Content-Type', 'application/json')
        .send('{"title":"testbook","author":"testauthor","available":false}')
        .end(function(err,res){
            //your code to Test
            done();
        })
    });
});