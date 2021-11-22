$(document).ready(function() {

    const dot = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#c0c0c0" class="bi bi-dot" viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>';
    const activeDot = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#bcd601" class="bi bi-dot" viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>';

    let selected = null;
    loadData();
    
    function loadData(){
        for (let index = 0; index < dataDiagram.length; index++) {
            $(`#element-${index+1}-label`).html(dataDiagram[index].step);
            $(`#element-${index+1}`).html(dataDiagram[index].name);
        }
    }

    $(`button[id^='element-']`).click(function(e) {
        removeClassAll();
        selected = e.target.id.substr(-1);
        $(`#element-${selected}`).addClass("active");
        for (let index = 0; index < dataDiagram[selected-1].steps.length; index++) {
            $(`#menu-dot-${index+1}`).html(dot);
            $(`#menu-text-${index+1}`).html(dataDiagram[selected-1].steps[index].name);           
        }
        removeClassSelection();
    });

    $(`a[id^='menu-text-']`).click(function(e) {
        removeClassSelection();
        let item = e.target.id.substr(-1);
        $(`#menu-text-${item}`).addClass("active-selected");
        $(`#menu-dot-${item}`).html(activeDot);
        $(`#title-d`).html(dataDiagram[selected-1].steps[item-1].name)
        $(`#text-d`).html(dataDiagram[selected-1].steps[item-1].text)
        $(`#img-d`).attr("src",dataDiagram[selected-1].steps[item-1].img);

    });

    function removeClassSelection(){
        if(selected != null){
            for (let index = 0; index < dataDiagram[selected-1].steps.length; index++) {
                $(`#menu-dot-${index+1}`).html(dot);
                $(`#menu-text-${index+1}`).removeClass("active-selected");
            }
        }
    }

    function removeClassAll(){
        for (let index = 0; index <= 6; index++) {
            $(`#menu-text-${index+1}`).empty();
            $(`#menu-dot-${index+1}`).empty();
            $(`#element-${index+1}`).removeClass("active");
        }
    }


    var pageWidth, pageHeight;

var basePage = {
  width: 1366,
  height: 627,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};

$(function(){
  var $page = $('.diagram-content');
  
  getPageSize();
  scalePages($page, pageWidth, pageHeight);
  
  //using underscore to delay resize method till finished resizing window
  $(window).resize(_.debounce(function () {
    getPageSize();            
    scalePages($page, pageWidth, pageHeight);
  }, 150));
  

function getPageSize() {
  pageHeight = $('.container-diagram').height();
  pageWidth = $('.container-diagram').width();
}

function scalePages(page, maxWidth, maxHeight) {            
  var scaleX = 1, scaleY = 1;                      
  scaleX = maxWidth / basePage.width;
  scaleY = maxHeight / basePage.height;
  basePage.scaleX = scaleX;
  basePage.scaleY = scaleY;
  basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

  var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
  var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));

  page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
}
});
});