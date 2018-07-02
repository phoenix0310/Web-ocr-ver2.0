var express = require('express');
var app = express();
var api = express.Router();
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
const folder = './fr_src/public/pdf';

//GET LIST OF FILES //
function getFiles(dir){
	fileList=[];

	var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        var new_dir = '';
        for (var j=2; j<dir.split('/').length; j++){
            new_dir= new_dir +'/'+ dir.split('/')[j];
        }
        var path = '.'+new_dir + '/'+files[i];
        if (!fs.statSync(name).isDirectory()){
            fileList.push(path);
        }
    }
    return JSON.stringify(fileList);
}

//upload
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


//API
            api.get('/', function(req,res){
                //res.send('PDF get API ok!');
                res.send(getFiles('./fr_src/public/pdf'));
            });

               /** API path that will upload the files */
               api.post('/upload', function(req, res) {
                //TODO: Return url to pdf
                upload(req,res,function(err){
                    if(err){
                         res.json({error_code:1,err_desc:err});
                         return;
                    }
                     res.json({error_code:0,err_desc:null, msg: folder + '/' + req.file.filename});
                });
            });



            module.exports = api;
