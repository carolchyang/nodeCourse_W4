const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Meta API",
    description: "Node 直播班 - W4",
  },
  host: "https://thawing-woodland-76538.herokuapp.com/",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
