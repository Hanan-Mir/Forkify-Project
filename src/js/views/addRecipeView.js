import View from "./view";
class AddRecipeView extends View{
_parentEl=document.querySelector('.upload');
_addRecipeWindow=document.querySelector('.add-recipe-window');
_overlayWindow=document.querySelector('.overlay');
_uploadBtn=document.querySelector('.upload__btn');
_addRecipeBtn=document.querySelector('.nav__btn--add-recipe');
_closeBtn=document.querySelector('.btn--close-modal');
_message='The recipe was sucessfully uploaded...';

constructor(){
    super();
    this.addHandlerDisplay();
    this.addHandlerHideDisplay();
}
toggleAddRecipe(){
    this._addRecipeWindow.classList.toggle('hidden');
    this._overlayWindow.classList.toggle('hidden');
}

addHandlerDisplay(){
    this._addRecipeBtn.addEventListener('click',this.toggleAddRecipe.bind(this));
}
addHandlerHideDisplay(){
    this._overlayWindow.addEventListener('click',this.toggleAddRecipe.bind(this));
    this._closeBtn.addEventListener('click',this.toggleAddRecipe.bind(this));
}
addHandlerSubmitRecipe(handler){
    this._parentEl.addEventListener('submit',function(e){
        e.preventDefault()
const data =[...new FormData(this)]
const uploadedRecipeObject=Object.fromEntries(data);
handler(uploadedRecipeObject);
    })
}
}
export default new AddRecipeView();