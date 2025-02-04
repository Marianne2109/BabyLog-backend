const express = require("express");
const cors = require("cors");

//Enables cross-origin resource sharing
const corsOptions = {
    origin: ["http://127.0.0.1:5174", "http://localhost:5174", "http://127.0.0.1:5173", "http://localhost:5173", "http://localhost:3000", "https://babylog-backend.onrender.com/"],
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true
};

//make server instance
const app = express();

app.use(cors(corsOptions));

//Middleware for JSON request in raw JSON data
app.use(express.json());

//Routes
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
const ChildRoutes = require("./routes/ChildRoutes");


//Root API response - app.verb(path, callback);
app.get("/", (request, response) => {
   
    response.json({
        message: "BabyLog"
    });
});

//Register routes
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/role", RoleRoutes);
app.use("/child", ChildRoutes);


app.get('*', (request, response) => {
    response.status(404).json({
        error: "Incorrect page"
    });
});

module.exports={
    app
}