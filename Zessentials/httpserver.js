// const http = require("http"); // HTTP server
// const fs = require("fs"); // File system operations
// const url = require("url"); // URL parsing
const express = require("express");
const app = express();

app.get('/', (req,res)=>{
    res.send("Hello from home Page");
});

app.get('/about', (req, res)=>{
     res.send("Hello form About Page" + " hey " + req.query.name  + " You are " + req.query.age);
});

app.listen(8000, ()=> console.log("Server Started !"));


// const myServer = http.createServer(app);



// const myServer = http.createServer((req, res) => {
//     if(req.url === "/favicon.ico")return res.end(); // Ignore favicon requests
    
//     const log = `${Date.now()} : ${req.method} ${req.url} New Req Received\n`;
    
//     const myUrl = url.parse(req.url, true); // 'true' parses query string into object
//     console.log(myUrl);
//     fs.appendFile('log.txt',log,(error, data) => { // Async log to file
        
//         switch(myUrl.pathname){
//             case "/":
//             if (req.method === "GET") res.end("HomePage");
//             break; 
            
//             case '/about':
//             const username = myUrl.query.myname // Get query param: /about?myname=John
//             res.end(`hi, it's ${username}`);
            
//             case "/search":
//                 const search = myUrl.query.search_query; // Get search query
//                 res.end("Here are your results for" + search);
            
//             case '/signup':
//                 if(req.method === "Get") res.end('This is a signup Form');
//                 else if (req.method === "POST"){
//                     res.end("Success"); // Would save to DB in production
//                 }
//             break;
            
//             default:
//                 res.end("404 Not Found ");
//                     }
//     });
// });

// let port = 8000;
// myServer.listen(8000, () => console.log("Server Started!", `http://localhost:${port }`)); // req = request, res = response


////======================

/**
 * notes
//app.METHOD(PATH, HANDLER)
 * app is an instance of an express
 * METHOD is an HTTP request METHOD , in lowercase
 * PATH is the path on the server
 *HANDLER is the fun executed when the route is matched
 *  */  