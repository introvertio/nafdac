const fs = require("fs");
const path = require("path");

function readJsonFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

// Function to search for a registration number in the data dictionary
function searchByRegistrationNumber(data, registrationNumber) {
  const item = data[registrationNumber];
  return item ? item : "No matching item found.";
}

// Path to the JSON file
const jsonFilePath = path.join(
  __dirname,
  "formatted-nafdac-registered-products-test.json"
);

// Main function to handle the search process
async function main() {
  try {
    // Read data from JSON file
    const data = await readJsonFromFile(jsonFilePath);

    const searchTerm = "03-0740"; // Set what item you want to get with reg number

    if (!searchTerm) {
      console.log("Please provide a registration number to search for.");
      return;
    }

    // Search the data
    const result = searchByRegistrationNumber(data, searchTerm);
    console.log(JSON.stringify(result, null, 4));
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
