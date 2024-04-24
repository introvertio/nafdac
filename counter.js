const fs = require("fs");

// Function to read Products JSON and return count of all the Objects in the JSON
function countJsonElementsFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      const count = Object.keys(jsonData).length;
      console.log("Number of products:", count);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
}

const jsonFilePath = "formatted-nafdac-registered-products-test.json"; // Change this to the actual path of your JSON file

countJsonElementsFromFile(jsonFilePath);
