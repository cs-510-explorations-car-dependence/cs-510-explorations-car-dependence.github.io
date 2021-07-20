const http = require('http');
const axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
 var data = getSrc();
 data.then(response => {
     console.log(response.data.RWS);
    
     
    })
    .catch(error => {
        console.log(error);
      });
 
  
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function getData(){
    var data = axios.get('http://reqres.in/api/users/2')
    .then(response => {
      //console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });

    return data;
}

function getSrc() {   
    return axios.get('https://traffic.ls.hereapi.com/traffic/6.1/flow.json?bbox=45.5153%2C-122.6855%3B45.5064%2C-122.6760&apiKey=pOG2q2fYQin39J56WyBmsOIBRQMnio5F9MugDhdYiZA');
}

