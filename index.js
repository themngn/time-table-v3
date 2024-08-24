const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/groups", require("./routes/group.route"));
app.use("/api/choices", require("./routes/choice.route"));
// app.use("/api/courses", require("./routes/course.route"));
// app.use("/api/classes", require("./routes/class.route"));

db_user = process.env.DB_USER;
db_password = process.env.DB_PASSWORD;
mongoose
    .connect(
        `mongodb+srv://${db_user}:${db_password}@cluster0.9c3l8.mongodb.net/timetable?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log("Connected to the database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
