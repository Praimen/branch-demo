
var $container = $("#container"),
  gridWidth = 196,
  gridHeight = 99,
  gridRows = 6,
  gridColumns = 5,
  gridTileType = "",
  rowCount = 0,
  branchTilesEnabled = true,
  i, x, y,
  posArr = [];


for (i = 0; i < gridRows * gridColumns; i++) {
  var columnCount = (i % gridColumns);

  if(columnCount == 0){
    rowCount++;
  }
  var htmlGridDiv = "<div class='branch branch-row-"+rowCount+" branch-col-"+(columnCount + 1) +"'><h4></h4><input type='text'/></div>";
  y = Math.floor(i / gridColumns) * gridHeight;
  x = (i * gridWidth) % (gridColumns * gridWidth);
  /*$(htmlGridDiv).css({position:"absolute", border:"1px solid #454545", width:gridWidth+1, height:gridHeight+1, top:y, left:x}).prependTo($container);*/
  $(htmlGridDiv).data({'pos':{x:(columnCount + 1),y:rowCount}}).css({position:"relative",float:"left", border:"1px dotted #fafafa",margin:"-2px", width:gridWidth+1, height:gridHeight+1}).appendTo($container);

}


function setGridTile(){

  for (var i = 0; i < posArr.length; i++) {
    var posObj = posArr[i];


    var gridTileCol = ".branch-col-" + posObj.x;
    var gridTileRow = ".branch-row-" + posObj.y;

    var gridTileSelector = $(".branch" + gridTileCol + gridTileRow);
    var gridTileTypeData = function () {
      return gridTileSelector.data('tileType')
    };
    if (gridTileSelector.data('tileType') != undefined) {
      gridTileSelector.removeClass(gridTileTypeData());
    }

    gridTileSelector.data('tileType', gridTileType);

    gridTileSelector.addClass(gridTileTypeData());

  }

}


function setGridTileType(tileType){
  gridTileType = tileType;
}

function toggleInput(selector) {
  $(selector).find('input').addClass("showInput");
}

function commitInput(selector){
  $(selector).parent('.branch').find('h4').text($(selector).val());
  $(selector).removeClass('showInput');
}


$(function() {

  $('.tileState').on('change',function(evt){
    branchTilesEnabled = $(this).prop('checked');
  });

  $container.on("click",".branch",function(evt){
    evt.stopImmediatePropagation();

    posArr.length = 0;
    posArr[0] = $(evt.target).data("pos");

    //set the grid coordinates
    if(branchTilesEnabled && $(evt.target).hasClass('branch')){
      console.log(evt.target);
      setGridTile();
    }



  }).on("dblclick",".branch",function(evt){
   if(!branchTilesEnabled){
     toggleInput(evt.target);
     $(evt.target).find('input.showInput').focus();
   }



  }).on("keyup","input.showInput",function( evt ) {
    console.log(evt.which);
    if ( evt.which == 13 ) {
      evt.preventDefault();
      commitInput(evt.target);
    }

  }).on("focusout","input.showInput",function( evt ) {

    commitInput(evt.target);

  });


  $('.tileState').bootstrapToggle('on');
});
