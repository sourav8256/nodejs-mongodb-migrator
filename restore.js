
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var rootDir = path.resolve(__dirname, "");

const conn = mongoose.createConnection("<database url>");




conn.on('open', async () => {



    var db = await conn.db;


    fs.readdirSync(path.resolve(__dirname, "./backup/")).forEach(async file => {
        console.log(file);
        let rawdata = fs.readFileSync(rootDir + '/' + 'backup/' + file);
        let data = JSON.parse(rawdata);
        console.log(data);

        await db.createCollection(file.split('.')[0]).then(
            function (collection) {
                mongoose.connection.close();
                collection.insert(data).then(
                    function (result) {

                    }
                )

                /* collection.insertMany(data).then(
                    function (result) {

                    }
                ) */
            }
        );

    });

});