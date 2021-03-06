import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    // 1. Updating resultsView to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    // loadRecipe is an async fn, thus, it returns a promise which should be awaited
    // one async fn calls another async fn
    await model.loadRecipe(id);

    // 3. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
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
  // 1. Add/remove bookmark
  if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks list
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Close form window
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC);

    // Success message
    addRecipeView.renderMsg();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the url without reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error('????', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
