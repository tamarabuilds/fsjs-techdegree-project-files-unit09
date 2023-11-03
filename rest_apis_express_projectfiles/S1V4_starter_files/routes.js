const express = require('express');
// new router allows us to route everything to /api without having to specify it on every single route
const router = express.Router();
const records = require('./records')

// Helper function to eliminage all the try.. catch blocks
function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
  }

  // Send a GET request to /quotes READ a list of quotes
router.get('/quotes', asyncHandler(async (req, res)=> {
    console.log(`GET list of quotes`)
    const quotes = await records.getQuotes();
    res.json(quotes);
}));

// Send a GET request to /quotes/:id READ(view) a quote
router.get('/quotes/:id', asyncHandler(async (req, res)=> {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({message: 'Quote not found '})
    };
    // res.json(quote);
}));

// Send a GET request to /quotes/quote/random READ (view) a random quote
router.get("/quotes/quote/random", asyncHandler(async (req, res, next) => {
    // console.log(`here?`)
    // const allQuotes = await records.getQuotes()
    // const numOfQuotes = Object.keys(allQuotes.records).length
    // const random = Math.ceil( Math.random() * numOfQuotes);
    // // console.log(allQuotes.records)
    // // console.log(allQuotes.records[0])
    // // console.log(Object.keys(allQuotes.records).length)
    // // console.log(random)
    // const quote = allQuotes.records[random];
    // if (quote){
    //     res.json(quote);
    // } else {
    //     res.status(404).json({message: 'Quote not found '})
    // }

    const quote = await records.getRandomQuote();
    if (quote){
        res.json(quote);
    } else {
        res.status(404).json({message: 'Quote not found '})
    }

}));

// Send a POST request to /quotes CREATE a new quote
router.post('/quotes', asyncHandler( async (req, res)=>{
    if (quote.quote && quote.author) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote);
    } else {
        res.status(400).json({message: "Quote and author required"});
    }
}));


// Send a PUT request to /quotes/:id UPDATE (edit) a quote
router.put('/quotes/:id', asyncHandler(async (req, res)=> {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        // For a put request, it's convention to send status 204 (meaning no content == everything went OK but there's nothing to send back)
        // Must end the request with .end
        res.status(204).end();
    } else {
        res.status(400).json({message: "Quote not found"});
    }
}));

// Send a DELETE request /quotes/:id to DELETE a quote
router.delete("/quotes/:id", asyncHandler (async (req, res, next) => {
    // throw new Error("somthing terrible  hrouterend and we have a server error now")
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        await records.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(400),json({message: "Quote not found"});
    }
}));



module.exports = router;