const fs = require("fs");
const path = require("path");

// Function to read JSON data from file
function readJsonFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          console.log("Data read successfully.");
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

// Function to transform array of arrays to dictionary with structured objects
function transformData(data) {
  if (!Array.isArray(data)) {
    console.error("Expected an array, received type:", typeof data);
    return {};
  }
  const newData = {};
  data.forEach((item) => {
    if (Array.isArray(item) && item.length >= 11) {
      const key = item[10]; // Assuming the last element is the registration number
      newData[key] = {
        id: item[0],
        "product type": item[1],
        "product name": item[2],
        "product category": item[3],
        "active ingredient(s)": item[4],
        manufacturer: item[5],
        "manufacturer country": item[6],
        "manufacturer address": item[7],
        "date approved": item[8],
        "expiry date": item[9],
        "registration number": item[10],
      };
    } else {
      console.error("Item is not an array or is incomplete:", item);
    }
  });
  return newData;
}

// Function to write JSON data to file
function writeJsonToFile(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log("Data successfully written to new file:", filePath);
    }
  });
}

// Path to the original and new JSON files
const originalFilePath = path.join(
  __dirname,
  "nafdac-registered-products.json"
);
const newFilePath = path.join(
  __dirname,
  "formatted-nafdac-registered-products.json"
);

// Main function to handle the process
async function main() {
  try {
    // Read data from the original JSON file
    const jsonData = await readJsonFromFile(originalFilePath);

    // Check if the 'data' key exists in the JSON object
    if (!jsonData.data) {
      console.error("The 'data' key is not present in the JSON object.");
      return;
    }

    // Transform the data
    const formattedData = transformData(jsonData.data);

    // Write the transformed data to the new file
    writeJsonToFile(newFilePath, formattedData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
