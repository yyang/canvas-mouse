(function(){

var canvas, canvasStyle, canvasActionStyle, ctx;
var scene = {};

function Context(){}

$define(Context, {
  __type: 'context',
  
  init: function() {
    // Initiate map variables
    canvas = $I('map-scene');
    ctx = canvas.getContext ? canvas.getContext('2d') : null;
    canvasStyle = new StyleSheet();
    canvasActionStyle = new StyleSheet();

    // Setting map parameters
    Map.init({left: -0.2, right: 1.2, top: -0.2, bottom: 1.2});
    Context.resize();
    //Context.setCanvas();
    //window.addEventListener('resize', Context.setCanvas, false);

    $explict('ctx', ctx);

    canvas.addEventListener('mousemove', function(evt){
      //console.log(evt);
      for (var i = 0; i < points.length; i++) {
        if (evt.offsetX < points[i].box.right && evt.offsetX > points[i].box.left && evt.offsetY < points[i].box.bottom && evt.offsetY > points[i].box.top) {
          canvasActionStyle.clear().appendRule('#map-scene', {
            cursor: 'pointer'
          });
          return;
        }
      }
      canvasActionStyle.clear();
    }, false);

    canvas.addEventListener('click', function(evt){
      //console.log(evt);
      for (var i = 0; i < points.length; i++) {
        if (evt.offsetX < points[i].box.right && evt.offsetX > points[i].box.left && evt.offsetY < points[i].box.bottom && evt.offsetY > points[i].box.top) {
          ChatCard.switchTo(points[i].data.uri);
          //Chat.initiateChat(points[i].data.parent, [points[i].data.uri]);
          return;
        }
      }
    }, false);

  },
  resize: function() {
    var size = Map.getCanvasSize();
    canvas.height = size.height;
    canvas.width = size.width;
    canvasStyle.clear().appendRule('#map-scene', {
        height : size.displayHeight,
        width : size.displayWidth
      });
    ctx.scale(size.pixelRatio, size.pixelRatio);  

    prepareData();
  }
});

Dispatcher.register(Context);


})();


var boxes = [];




