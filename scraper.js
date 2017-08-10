'use strict';

const cheerio = require('cheerio');
const request = require('request');

const scraper = {
  //instantiate cache as empty object
  cache: Object.create(null),

  getAnimalData: ($, link) => {
    return new Promise((resolve, reject) => {
      //scrape profile link, pic and name from 1st page
      const profileLink = $(link).attr('href');
      const pic = $(link).find('.image').attr('src');
      const name = $(link).find('.title_tab').text();
      //request html from 2nd page
      request(profileLink, (err, response, html) => {
        //make html on 2nd page targetable
        let $ = cheerio.load(html);
        //scrape description from 2nd page
        const description = $('.p-style2').text();
        //invoke resolve callback with data for current animal
        resolve({ name, description, pic, profileLink });
        reject(err);
      });
    });
  },

  getData: (req, res, next) => {
    const culverUrl = 'https://www.shelterluv.com/available_pets/332?embedded=1&iframeId=shelterluv_wrap_1451949179363&columns=1#https%3A%2F%2Fwww.adoptandshop.org%2Fculver-city-pets%2F%23sl_embed%26page%3Dshelterluv_wrap_1451949179363%252Favailable_pets%252F332';
    const lakewoodUrl = 'https://www.shelterluv.com/available_pets/338?embedded=1&iframeId=shelterluv_wrap_1451949982395&columns=1#https%3A%2F%2Fwww.adoptandshop.org%2Flakewood-pets%2F%23sl_embed%26page%3Dshelterluv_wrap_1451949982395%252Favailable_pets%252F338';
    //check req.route.path to know which page to scrape
    const url = req.route.path === '/culvercity' ? culverUrl : lakewoodUrl;
    //request html from 1st page
    request(url, (error, response, html) => {
      if (scraper.cache[req.route.path]) res.send(scraper.cache[req.route.path]);
      //make html on 1st page targetable
      let $ = cheerio.load(html);
      const animalPromises = [];
      //loop through every '.profile-link' <a> tag on first page
      $('.profile_link').each((i, link) => {
        animalPromises.push(scraper.getAnimalData($, link));
      });
      //when all promises have resolved, cache data and send response
      Promise.all(animalPromises)
        .then((animals) => {
          //if data hasn't been stored in cache, store data under route path
          if (!scraper.cache[req.route.path]) {
            scraper.cache[req.route.path] = animals;
            //set a timeout to clear the cache after 5 mins
            setTimeout(() => scraper.cache = Object.create(null), 300000);
          }
          //set response header to allow CORS and send data to client
          res.set({ 'Access-Control-Allow-Origin': '*' });
          res.send(animals);
        })
        .catch((err) => res.status(418).send(err));
    });
  }
};

module.exports = scraper;
