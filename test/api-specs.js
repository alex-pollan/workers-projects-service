var request = require('supertest');
var express = require('express');
var api = require('../server/api');
var expect = require('chai').expect;

describe('api tests', function () {
    var app,
        data;

    before(function () {
        app = express();

        data = {};

        api(app, data);
    });

    describe('create project', function () {
        var project;

        before(function () {
            project = {};
        });

        describe('name is empty', function () {
            before(function () {
                project.name = '';

                req = request(app)
                    .post('/api/projects')
                    .send(project);
            });

            it('return ko', function (done) {
                req.expect('Content-Type', /json/)
                    .expect(500)
                    .end(function (err, res) {
                        if (err) throw err;

                        var data = res.body;
                        expect(data.success).to.be.false;

                        done();
                    });
            })
        });

        describe('params are ok', function () {
            var req;

            before(function () {
                project.name = 'name';
                project.description = 'description';
            });

            describe('data saved', function () {
                before(function () {
                    data.create = function (obj, cb) {
                        cb(null, { _id: 1 });
                    };
                    req = request(app)
                        .post('/api/projects')
                        .send(project);
                });

                it('return ok', function (done) {
                    req.expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) throw err;

                            var data = res.body;
                            expect(data.success).to.be.true;
                            expect(data.id).to.be.equal(1);

                            done();
                        });
                });
            });

            describe('data not saved', function () {
                before(function () {
                    data.create = function (obj, cb) {
                        cb(new Error('error'));
                    };
                    req = request(app)
                        .post('/api/projects')
                        .send(project);
                });

                it('return ko', function (done) {
                    req.expect('Content-Type', /json/)
                        .expect(500)
                        .end(function (err, res) {
                            if (err) throw err;

                            var data = res.body;
                            expect(data.success).to.be.false;

                            done();
                        });
                });
            });

        });

    });
});
