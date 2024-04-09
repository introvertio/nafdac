const fs = require("fs");

// Function to flatten the nested JSON data
function flattenJsonData(data) {
  let flattened = [];
  data.forEach((sublist) => {
    sublist.forEach((item) => {
      flattened.push(item);
    });
  });
  return flattened;
}

// Read the JSON file
fs.readFile("drugs-data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  try {
    const nestedData = JSON.parse(data);
    const flattenedData = flattenJsonData(nestedData);

    // Write the flattened data to a new JSON file
    fs.writeFile(
      "flattened-drugs-data.json",
      JSON.stringify(flattenedData, null, 2),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );

    // Output the flattened data to console, optional
    console.log(flattenedData);
  } catch (e) {
    console.error("Error parsing JSON!", e);
  }
});
