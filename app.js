// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data)=> {console.log('Called Listener:',data)});

// logger.log('Hello World!');



/*
const http = require('http');

// Create Server Object
http.createServer((req, res)=>{

  // Write a response
  res.write('Hello World!');
  res.end();

}).listen(5000, ()=>{
  console.log('Server running...')
});
*/


const http = require('http');
const path = require('path');
const fs = require('fs');

// Port
const PORT = process.env.PORT || 5000 ;

const server = http.createServer((req, res) => {
  //  console.log(req.url);

  // if(req.url === '/') {
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content)=>{
  //    if(err) throw err;
  //     res.writeHead(200, {'Content-Type':'text/html'});
  //     res.end(content);
  //   });
  // }
  
  // if(req.url === '/about') {
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content)=>{
  //    if(err) throw err;
  //     res.writeHead(200, {'Content-Type':'text/html'});
  //     res.end(content);
  //   });
  // }
  
  if(req.url === '/api/users') {

    const content = [
      {'name':'shovon','age': 30},
      {'name':'Anik','age': 24},
      {'name':'Honu','age': 45},
    ];
      res.writeHead(200, {'Content-Type':'text/json'});
      res.end(JSON.stringify(content));
  }

  // Build File path Dynamic
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension of file
  let extName = path.extname(filePath);

  // initial Content Type
  let contentType = 'text/html';

  switch (extName) {
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
    case '.json':
      contentType = 'application/json'
      break;
    case '.png':
      contentType = 'image/png'
      break;
    case '.jpg':
      contentType = 'image/jpg'
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content)=>{
    if(err){

      if(err.code == 'ENOENT'){
        // Page Not Found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end(content);
            });
      }else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    }else{
      // Success
      res.writeHead(200, {'Content-Type':contentType});
      res.end(content);
    }
  });



});



server.listen(PORT, ()=>{
  console.log(`Server Running on port=${PORT}`)
});