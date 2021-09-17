const express = require('express');
const next = require('next');
const {parse} = require('url');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/*', async (req, res) => {
    const parsedUrl = parse(req.url, true);

    const subdomain = req.subdomains.length ? req.subdomains[0] : false;

    try{
      // console.log(parsedUrl.pathname, req.protocol);

      if(
        !parsedUrl.pathname.startsWith('_next') &&
        parsedUrl.pathname.split('.').length < 2
      ){
        if(subdomain){
          req.subdomain = subdomain;
        }
      }

      handle(req, res, parsedUrl)
    }catch(err){
      console.error(err)
      res.status(500).send(err)
    }
  })

  server.listen(port, (err) => {
    if(err) throw err;
    console.log(`> Ready on http://localhost${port}`)
  })
})
