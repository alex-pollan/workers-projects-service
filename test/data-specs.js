var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var data = require('../server/data');

describe('data tests', function () {
    var sut;

    before(function (done) {
        var db = mongoose.connection;
        mongoose.connect('mongodb://localhost/test');
        db.once('open', function () {
            sut = data(db);
            done();
        });
    });

    describe('create', function () {
        var project,
            createdProject,
            error;

        before(function (done) {
            project = {
                name: 'name',
                description: 'description'
            };
            sut.create(project, function (err, prj) {
                createdProject = prj;
                error = err;
                done();
            });
        });
        it('no error', function () {
            expect(error).to.be.null;
        });

        it('created project has correct fields', function () {
            expect(createdProject.name).to.be.equals(project.name);
        });

    });

});
