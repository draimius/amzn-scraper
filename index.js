const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const api_key = '2559ae74a7a87f4c8dc325d1f4dbf339';
// 4c8dc325d1f4dbf33959ae74a7a87f
const generateScraperUrl = () =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

//allow us to parse json input
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to amazon web scraper, use docs coming soon');
  res.broad;
});

//Get product details
app.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
    //
  } catch (error) {
    res.json(error);
  }
});

//Get product reviews
app.get('/product/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
    //
  } catch (error) {
    res.json(error);
  }
});

//Get product offers
app.get('/product/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
    //
  } catch (error) {
    res.json(error);
  }
});

//Get from search query
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
    //
  } catch (error) {
    res.json(error);
  }
});

//NOTE: difference between the route defined for our api to be requested to then the url/path that we
// --request withing the api to then get that specified data (are can be set by us api one predetermined already)
//
//
//
//
//

app.listen(PORT, () => console.log('working bruv'));

//host api/servers on heroku and sites on netlify
