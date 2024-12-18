import View from "./view";
import icons from 'url:../../img/icons.svg';
class ResultsView extends View{
_parentEl=document.querySelector('.results');
_message=`The recipe you are looking for is not available.Please search for other recipe :).`;
_generateMarkup(){
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
}
_generateMarkupPreview(result){
    return `
    <li class="preview">
            <a class="preview__link " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `
}
}
export default new ResultsView();