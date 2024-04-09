const fs = require("fs");
const readline = require("readline");

// Function to search products by NAFDAC number
function searchProductByNAFDAC(data, nafdacNumber) {
  return data.find((product) => product.NAFDAC === nafdacNumber);
}

// Setting up the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask user for the NAFDAC number
rl.question("Enter the NAFDAC number to search for: ", (nafdacNumber) => {
  fs.readFile("flattened-drugs-data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      rl.close();
      return;
    }
    try {
      const products = JSON.parse(data);
      const product = searchProductByNAFDAC(products, nafdacNumber);
      if (product) {
        console.log("Product found:", JSON.stringify(product, null, 2));
      } else {
        console.log("No product found with NAFDAC number:", nafdacNumber);
      }
    } catch (e) {
      console.error("Error parsing JSON!", e);
    }
    rl.close();
  });
});
