export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// this function does not return anything, it just changes the state object
// by creating the recipe inside of it
// thus, we say it has the 'side effect'

// This async fn calls another async fn --> getJSON()
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // const recipe = data.data.recipe;
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Adding bookmarks to the loaded recipes
    // If we added a bookmark in the past, and decide to come back to it later,
    // bookmarked property will be set to true
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(data);
    console.log(state.recipe);
  } catch (err) {
    console.error(`Model ${err}`);
    // propagating error down from async fn in model.js --> to async fn in controller.js
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.error(`Model ${err}`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQnt = 2 * 5 / 4 = 2.5
    // newQnt = oldQnt * newServings / oldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
