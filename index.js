console.log("Starting server..[MNG_TEST]");
console.log("FRONTEND_URL: " + process.env.FRONTEND_URL);
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 10000;

app.use("/api/groups", require("./routes/group.route"));
app.use("/api/choices", require("./routes/choice.route"));
app.use("/api/courses", require("./routes/course.route"));
app.use("/api/classes", require("./routes/class.route"));
app.use("/api/users", require("./routes/user.route"));

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

db_user = process.env.DB_USER;
db_password = process.env.DB_PASSWORD;
mongoose
    .connect(
        `mongodb+srv://${db_user}:${db_password}@cluster0.9c3l8.mongodb.net/timetable?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log("Server is running on port " + port);
        });
    })
    .catch((err) => {
        console.log(err);
    });
