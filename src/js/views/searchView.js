import View from "./view";
class SearchView extends View{
_parentEl=document.querySelector('.search');
getQuery(){
    const result=`${this._parentEl.querySelector('.search__field').value}`;  
   
    return result;
}
addHandlerSearch(handler){
    this._parentEl.addEventListener('click',function(e){
e.preventDefault();
this.clear;
        handler();

    })
}
_clearSearchFeild(){
    this._parentEl.querySelector('.search__feild').value='';
}
}
export default new SearchView();