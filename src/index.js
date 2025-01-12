require("dotenv").config();

const {app} = require("./server");
const { dbConnect } = require("./mongo/database");


const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');


app.listen(PORT, async () => {

    await dbConnect();

    console.log("BabyLog Server running on port " + PORT);
});

