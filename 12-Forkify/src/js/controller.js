import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // for pollyfilling everything else
import 'regenerator-runtime/runtime'; // for pollyfilling aync await only
import { async } from 'regenerator-runtime';

// Hot module reloading (Parcel code)
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0. Updating resultsView to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    // loadRecipe is an async fn, thus, it returns a promise which should be awaited
    // one async fn calls another async fn
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);

    // 2. Load the Spinner
    resultsView.renderSpinner();

    // 3. Load search results
    await model.loadSearchResults(query);

    // 4. Render INITIAL results
    console.log(model.state.search);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 5. Render INITIAL pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log('Pag controller');
  console.log(goToPage);

  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render NEW pagination buttons
  console.log(model.state.search);
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings (in state)
  model.updateServings(newServings);

  // Update view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);

  console.log(model.state.recipe.bookmarked);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
