import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for pollyfilling everything else
import 'regenerator-runtime/runtime'; // for pollyfilling aync await only

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    // loadRecipe is an async fn, thus, it returns a promise which should be awaited
    // one async fn calls another async fn
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// We want to load the recipe in these 2 cases:
// either when 'hashchange' is emitted which means that recipe has changed,
// or when the app is opened with the recipe id in the url ('load' event)

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
