export let state={
    recipe:{}
}
export let loadRecipe= async function(id)
{
    let response=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
  let data=await response.json();
if(!response.ok) throw new Error(`${response.status},${data.message}`);
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

  console.log(response,data);
  console.log(state.recipe);

}