const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Meta API",
    description: "示範範例生成文件",
  },
  host: "https://thawing-woodland-76538.herokuapp.com/",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
