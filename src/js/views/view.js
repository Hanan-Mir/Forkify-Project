import icons from 'url:../../img/icons.svg';
export default class View{
    _data;
    render(data){
        if(!data || Array.isArray(data) && data.length===0) return this.renderError();
        this._data=data;
        let markup=this._generateMarkup();
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    clear(){
        this._parentEl.innerHTML='';
      }
      renderSpinner(){
          let html=`<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin',html);
      }
        renderError(message=this._message){
  const markup=`<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
          this.clear();
          this._parentEl.insertAdjacentHTML('afterbegin',markup);
}
}