## RestFull API => Representational State Transfer

# Rules:::::::
    1. client - server architectue i.e. both are independent
        a. response from server can be (text, image, html document, JSON)
        b. ssr = server side rendering (when we generate html from server and we rendered and sent response to client and now client has to depend on server)

        c.key notes
            -if client is browser=> server sent html
            -else if client is crossplatform then server must send JSON data => k/a CSR(Client -Side Rendering)
    
    2. always respect all HTTP methods:::
        a. GET /user => read user data and return data
        b. POST /user => handle new user creation
        c. PATCH /user => update the user

    3. no need to handle states in restful api
