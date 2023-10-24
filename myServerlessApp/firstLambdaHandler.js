const axios = require("axios");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda();

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(
      "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8"
    );
    const data = response.data;
    console.log(data);
    console.log(data[0].name);
    return { data: data };
  } catch (err) {
    return {
      statusCode: 500,
      message: JSON.stringify(err),
    };
  }
};
