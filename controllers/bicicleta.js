const Bicicleta = require("../model/Bicicleta");

exports.list = function(re, res) {
    Bicicleta.allBicis().then(vals => res.render("./bicicletas/index", { bicis: vals }))
};

exports.show = function(req, res) {
    Bicicleta.findById(req.params.id).then(bici => res.render("bicicletas/show", { bici }));
};

exports.create_get = function(req, res) {
    res.render("bicicletas/create");
};

exports.create_post = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);
    res.redirect("/bicicletas");
};

exports.delete = function(req, res) {
    Bicicleta.removeById(req.body.id).then(() => res.redirect("/bicicletas"));

};

exports.update_get = function(req, res) {
    Bicicleta.findById(req.params.id).then(bici => res.render("bicicletas/update", { bici }))
};

exports.update_post = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.update(bici).then(() => res.redirect("/bicicletas"));

};