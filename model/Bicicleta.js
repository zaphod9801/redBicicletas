const { Db } = require("mongodb");
const db = require("../database/db")

let Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function() {
    return `id: ${this.id} | color: ${this.color}`;
};

Bicicleta.allBicis = function() {

    return db.allBicis()
};
Bicicleta.add = function(aBici) {
    //    Bicicleta.allBicis.push(aBici);
    db.insertData(aBici)
};

Bicicleta.findById = function(aBiciId) {

    return new Promise(function(resolve, reject) {
        db.findById(aBiciId).then(res => {
            if (res[0]) resolve(res[0]);
            else reject(`No existe una Bicicleta con el id: ${ aBiciId }`);
        })
    });
};

Bicicleta.removeById = function(aBiciId) {
    return db.deleteBici(aBiciId)
};

Bicicleta.update = function(bici) {
    console.log(bici)
    var datosUpdate = {
        color: bici.color,
        modelo: bici.modelo,
        ubicacion: bici.ubicacion
    }
    return db.updateBici(bici.id, datosUpdate)

};

module.exports = Bicicleta;