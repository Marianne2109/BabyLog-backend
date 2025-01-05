require("dotenv").config();

const {app} = require("./server.js");
const { dbConnect } = require("./utils/database.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {

    await dbConnect();

    console.log("BabyLog Server running on port " + PORT);
});


