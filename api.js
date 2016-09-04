module.exports = api;

var bodyParser = require("body-parser");

function api(app, data) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.get('/api/projects', function(req, res){
        data.list(function(err, projects){
            if (err) {
                res.status(500).json({success: false});
                return;
            }

            res.status(200).json(projects);
        });
    });

    app.post('/api/projects', function(req, res){
        var name = req.body.name;
	    var description = req.body.description;

        if (!name) {
            res.status(500).json({success: false});
            return;
        }

        data.create(req.body, function(err, project){
            if (err) {
                res.status(500).json({success: false});
                return;
            }

            res.status(200).json({success: true, id: project._id });
        });
    });
}
