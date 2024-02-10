var express = require('express');

var router = express.Router();

var database = require('../dboperation');
const { config } = require('dotenv');

router.get("/", function (request, response, next) {

    database.getdata_withQuery().then((data) => {
        // response.json(data[0]);
        response.render('sample_data.ejs', { title: 'Node.js MsSQL CRUD Application', action: 'list', sampleData: data[0] });
    });

});

router.get("/add", function (request, response, next) {

    response.render("sample_data.ejs", { title: 'Insert Data into MsSQL', action: 'add' });

});

router.post("/add_sample_data", function (request, response, next) {
    database.addData(request).then(() => {
        response.redirect("/sample_data");
    });
});

router.get("/edit/:id", function (request, response, next) {

    database.editData(request).then((data) => {
        // console.log(data[0][0]);
        response.render('sample_data.ejs', { title: 'Edit MsSQL Table Data', action: 'edit', sampleData: data[0][0] });

    });

});

router.post("/edit/:id", function (request, response, next) {
    database.updateData(request).then(() => {
        // console.log(data[0]);
        response.redirect("/sample_data");
    });

});

router.get('/delete/:id', function (request, response, next) {
    database.deleteData(request).then(() => {
        response.redirect("/sample_data");
    });
});


module.exports = router;