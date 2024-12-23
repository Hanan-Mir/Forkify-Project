import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import View from './views/view.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//Loading and rendering  a recipe
const getRecipes=async function(){
  try{
    
    let id=window.location.hash.slice(1);
    if(!id) return;
    //rendering spinner
    recipeView.renderSpinner();
//loading of recipe
await model.loadRecipe(id);
//getting recipe data
let {recipe}=model.state;
//Render recipe
recipeView.render(recipe);
  }
  catch (err){
    console.log(err);
    recipeView.renderError();
  }
}
let searchAllRecipes=async function(){
  try{

    let userInput=searchView.getQuery();
 
  if(!userInput) return;
  resultsView.renderSpinner();
 await model.loadRecipeSearchResults(userInput);
 let displayPerPage=model.recipiesPerPage();
  resultsView.render(displayPerPage);
  paginationView.render(model.state.search);
}
catch(err){
  resultsView.renderError();
}

}
let controlPagination=function(gotopage){
  console.log(gotopage);
  let displayPerPage=model.recipiesPerPage(gotopage);
  resultsView.render(displayPerPage);
  paginationView.render(model.state.search);

}
let controlServings=function(newServings){
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);

}
let controlBookmark=function(){
  recipeView.update(model.state.recipe);
if(model.state.recipe.bookmarked){
  model.removeBookmarks(model.state.recipe.id);
}
else{
  model.addBookmarks(model.state.recipe);
}
console.log(model.state.recipe);
recipeView.update(model.state.recipe);
bookmarkView.render(model.state.bookmarks);
}
let controlBookmarkStorage=function(){
  let data=model.getBrowserStorage();
  bookmarkView.render(data);
}
let controlUploadRecipe=async function(data){
  await model.sendRecipeData(data);
 console.log(model.state.recipe);
 model.addBookmarks(model.state.recipe);

window.history.pushState(null,'',`#${model.state.recipe.id}`);
setTimeout(function(){
  addRecipeView.toggleAddRecipe();
},2000)
recipeView.render(model.state.recipe);
bookmarkView.render(model.state.bookmarks);
}
let init=function(){
  recipeView.addHandlerRender(getRecipes);
  searchView.addHandlerSearch(searchAllRecipes);
  paginationView.handlerClickBtn(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  bookmarkView.addHandlerBookmark(controlBookmarkStorage);
  addRecipeView.addHandlerSubmitRecipe(controlUploadRecipe);
}
init();