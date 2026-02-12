const http = require("http");
const fs = require("fs");
const url = require("url");
const { json } = require("stream/consumers");

// Sample product data
const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 50000 },
    { id: 2, name: "Phone", category: "electronics", price: 30000 },
    { id: 3, name: "Desk", category: "furniture", price: 15000 },
    { id: 4, name: "Chair", category: "furniture", price: 8000 }
];

// TODO: Create your server here
const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico")return res.end();
    const log = `${Date.now()} : ${req.method} ${req.url} New Req Received\n`;

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile('plog.txt', log,(error, data) => {
        switch (myUrl.pathname) {
            case "/":
              
                if(req.method === "GET")res.end("Welcome to HomePage");
                
                break;
                case "/products":
                 if(req.method === "GET") {
           
                  res.setHeader('content-type', 'application/json');  
                  const category = myUrl.query.category;

                  if(category){
                    const filtered = products.filter(p => p.category === category);
                    res.end(JSON.stringify(filtered));

                  }else{
                    res.end(JSON.stringify(products));
                  }
                }else if(req.method ==="POST"){
                    let body = '';
                    req.on('data',chunk => body += chunk);
                    req.on('end', ()=> {
                        const newProduct = JSON.parse(body);
                        newProduct.id = products.length + 1;
                        products.push(newProduct);
                        res.setHeader('content-type', application/json);
                        res.end(JSON.stringify({message:"Added", product: newProduct }));

                    });
                }
                break;
                case "/product":
                const id = parseInt(myUrl.query.id);
                 if(req.method === "GET") {
                 
                  if(product){
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(products.find(i => i.id === id)));
                  }else if(req.method === "DELETE" ) {
                    const index = products.findIndex(p => p.id == id);
                    if( index !== -1){
                    products.splice(index, 1);
                   res.end(JSON.stringify({ message: "Product deleted successfully" })); 
                    }else{
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: "Product not found" }));
                }}
             }break;
            default:
                res.statusCode = 404;
                res.end("404 Not Found");
                break;
        }
    });

   
    
});

const port = 3000;
myServer.listen(port, () => console.log(`Server Started! http://localhost:${port}`));

/* 
PRACTICE CHALLENGE: Product Inventory API
==========================================

Build the following endpoints:

1. GET / 
   - Return: Welcome message with API documentation

2. GET /products
   - Return: All products as JSON

3. GET /products?category=electronics
   - Return: Filtered products by category

4. GET /product?id=1
   - Return: Single product by ID
   - Handle invalid IDs

5. POST /products
   - Return: Success message (simulate adding product)

6. DELETE /product?id=1
   - Return: Success message (simulate deletion)



BONUS:
- Log all requests to a file with timestamp, method, and URL
- Set proper Content-Type headers for JSON responses
- Handle 404 for unknown routes
- Ignore favicon requests

Good luck! 🚀
*/
