
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var rootDir = path.resolve(__dirname, "");

const conn = mongoose.createConnection("mongodb+srv://sourav:pass@cluster0.wyfk8.mongodb.net/pyckup");



conn.on('open', async () => {


    var collections = null;
    var db = await conn.db;

    await db.listCollections().toArray().then(names => {

        collections = names;
        //console.log(names);
        mongoose.connection.close();
    });


    var i;

    for (i = 0; i < collections.length; i++) {

        try {


            console.log("inside try");

            var pickedCollection = db.collection(collections[i].name);

            await pickedCollection.find().toArray().then(
                function (data) {
                    console.log("inside collection");
                    console.log(data); // it will print your collection data

                    var dir = path.resolve(__dirname, "./backup");

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }

                    console.log("i is ",i);
                    //console.log("collection is ",collections);
                    console.log("collection length is ",collections.length);


                    fs.writeFile(rootDir + "/backup/" + collections[i].name + '.json', JSON.stringify(data, null, 2), 'utf8', () => {

                    });

                }
            );




        } catch (err) {
            console.log(err);
        }


    }





});