const express = require("express");
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);
// Listener
app.listen(PORT, () => {
    console.log("The app is listening on PORT" + PORT);
});