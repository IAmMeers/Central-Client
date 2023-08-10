const dotenv = require("dotenv");
const path = require("path");
const os = require("os");
//const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "default",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:5000",
    ROOT: os.getcwd()
};
