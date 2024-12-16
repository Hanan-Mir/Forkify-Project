import { API_URL,REC_PER_PGE } from "./config";
import { getJson } from "./helpers";
export let state={
    recipe:{},
    search:{
      query:'',
      page:1,
      RecipesPerPage:REC_PER_PGE,
      recipes:[]
    }
}
export let loadRecipe= async function(id)
{
  try{
let data=await getJson(`${API_URL}/${id}`);
  let {recipe} =data.data;
 state.recipe={
    id:recipe.id,
    ingredients:recipe.ingredients,
    publisher:recipe.publisher,
    title:recipe.title,
    servings:recipe.servings,
    sourceUrl:recipe.source_url,
    imageUrl:recipe.image_url,
    ingredients:recipe.ingredients,
    cookingTime:recipe.cooking_time
  }
  }
  catch(err){
  throw err;
  }
}
export let loadRecipeSearchResults=async function(query){
try{
let data=await getJson(`${API_URL}?search=${query}`);
state.search.recipes=data.data.recipes.map(recipe=>{
  return {
  id:recipe.id,
  imageUrl:recipe.image_url,
  publisher:recipe.publisher,
  title:recipe.title
}});
state.search.query=query;
state.search.page=1;
console.log(state);
}
catch(err){
  console.log(err);
throw err;
}

}
export let recipiesPerPage=function(page=state.search.page){
  state.search.page=page;
  let startPage=(page-1)*state.search.RecipesPerPage;
  let endPage=page*state.search.RecipesPerPage;
  return state.search.recipes.slice(startPage,endPage);
}
export let updateServings=function(newServings){
  state.recipe.ingredients.forEach(ing=>{
    ing.quantity=ing.quantity*state.recipe.servings/newServings;
  })
  state.recipe.servings=newServings;
}