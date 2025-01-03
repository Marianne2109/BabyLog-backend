const express = require("express");

//make server instance
const app = express();

//SERVER CONFIGURATION


//API response - app.verb(path, callback);
app.get("/", (request, response) => {
   
    response.json({
        message: "BabyLog"
    });
});




module.exports={
    app
}