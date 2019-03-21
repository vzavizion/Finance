const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Country = require('./model/country');
const Group = require('./model/group');

const url = 'mongodb://localhost:27017/travel';

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/api/group/getGroupByName', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Group.find({
            "name": req.query.groupName
        }, function (err, group) {

            if (err) res.send(err);

            if (group.length !== 0) {
                if (group.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: group
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: group
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});


app.post('/api/group/save', (req, res) => {

    var group = req.body;

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Group.findOneAndUpdate({
            "name": group.currentName
        }, {
                $set: group
            }, {
                upsert: true,
                returnNewDocument: true,
                rawResult: true
            }, function (err, groupOld) {

                if (err) res.send(err);

                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: group
                });
            });
    });
});


app.get('/api/group/names', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Group.distinct('name').exec(function (err, groupNames) {

            if (err) res.send(err);

            groupNames = groupNames.sort({ name: 1 });

            return res.status(200).json({
                status: 'Success',
                statuscode: '200',
                message: 'OK',
                result: groupNames
            });
        })

    });
});


app.get('/api/country/getCountryAll', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.find({}, function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});


app.get('/api/country/getCountryByName', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.find({
            "name": req.query.countryName
        }, function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});


app.get('/api/country/getCountryByContinent', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.find({
            "continent": req.query.continent
        }).sort({ name: 1 }).exec(function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});

app.get('/api/country/getCountryByCountryPriority', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.find({
            "priority.sequenceNumber": req.query.countryPriority
        }).sort({ name: 1 }).exec(function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});

app.get('/api/country/getCountryByIsVisited', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        var condition = '';

        if (req.query.isVisited == 'yes') {
            condition = { "isVisited": { $exists: true, $eq: true } };
        }
        else {
            condition = { "isVisited": { $not: { $exists: true, $eq: true } } };
        }

        Country.find(condition).sort({ name: 1 }).exec(function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});


app.get('/api/country/getCountryBySeason', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        let condition = {
            "seasons": {
                $elemMatch: {
                    $and: [{
                        "seasonTo.month.sequenceNumber": {
                            $gte: req.query.seasonFrom
                        }
                    }, {
                        "seasonFrom.month.sequenceNumber": {
                            $lte: req.query.seasonTo
                        }
                    }, {
                        "isNoVisit": {
                            $not: {
                                $exists: true,
                                $eq: true
                            }
                        }
                    }]
                }
            }
        };

        Country.find(condition).sort({ name: 1 }).exec(function (err, country) {

            if (err) res.send(err);

            if (country.length !== 0) {
                if (country.length === 1) {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'Success',
                        statuscode: '200',
                        message: 'OK',
                        result: country
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: []
                });
            }
        })
    });
});


app.post('/api/country/save', (req, res) => {

    var country = req.body;

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.findOneAndUpdate({
            "name": country.currentName
        }, {
                $set: country
            }, {
                upsert: true,
                returnNewDocument: true,
                rawResult: true
            }, function (err, countryOld) {

                if (err) res.send(err);

                return res.status(200).json({
                    status: 'Success',
                    statuscode: '200',
                    message: 'OK',
                    result: country
                });
            });
    });
});


// findOneAndDelete
//  app.post("/api/deleteUser",function(req,res){      
//     model.remove({ _id: req.body.id }, function(err) {    
//      if(err){    
//          res.send(err);    
//      }    
//      else{      
//             res.send({data:"Record has been Deleted..!!"});               
//         }    
//  });    
//    })  



app.post('/api/country/saveFile', (req, res) => {

    //var filePath = "C:/Users/vz73953/Finance/Travel/travel/import/";
    var filePath = "C:/Users/Vasile/Finance/Travel/travel/import/";
    var fileName = "country.txt";

    var fs = require('fs');
    fs.writeFile(filePath + fileName, req.body.exportDescription, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

    return res.status(200).json({
        status: 'Success',
        statuscode: '200',
        message: 'OK',
        result: filePath + fileName
    });
});


app.get('/api/country/names', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.distinct('name').exec(function (err, countryNames) {

            if (err) res.send(err);

            countryNames = countryNames.sort({ name: 1 });

            return res.status(200).json({
                status: 'Success',
                statuscode: '200',
                message: 'OK',
                result: countryNames
            });
        })

    });
});


app.get('/api/country/continents', (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true }, function (err) {

        if (err) res.send(err);

        Country.distinct('continent').exec(function (err, continents) {

            if (err) res.send(err);

            continents = continents.sort({ name: 1 });

            return res.status(200).json({
                status: 'Success',
                statuscode: '200',
                message: 'OK',
                result: continents
            });
        });
    });
});


app.get('/api/country/test', (req, res) => {

    res.send('Test OK!')
    //res.send({ "status": "Success", "message": "File Save OK!" })

});


app.listen(3000, () => console.log('server running on port 3000!'))




//cd server
//node app.js
//http://localhost:3000/api/country/test/
//http://localhost:3000/api/country/getCountryByName
//http://localhost:3000/api/country/getCountryByName?countryName=A
//http://localhost:3000/api/country/getCountryByContinent
//http://localhost:3000/api/country/getCountryByContinent?continent=ANZ


//package.json
//"start": "ng serve --proxy-config proxy.json",
//"start": "ng serve",

//cd C:\Program Files\MongoDB\Server\4.0\bin
//show dbs
//use travel
//db.getCollection('country').find({})
//db.country.find({}).pretty()


//db.createCollection("group")
//db.country.save( { item: "book", qty: 40 } )
//db.getCollection('country').find({})
//db.getCollection('group').find({})
//db.country.find({"name": "Australia"}).pretty()
//db.country.find({"data":{'$regex': 'A'}})
//db.country.remove( { } )
//db.getCollection('group').remove( { } )

//db.country.createIndex({ name: 1, continent: 1 })
//db.country.createIndex({ name: 1 }, { unique: true } )
//db.country.createIndex({ continent: 1 })

//db.country.dropIndex("name_1");
//db.country.dropIndex("continent_1");

//mongoexport --db travel --collection country --out C:\Users\Vasile\Finance\Travel\travel\import\country.json
//mongoexport --db travel --collection group --out C:\Users\Vasile\Finance\Travel\travel\import\group.json

//mongoimport --db travel --collection country --file C:\Users\vz73953\Finance\Travel\travel\import\country.json
//mongoimport --db travel --collection country --file C:\Users\vz73953\Finance\Travel\travel\import\group.json

//mongoexport csv: --type=csv --fields name,continent
//mongoexport json: --pretty



//Enter SA - full description
//Unit tests
//Filter grid
//.Net Core

//Report - Most frequent period (Apr-May, etc) - per country - for all country regions with !!!

//Report - Most frequent period (Apr-May, etc) - all countries
//Url Link page - per continent and overall
//Groups page - group regions by something - by next travel, by priority and continent, by geographycal closeness, etc
//Import country from txt


