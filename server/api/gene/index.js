'use strict';

var express = require('express');
var controller = require('./gene.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

// Setup file upload
var os = require('os');
var multer = require('multer')
router.post('/upload', [multer({
        dest: os.tmpdir(),
        putSingleFilesInArray: true,
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
        },
    }),
    controller.upload]);

module.exports = router;
