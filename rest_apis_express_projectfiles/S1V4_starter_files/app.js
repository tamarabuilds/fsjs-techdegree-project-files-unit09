const express = require('express');
const app = express();
const routes = require('./routes');


/** 
 * express middleware that is the first line for requests coming through before going to a route handler
 * This tells express we're expecting requests to come in as json.
 * Then json sent via the request body and make it available via the request object
 * In the request body
 * 
 * 
*/
app.use(express.json());
/**
 * Middleware to be used if the request starts with a certain path. 
 * When it starts with /api, then use the routes in the routes.js file
 */
app.use('/api', routes);





app.use((req, res, next)=> {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
