const fs = require("fs");

// Function to read JSON data from a file and count top-level elements
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

// Specify the path to your JSON file
const jsonFilePath = "formatted-nafdac-registered-products-test.json"; // Change this to the actual path of your JSON file

// Call the function
countJsonElementsFromFile(jsonFilePath);
