const express = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  // CREATING JAVASCRIPT OBJECT
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // CHANGING TO JSON OBJ FROM JS OBJ

  const jsonData = JSON.stringify(data);

  url = "https://us6.api.mailchimp.com/3.0/lists/2860788f1b";

  const option = {
    method: "POST",
    auth: "kashif:36c0c84a1f14e1ce80ca5a3c2b40-us9",
  };

  const request = https.request(url, option, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
      if (response.statusCode === 200) res.sendFile(__dirname + "/success.html");
      else res.sendFile(__dirname + "/failure.html");
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});


