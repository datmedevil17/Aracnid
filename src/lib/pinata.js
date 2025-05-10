const axios = require("axios");

// Add environment variables for API keys
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY 

const uploadToIpfs = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    const fileData = new FormData();
    fileData.append("file", file);
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      fileData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const tokenURI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    console.log("File uploaded successfully:", tokenURI);
    return tokenURI;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw new Error("Failed to upload file to IPFS");
  }
};

const uploadToIpfsJson = async (jsonData) => {
  if (!jsonData) {
    throw new Error("No JSON data provided");
  }

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      jsonData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
    const tokenURI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    console.log("JSON uploaded successfully:", tokenURI);
    return tokenURI;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw new Error("Failed to upload JSON to IPFS");
  }
};

const getJsonFromIpfs = async (ipfsHash) => {
  if (!ipfsHash) {
    throw new Error("No IPFS hash provided");
  }

  try {
    const res = await axios.get(ipfsHash);
    console.log("JSON fetched successfully from IPFS");
    return res.data;
  } catch (error) {
    console.error("Error fetching JSON from IPFS:", error);
    throw new Error("Failed to fetch JSON from IPFS");
  }
};

module.exports = {
  uploadToIpfs,
  uploadToIpfsJson,
  getJsonFromIpfs
};