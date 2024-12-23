import { API_URL,REC_PER_PGE,KEY } from "./config";
import { getJson,sendJson } from "./helpers";
export let state={
    recipe:{},
    search:{
      query:'',
      page:1,
      RecipesPerPage:REC_PER_PGE,
      recipes:[]
    },
    bookmarks:[],
}
export let loadRecipe= async function(id)
{
  try{
let data=await getJson(`${API_URL}/${id}?key=${KEY}`);
  let {recipe} =data.data;
  let recipeKey=data.data.recipe.key;
 state.recipe={
    id:recipe.id,
    ingredients:recipe.ingredients,
    publisher:recipe.publisher,
    title:recipe.title,
    servings:recipe.servings,
    sourceUrl:recipe.source_url,
    imageUrl:recipe.image_url,
    ingredients:recipe.ingredients,
    cookingTime:recipe.cooking_time,
    ...(recipeKey&&{key:recipeKey}),
  }
  state.bookmarks.some(el=>{
    if(el.id===id){
      state.recipe.bookmarked=true;
    }

  })
  }
  catch(err){
  throw err;
  }
}
export let loadRecipeSearchResults=async function(query){
try{
let data=await getJson(`${API_URL}?search=${query}&key=${KEY}`);
console.log(data);
state.search.recipes=data.data.recipes.map(recipe=>{
  return {
  id:recipe.id,
  imageUrl:recipe.image_url,
  publisher:recipe.publisher,
  title:recipe.title,
  key:recipe.key
}});
state.search.query=query;
state.search.page=1;
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
export let addBookmarks=function(recipe){
state.bookmarks.push(recipe);
if(recipe.id===state.recipe.id) state.recipe.bookmarked=true;
setbrowserStorage();
}
export let removeBookmarks=function(id){
  let index=state.bookmarks.findIndex(el=>el.id===id);
  console.log(index);
  state.bookmarks.splice(index,1);
  console.log(state.bookmarks);
  if(state.recipe.id===id) state.recipe.bookmarked=false;
}
let setbrowserStorage=function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}
export let getBrowserStorage=function(){
  let data=localStorage.getItem('bookmarks');
  return JSON.parse(data);
}
export let sendRecipeData=async function(recipeToUpload){
  console.log(recipeToUpload);
  try{
    const ingredients=Object.entries(recipeToUpload).filter(el=>el[0].startsWith('ingredient') && el[1]!=="").map(ing=>{
  const ingArr=ing[1].replaceAll(' ','').split(',')
  if(ingArr.length!==3){
  throw new Error(`Format you have entered is not correct please provide the correct format for data`);
  }
  const [quantity,unit,description]=ingArr;
return {quantity:quantity?+quantity:null,unit,description};
  })
  const recipe={
    title:recipeToUpload.title,
    source_url:recipeToUpload.sourceUrl,
    image_url:recipeToUpload.image,
    publisher:recipeToUpload.publisher,
    cooking_time:recipeToUpload.cookingTime,
    servings:recipeToUpload.servings,
    ingredients
  }
const data=await sendJson(`${API_URL}/?key=${KEY}`,recipe);
console.log(data);
let recipeID=data.data.recipe.id;
let recipeKey=data.data.recipe.key;
state.recipe={
  id:recipeID,
ingredients:recipe.ingredients,
publisher:recipe.publisher,
title:recipe.title,
servings:recipe.servings,
sourceUrl:recipe.source_url,
imageUrl:recipe.image_url,
ingredients:[...recipe.ingredients],
cookingTime:recipe.cooking_time,
...(recipeKey&&{key:recipeKey})
}
//addBookmarks(state.recipe);
}
  catch(err){
    throw err;
  }
}
const init=function(){
  const storage=localStorage.getItem('bookmarks');
  if(storage) state.bookmarks=JSON.parse(storage);
  
}
init();
console.log(state.bookmarks);