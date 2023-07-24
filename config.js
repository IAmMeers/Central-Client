const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "default",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000"
};
