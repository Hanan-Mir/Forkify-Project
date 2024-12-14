import * as model from './model.js';
import recipeView from './views/recipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//Loading and rendering  a recipe
const getReciepes=async function(){
  try{
    
    let id=window.location.hash.slice(1);
    if(!id) return;
    //rendering spinner
    recipeView.renderSpinner();
//loading of recipe
await model.loadRecipe(id);
//getting recipe data
let {recipe}=model.state;
console.log(recipe);
//Render recipe
recipeView._render(recipe);
  
  }
  catch (err){
    alert(err);
  }
}
let events=['hashchange','load'];
events.forEach(el=>{
  window.addEventListener(el,getReciepes);
})