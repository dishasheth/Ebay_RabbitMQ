/**
* New node file
*/
var request = require('request')
, express = require('express')
,assert = require('assert')
,http = require("http");

describe('http test', function(){

    it('should return the login if the url is right', function(done){
        http.get('http://localhost:3000/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });
        
});