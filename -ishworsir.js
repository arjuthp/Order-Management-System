const http = require('http');//impthat handles http request and responsesort http module 

const PORT = 3000; //creates a constant variable to store port

// Create HTTP server
const server = http.createServer((req, res) => { //res , res
// Set response header 
    res.setHeader('Content-Type', 'application/json');

    // API 1: GET /api/hello
    if (req.method === 'GET' && req.url === '/api/hello') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: 'Hello, World!',
      timestamp: new Date().toISOString()
    }));
  }
// API 2: GET /api/user
  else if (req.method === 'GET' && req.url === '/api/user') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student'
    }));
  }

  // Handle 404 - Not Found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: 'Route not found',
      availableRoutes: ['/api/hello', '/api/user']
    }));
  }
});

// Start server
server.listen(PORT, () => { //
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available APIs:`);
  console.log(`  - GET http://localhost:${PORT}/api/hello`);
  console.log(`  - GET http://localhost:${PORT}/api/user`);
});