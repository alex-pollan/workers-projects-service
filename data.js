var Project = require('./models/project-server-model');
module.exports = data;

function data(db) {

    return {
        list: list,
        create: create
    };

    function list(cb) { 
        Project.find({}, function(err, list) { 
            return cb(err, list);
        });
    }

    function create(obj, cb) {        
        Project.create(obj, function(err, project){
            return cb(err, project);
        });            
    }
}
