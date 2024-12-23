import icons from 'url:../../img/icons.svg';
export default class View{
    _data;
    render(data){
      console.log(data);
        if(!data || Array.isArray(data) && data.length===0) return this.renderError();
        this._data=data;
        console.log(this._data);
        let markup=this._generateMarkup();
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    update(data){
      this._data=data;
      let newMarkup=this._generateMarkup();
      const newDom=document.createRange().createContextualFragment(newMarkup);
      const newEl=Array.from(newDom.querySelectorAll('*'));
      const curEl=Array.from(this._parentEl.querySelectorAll('*'));
      newEl.forEach((el,i)=>{
        const currentEl=curEl[i];
        if(!el.isEqualNode(currentEl) && el.firstChild?.nodeValue.trim()!=='' ){
currentEl.textContent=el.textContent;
        }
        if(!el.isEqualNode(currentEl)){
          Array.from(el.attributes).forEach(attr=>{
            currentEl.setAttribute(attr.name,attr.value)
          })
        }
      })
      
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