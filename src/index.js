require("dotenv").config();

const {app} = require("./server");
const { dbConnect } = require("./utils/database");


const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');



app.listen(PORT, async () => {

    await dbConnect();

    console.log("BabyLog Server running on port " + PORT);
});

// app.listen(PORT, () => {
//     console.log(`BabyLog Server running on port ${PORT}`);
//   }).on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.error(`Port ${PORT} is already in use`);
//     } else {
//       console.error(`Server error: ${err.message}`);
//     }
//     process.exit(1);
//   });
