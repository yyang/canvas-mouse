(function(){

var points = [];
var instanceId = 0;
var pointImage, pointBlueImage, pointPinkImage;

function Point(data) {
  // Tracking all point 
  this.id = instanceId++;
  points[this.id] = this;
  this.data = data;
  this.sceneLoaction = Map.getSceneLocation(this.data.location);
  this.render();
}

$declare(Point, {
  render: function() {
    var location = this.sceneLoaction;
    if (this.data.type == 'subtopic')
      ctx.drawImage(pointImage, location.x - 10, location.y - 10, 20, 20);
    else if (this.data.type == 'concept')
      ctx.drawImage(pointBlueImage, location.x - 15, location.y - 15, 30, 30);
    else
      ctx.drawImage(pointPinkImage, location.x - 20, location.y - 20, 40, 40);
    ctx.font = "600 14px Open Sans";
    ctx.fillStyle = '#06266f';
    ctx.strokeStyle = '#5ccccc';
    
    if (this.data.type == 'subtopic') {
      ctx.strokeText(this.data.name, location.x + 14, location.y + 4);
      ctx.fillText(this.data.name, location.x + 14, location.y + 4);
    }
    else {
      ctx.strokeText(this.data.name, location.x + 19, location.y + 4);
      ctx.fillText(this.data.name, location.x + 19, location.y + 4);
    }
    this.box = {
      left: this.sceneLoaction.x - 8,
      right: this.sceneLoaction.x + 8,
      top: this.sceneLoaction.y - 8,
      bottom: this.sceneLoaction.y + 8
    }
  },

});

$define(Point, {
  __type: 'point',
  init: function() {
    pointImage = Point.renderImage();
    pointBlueImage = Point.renderBlueImage();
    pointPinkImage = Point.renderPinkImage();
  },
  renderImage: function() {
    // preset
    var image = document.createElement('canvas');
    image.width = 40;
    image.height = 40;
    var pointCtx = image.getContext('2d');
    // gradient
    var lingrad = pointCtx.createLinearGradient(0,4,0,36);
    lingrad.addColorStop(0, '#ccc');
    lingrad.addColorStop(1, '#fff');
    // path
    pointCtx.beginPath();
    pointCtx.arc(20, 20, 16, 0, 2*Math.PI);
    // style
    pointCtx.fillStyle = lingrad;
    pointCtx.lineWidth = 4;
    pointCtx.strokeStyle = "#999";
    // render
    pointCtx.stroke();
    pointCtx.fill();
    // result
    return image;
  },
  renderBlueImage: function() {
    var image = document.createElement('canvas');
    image.width = 60;
    image.height = 60;
    var pointCtx = image.getContext('2d');
    // gradient
    var lingrad = pointCtx.createLinearGradient(0,4,0,56);
    lingrad.addColorStop(0, '#2b4181');
    lingrad.addColorStop(1, '#133aac');
    // path
    pointCtx.beginPath();
    pointCtx.arc(30, 30, 26, 0, 2*Math.PI);
    // style
    pointCtx.fillStyle = lingrad;
    pointCtx.lineWidth = 4;
    pointCtx.strokeStyle = "#fff";
    // render
    pointCtx.stroke();
    pointCtx.fill();
    // result
    return image;
  },
  renderPinkImage: function() {
    var image = document.createElement('canvas');
    image.width = 80;
    image.height = 80;
    var pointCtx = image.getContext('2d');
    // gradient
    var lingrad = pointCtx.createLinearGradient(0,4,0,76);
    lingrad.addColorStop(0, '#b12c49');
    lingrad.addColorStop(1, '#ec0033');
    // path
    pointCtx.beginPath();
    pointCtx.arc(40, 40, 36, 0, 2*Math.PI);
    // style
    pointCtx.fillStyle = lingrad;
    pointCtx.lineWidth = 4;
    pointCtx.strokeStyle = "#fff";
    // render
    pointCtx.stroke();
    pointCtx.fill();
    // result
    return image;
  }
});

Dispatcher.register(Point);

$explict('Point', Point);
$explict('points', points);

})();