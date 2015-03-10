/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /genes              ->  index
 * POST    /genes              ->  create
 * GET     /genes/:id          ->  show
 * PUT     /genes/:id          ->  update
 * DELETE  /genes/:id          ->  destroy
 * POST    /upload             ->  upload
 */

'use strict';

var _ = require('lodash');
var Gene = require('./gene.model');

// Get list of genes
exports.index = function (req, res) {
    Gene.find(function (err, genes) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, genes);
    });
};

// Get a single gene
exports.show = function (req, res) {
    Gene.findById(req.params.id, function (err, gene) {
        if (err) {
            return handleError(res, err);
        }
        if (!gene) {
            return res.send(404);
        }
        return res.json(gene);
    });
};

// Creates a new gene in the DB.
exports.create = function (req, res) {
    Gene.create(req.body, function (err, gene) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, gene);
    });
};

// Updates an existing gene in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Gene.findById(req.params.id, function (err, gene) {
        if (err) {
            return handleError(res, err);
        }
        if (!gene) {
            return res.send(404);
        }
        var updated = _.merge(gene, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, gene);
        });
    });
};

// Deletes a gene from the DB.
exports.destroy = function (req, res) {
    Gene.findById(req.params.id, function (err, gene) {
        if (err) {
            return handleError(res, err);
        }
        if (!gene) {
            return res.send(404);
        }
        gene.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

// Upload a json file
exports.upload = function (req, res) {
    console.log(req);
    console.log(req.query);
    console.log(req.body);

    var fs = require('fs');
    var newPath = __dirname + "/dump.log";
    fs.writeFile(newPath, objToString(req) + objToString(req.params) + objToString(req.query)+ objToString(req.body), function (err) {
        if (err) {
            return handleError(res, err);
        }
        return res.send(204);
    });
};

function handleError(res, err) {
    return res.send(500, err);
};

function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
