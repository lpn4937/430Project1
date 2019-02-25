const fs = require('fs'); // pull in the file system module

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`, { encoding: 'utf8' });
const bootStyles = fs.readFileSync(`${__dirname}/../client/bootstrap.css`, { encoding: 'utf8' });
const favicon = fs.readFileSync(`${__dirname}/../client/favicon.ico`, { encoding: 'utf8' });

// function to handle the index page
const getIndex = (request, response) => {
  // set status code (200 success) and content type
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // write an HTML string or buffer to the response
  response.write(index);
  // send the response to the client.
  response.end();
};

const getCSS = (request, response) => {
  // send css file from server
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styles, () => { response.end(); });
};
const getBootstrap = (request, response) => {
  // send bootstrap file from server
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(bootStyles, () => { response.end(); });
};
const getFavicon = (request, response) => {
  // send icon file from server
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.write(favicon, () => { response.end(); });
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  getIndex,
  getCSS,
  getBootstrap,
  getFavicon,
};
