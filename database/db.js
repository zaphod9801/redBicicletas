var MongoClient = require('mongodb').MongoClient;
var { dburl, dbcollection, collection } = require('./settings.json')

function insertData(query) {
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbcollection);
        dbo.collection(collection).insertOne(query, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

function findById(id) {
    const query = { "id": id };

    return new Promise(function(resolve, reject) {
        MongoClient.connect(dburl, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbcollection);
            dbo.collection(collection).find(query).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function allBicis() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(dburl, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbcollection);
            dbo.collection(collection).find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function updateBici(id, values) {

    return new Promise(function(resolve, reject) {
        MongoClient.connect(dburl, function(err, db) {
            if (err) reject(err);
            var dbo = db.db(dbcollection);
            var myquery = { id: id };
            var newvalues = { $set: values };
            dbo.collection(collection).updateOne(myquery, newvalues, function(err, res) {
                if (err) reject(err);
                resolve(res);
                console.log("1 document updated");
                db.close();
            });
        });
    });
}

async function deleteBici(id) {

    return new Promise(function(resolve, reject) {
        MongoClient.connect(dburl, function(err, db) {
            if (err) reject(err);
            var dbo = db.db(dbcollection);
            var myquery = { id: id };
            dbo.collection(collection).deleteOne(myquery, function(err, obj) {
                if (err) reject(err);
                resolve(obj);
                console.log("1 document deleted");
                db.close();
            });
        });
    });
}

module.exports = {
    insertData,
    findById,
    allBicis,
    updateBici,
    deleteBici
}