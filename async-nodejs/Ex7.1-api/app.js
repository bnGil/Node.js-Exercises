const axios = require("axios");
const https = require("https");
const superagent = require("superagent");

const url = "https://dog.ceo/api/breeds/image/random";

//? With axios
const fetchWithAxios = () => {
  try {
    axios.get(url).then((result) => console.log(result.data.message));
  } catch (err) {
    console.log(err.message);
  }
};
// fetchWithAxios();

//? With request module
const fetchWithRequest = () => {
  const options = {
    hostname: "dog.ceo",
    port: 443,
    path: "/api/breeds/image/random",
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
// fetchWithRequest();

//? With superagent
const fetchWithSuperagent = () => {
  superagent.get(url).end((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res._body);
    }
  });
};

fetchWithSuperagent();
