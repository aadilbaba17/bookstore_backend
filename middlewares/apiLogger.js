// middleware to log API requests
export const apiLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
  
    // log the HTTP method and endpoint
    console.log(`API hit: ${method} ${url}`);
  
    // pass control to the next middleware/route handler
    next();
  };