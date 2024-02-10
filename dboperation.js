var config = require("./dbconfig");
const sql = require("mssql");

var connection = sql.connect(config, function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Database Connected Successfully");
    }
});

async function getdata_withQuery() {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT * FROM dbo.sample_data;");
        return res.recordsets;
    } catch (error) {
        console.log(" mathus-error :" + error);
    }
}

async function addData(request) {
    try {
        let pool = await sql.connect(config);
        var first_name = request.body.first_name;

        var last_name = request.body.last_name;

        var age = request.body.age;

        var gender = request.body.gender;
        var Password = request.body.Password;

        // console.log(typeof (request.body.gender));

        let insert = `INSERT INTO dbo.sample_data 
        (first_name, last_name, age, gender,Password) 
        VALUES ('${first_name}', '${last_name}', '${age}', '${gender}','${Password}');`

        // console.log(insert);

        let res = await pool.request().query(insert);
        return res.rowsAffected;
    } catch (error) {
        console.log(" mathus-error :" + error);
    }
}

async function editData(request) {
    try {
        let pool = await sql.connect(config);

        var id = (request.params.id);
        var edit = `SELECT * FROM sample_data WHERE id = '${id}'`;
        var res = await pool.request().query(edit);
        return res.recordsets;

    } catch (error) {
        console.log(" mathus-error :" + error);
    }
}

async function updateData(request) {
    try {

        var id = parseInt(request.params.id);

        let pool = await sql.connect(config);

        var first_name = request.body.first_name;

        var last_name = request.body.last_name;

        var age = request.body.age;

        var gender = request.body.gender;

        var Password = request.body.Password;

        var update = `
        UPDATE sample_data 
        SET first_name = '${first_name}', 
        last_name = '${last_name}', 
        age = '${age}', 
        gender = '${gender}', 
        Password = '${Password}' 
        WHERE id = '${id}'
        `;
        console.log(update)
        let res = await pool.request().query(update);
        return res.recordsets;
    } catch (error) {
        console.log(" mathus-error :" + error);
    }
}


async function deleteData(request) {
    try {
        let pool = await sql.connect(config);
        var id = request.params.id;
        console.log(typeof (id))
        let del = `DELETE FROM sample_data WHERE id = '${id}'`;

        // console.log(query)

        let res = await pool.request().query(del);
        // console.log(res);
        return res.recordsets;
    } catch (error) {
        console.log(" mathus-error :" + error);
    }
}

module.exports = {
    connection,
    getdata_withQuery: getdata_withQuery,
    addData: addData,
    editData: editData,
    updateData: updateData,
    deleteData: deleteData
};
