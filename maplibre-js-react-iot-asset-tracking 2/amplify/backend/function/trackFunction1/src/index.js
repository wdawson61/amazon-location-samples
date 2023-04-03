const AWS = require("aws-sdk");

// Update this to match the name of your Tracker resource
const TRACKER_NAME = "CattraxTracker1";
const location = new AWS.Location();

exports.handler = async (event) => {
  const updates = [
    {
      DeviceId: event.payload.deviceId,
      SampleTime: new Date(event.payload.timestamp).toISOString(),
      Position: [event.payload.location.long, event.payload.location.lat],
    },
  ];

  console.log(updates);

  let res;
  try {
    res = await location
      .batchUpdateDevicePosition({
        TrackerName: TRACKER_NAME,
        Updates: updates,
      })
      .promise();

    console.log(res);
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(res),
  };
  return response;
};