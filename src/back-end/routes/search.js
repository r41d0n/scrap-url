var express = require('express');
var router = express.Router();
/**modelo */
let Index = require('../models/index');

let cuentaOcurrencia = (texto, cadena) => {
    let cuenta = 0;
    let posicion = texto.indexOf(cadena);
    while (posicion != -1) {
        cuenta++;
        posicion = texto.indexOf(cadena, posicion + 1);
    }
    return cuenta;
};

router.route('/search').get((req, res) => {
    let word = req.query.word || req.params.word || req.body.word || req.headers['word'];

    if (!word) {
        return res.status(203).send(false);
    } else {
        Index.find({
            'texto': new RegExp(word, 'i')
        }, function (err, doc) {
            // return res.status(200).send(doc);

            let datos = [];
            for (var i = 0; i < doc.length; i++) {
                let json = {};
                let cant = cuentaOcurrencia(doc[i].texto, word);
                json.url = doc[i].url;
                json.title = doc[i].title;
                json.cantida = cant;
                datos.push(json);
            }
            res.status(200).send({
                response: {
                    "cant": datos.length,
                    "datos": datos
                }
            });
        });
    }
});

module.exports = router;