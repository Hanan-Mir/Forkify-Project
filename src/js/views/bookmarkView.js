import View from "./view";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";
class BookmarkView extends View{
    _parentEl=document.querySelector('.bookmarks__list');
    _message=`Look for a nice recipe and bookmark that :).`;
    _generateMarkup(){
        return this._data.map(bookmark=>previewView._generateMarkupPreview(bookmark)).join('');
    }
    addHandlerBookmark(handler){
        window.addEventListener('load',handler);
    }
    }
    export default new BookmarkView();