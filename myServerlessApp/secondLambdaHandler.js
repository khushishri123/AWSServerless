const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const addItem = async (item) => {
  console.log("Adding item to DynamoDB:", item);
  try {
    await dynamoDB
      .put({
        TableName: "dummyData",
        Item: item,
      })
      .promise();
    console.log("Item added successfully:", item);
  } catch (error) {
    console.error("Error adding item to DynamoDB:", error);
    throw error;
  }
};

exports.handler = (event, context) => {
  try {
    const data = event.data;

    console.log("Data is:", data);
    console.log("First data:", data[0].name);

    data.forEach(async (element) => {
      const name = element.name;
      const city = element.city;
      const newItem = {
        name,
        city,
      };
      console.log("Data in newItem:", newItem.name, newItem.city);
      await addItem(newItem);
    });
    return {
      statusCode: 200,
      data: "Data successfully uploaded to DynamoDb",
    };
  } catch (err) {
    console.error("Error in handler:", err);
    return {
      statusCode: err.statusCode || 500,
      message: JSON.stringify(err.message),
    };
  }
};
