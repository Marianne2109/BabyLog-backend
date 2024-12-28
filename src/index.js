const express = require("express");

//Create instance of express to configure
const app = express();

//Create routes
//GET localhost:3000/
app.get("/", (request, response) => {
    response.send("BabyLog Express Setup")
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`BabyLog Server listening on localhost:${PORT}`);
})