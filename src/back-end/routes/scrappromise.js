var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var URL = require('url-parse');

/**modelo */
let Index = require('../models/index');

/*** variables general*/
let pagesVisited = [];
/** Expreciones regulares */
let primerBlanco = /^ /;
let ultimoBlanco = / $/;
let variosBlancos = /[ ]+/g;


/** funciones auxiliares */
let palabrasTotal = (datos) => {
    let cantidad = datos.map(e => {
        return e.palabras;
    }).reduce((a, b) => {
        return a + b;
    });

    return cantidad;
};
let cantPalabras = (texto) => {
    let workText = texto;
    workText = workText.replace(variosBlancos, " ");
    workText = workText.replace(primerBlanco, "");
    workText = workText.replace(ultimoBlanco, "");
    let textoPicado = workText.split(" ");
    return textoPicado.length;
}
let limpiarTexto = (texto) => {
    let temporal = texto;
    let sinsaltos = temporal.split("\n").join("");
    sinsaltos = sinsaltos.split("\t").join("");
    sinsaltos = sinsaltos.replace(/&(lt|gt);/g,
        function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
    sinsaltos = sinsaltos.replace(/<\/?[^>]+(>|$)/g, "");
    sinsaltos = sinsaltos.replace(variosBlancos, " ");
    sinsaltos = sinsaltos.replace(primerBlanco, "");
    sinsaltos = sinsaltos.replace(ultimoBlanco, "");
    return sinsaltos;
};
let collectInternalLinks = ($, baseUrl) => {
    let pagesProximonivel = [];
    let anadidas = [];
    // var relativeLinks = $("a[href^='/']");
    // console.log("Found " + relativeLinks.length + " relative links on page");
    // relativeLinks.each(function () {
    //     pagesProximonivel.push(baseUrl + $(this).attr('href'));
    // });
    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function () {
        let link = $(this).attr('href');
        if (link in pagesVisited || link in anadidas) {} else {
            anadidas[link] = true;
            pagesProximonivel.push(link);
        }
    });
    return pagesProximonivel;
}
/** */

/**procesa una url y retorna el objeto a guardar */
let procesar = (url) => {
    console.log("visitando url: ", url);
    return rp(url).then(html => {
        console.log("OK");
        pagesVisited[url] = true;
        let json = {};
        json.url = url;
        var $ = cheerio.load(html);

        // Parse the title of the document
        let titleTag = $('title');
        $(titleTag).each((i, a) => {
            json.title = $(a).text();
        });

        //Parse the body of the document
        let bodyTag = $('body');
        $(bodyTag).each((i, a) => {
            let texto = $(a).text();
            let textolimpio = limpiarTexto(texto);
            json.texto = textolimpio;
            json.palabras = cantPalabras(textolimpio);
        });
        // links de la pagina
        var nurl = new URL(url);
        var baseUrl = nurl.protocol + "//" + nurl.hostname;
        let links = collectInternalLinks($, baseUrl);

        return {
            "objeto": json,
            "links": links
        };
    }).catch(err => {
        console.log('BAD');
        // Promise.reject(err);
    });
};

/** procesa un listado de urls */
let lisurls = (urls) => {
    let suma = [];
    let index = [];
    return urls.reduce(
        (sequence, value) => {
            return sequence.then(function () {
                return procesar(value);
            }).then((obj) => {
                if (obj) {
                    index.push(obj.objeto);
                    for (var i = 0; i < obj.links.length; i++) {
                        suma.push(obj.links[i]);
                    }
                }
            });
        },
        Promise.resolve()
    ).then(() => {
        return {
            "links": suma,
            "index": index
        };
    });
};
/** Busca una url en la bd */
let searchUrl = (url) => {
    return Index.findOne({
        url: url
    });
};

/**listado de urls en bd*/
let listUrl = () => {
    return Index.find({}, 'url');
};



router.route('/indexed').get((req, res) => {
    pagesVisited = [];
    let url = req.query.url || req.params.url || req.body.url || req.headers['url'];
    let cantpages = req.query.cantpages || req.params.cantpages || req.body.cantpages || req.headers['cantpages'];


    if (!cantpages) {
        cantpages = 10;
    }
    let index = [];

    if (!url) {
        return res.status(203).send({
            response: {
                mensage: 'Inserte una url'
            }
        });
    } else {

        searchUrl(url).then(data => {
                if (data) {
                    return Promise.reject(203);
                } else {
                    return listUrl();
                }
            })
            .then(response => {
                if (response) {
                    for (var i = 0; i < response.length; i++) {
                        pagesVisited[response[i].url] = true;
                    }
                }
                return procesar(url);
            })
            .then(response => {
                // 1er nivel
                index.push(response.objeto);
                return new Promise((resolve, reject) => {
                    resolve(response.links);
                });
            })
            .then((links) => {
                //2do nivel
                let algunosVals = links.slice(0, cantpages);
                return lisurls(algunosVals);
            })
            .then((datos) => {
                //3cer nivel
                for (var i = 0; i < datos.index.length; i++) {
                    index.push(datos.index[i]);
                }
                let algunosVals = datos.links.slice(0, cantpages);
                return lisurls(algunosVals);
            }).then(datos => {
                //niveles terminados procesado de datos
                for (var i = 0; i < datos.index.length; i++) {
                    index.push(datos.index[i]);
                }

                //Insertando en la bd
                return Index.create(index);
            }).then(data => {
                let cantWord = palabrasTotal(data);
                // return res.status(200).send("Indexed " + data.length + " new pages and " + cantWord + " words.");
                return res.status(200).send({
                    response: {
                        cantPages: data.length,
                        cantWords: cantWord

                    }
                });
            })
            .catch(err => {
                if (err == 203) return res.status(203).send({
                    response: {
                        mensage: 'Url ya indexada'
                    }
                });
            });


    }
});

router.route('/clear').get((req, res) => {

    Index.remove().then(err => {
        return res.status(200).send({
            response: {
                mensage: 'Eliminado Correctamente'
            }
        });
    }).catch(err => {
        return res.status(400).send({
            response: {
                mensage: 'Inespected error'
            }
        });
    })

});


module.exports = router;