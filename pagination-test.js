const axios = require("axios");

async function fetchPage(pageNumber) {
  const url = `http://greenbook.nafdac.gov.ng/?draw=${pageNumber}&columns%5B0%5D%5Bdata%5D=product_name&columns%5B0%5D%5Bname%5D=product_name&...&start=${
    (pageNumber - 1) * 100
  }&length=100&...`;
  const config = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0",
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en-US,en;q=0.5",
      "X-Requested-With": "XMLHttpRequest",
    },
    referrer: "http://greenbook.nafdac.gov.ng/",
    method: "GET",
    mode: "cors",
  };

  try {
    const response = await axios.get(url, config);
    console.log(`Data fetched successfully for page ${pageNumber}`);
    return response.data; // Assuming data is directly in response.data
  } catch (error) {
    console.error(`Failed to fetch data for page ${pageNumber}:`, error);
    return null; // Handle error by returning null or appropriate error handling
  }
}

async function fetchAllPages(totalPages) {
  let allData = [];
  for (let i = 1; i <= totalPages; i++) {
    const data = await fetchPage(i);
    if (data) {
      allData.push(data);
    }
  }
  console.log("Finished fetching all pages.");
  // Optionally save the data to a file or database
  return allData;
}

console.log(fetchAllPages(71)); // Fetch data from page 1 to 71
