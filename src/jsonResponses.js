// object to hold recipe list
const recipes = {};

// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });

  // stringify the object (so it doesn't use references/pointers/etc)
  response.write(JSON.stringify(object));

  // Send the response to the client
  response.end();
};
const badRequest = (request, response) => {
  const responseJSON = {
    message: 'All Fields are required',
    id: 'missingParams',
  };
  respondJSON(request, response, 400, responseJSON);
};

const getRecipes = (request, response, params) => {
  // return object with recipes

  const quickRecipies = {};
  // if quick param is true, only return recipes under certain time
  const temp = Object.values(recipes);
  if (params.quick) {
    temp.forEach((value) => {
      if (parseInt(value.time, 10) <= parseInt(params.time, 10)) {
        quickRecipies[value.name] = recipes[value.name];
      }
    });
    respondJSON(request, response, 200, quickRecipies);
  } else respondJSON(request, response, 200, recipes);
};

const addRecipe = (request, response, params) => {
  // add a recipe to the list

  // if missing paramters, return bad request
  if (!params.name || !params.ingredients || !params.instructions) {
    badRequest(request, response);
    return;
  }

  const responseJSON = {
    message: 'Recipe Created Successfully',
    id: 'Create',
  };

  let status = 201;
  // if a recipe with that name already exists, update the existing one
  if (recipes[params.name]) {
    status = 204;
  } else {
    recipes[params.name] = {};
  }

  // add recipe params to object
  recipes[params.name].name = params.name;
  recipes[params.name].time = params.time;
  recipes[params.name].ingredients = params.ingredients;
  recipes[params.name].instructions = params.instructions;

  respondJSON(request, response, status, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'Not Found',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  notFound,
  badRequest,
  getRecipes,
  addRecipe,
};
