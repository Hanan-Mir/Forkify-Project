import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
_parentEl=document.querySelector('.pagination');

_generateMarkup(){
    console.log('comming from pagination');
    console.log(this._data);
    let numOfPages=Math.ceil(this._data.recipes.length/this._data.RecipesPerPage);
    console.log(numOfPages);
//if we are on page one and there are other pages
if(this._data.page===1 && numOfPages>1){
    console.log('Page 1');
return `<button data-page=${this._data.page+1} class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
}
//if we are not on page 1 and there are other pages
if(this._data.page>1 && this._data.page<numOfPages){
    console.log('Page 2');
return `<button data-page=${this._data.page-1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
          </button>
          <button data-page=${this._data.page+1} class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
}
//if we are at the last page 
if(this._data.page===numOfPages){
    console.log('page 3');
return `<button data-page=${this._data.page-1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
          </button>`;
}
//if there is only one page
return ``;

}
handlerClickBtn(handler){
this._parentEl.addEventListener('click',function(e){
    let btn=e.target.closest('.btn--inline');
    if(!btn) return;
    let moveTOPage=+btn.dataset.page;
    handler(moveTOPage);
    console.log(moveTOPage);
})

}




}
export default new PaginationView();