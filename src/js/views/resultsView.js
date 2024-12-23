import View from "./view";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";
class ResultsView extends View{
_parentEl=document.querySelector('.results');
_message=`The recipe you are looking for is not available.Please search for other recipe :).`;
_generateMarkup(){
    console.log(this._data);
    return this._data.map(results=>previewView._generateMarkupPreview(results)).join('');
}
}
export default new ResultsView();