/* Conway's Life Game UI */
var stage = new Kinetic.Stage({
   container: 'conwayLayout',
   width: 940,
   height: 640
});

var layer = new Kinetic.Layer();
var lifeLayer = new Kinetic.Layer();

var anim;
var conway;

$(document).ready(function() {
   var rows = 30, columns = 45;
   conway = new Conway(rows, columns);
   var background = new Kinetic.Rect({
      x: 20,y: 20,
      width: (columns)*20+1, height: (rows)*20+1,
      fill: '#E9EAEE'
   });

   bindEvents();

   layer.add(background);
   stage.add(layer);
   stage.add(lifeLayer);

   drawMatrix(rows, columns);
});
function bindEvents() {
   // Events for creating matrix
   layer.on('click',layerClick);
   lifeLayer.on('click',layerClick);

   // jQuery Events
   $('#btnPlay').click(function(e) {
      $('#btnPlay').attr('disabled', 'true');
      $('#btnStop').removeAttr('disabled');
      $('#btnRestart').attr('disabled', 'true');
      $('#state').attr('class', 'label label-success');
      $('#state').html('Ejecutando');
      startConway();
   });
   $('#btnStop').click(function(e) {
      $('#btnPlay').removeAttr('disabled');
      $('#btnStop').attr('disabled', 'true');
      $('#btnRestart').removeAttr('disabled');
      $('#state').attr('class', 'label label-important');
      $('#state').html('Detenido');

      stopConway();
   });
   $('#btnRestart').click(function(e) {
      location.reload();
   });
   $('#inf391').click(function(e) {
      var info = "Nombre: Sergio Gabriel Guillen Mantilla\n"
      info += "Docente: Lic. Rosa Flores\n";
      info += "Materia: Inf-391";
      alert(info);
   });
}

function getLine(x1,y1,x2,y2) {
   var line = new Kinetic.Line({
      points: [x1,y1,x2,y2],
      stroke: 'gray',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round'
   });
   return line;
}
function drawMatrix(rows, columns) {
   rows++;columns++;
   for (i = 1; i<=rows; ++i) {
      layer.add(getLine(20,20*i,columns*20,20*i));
   }
   for (i = 1; i<=columns; ++i) {
      layer.add(getLine(20*i,20,20*i,rows*20));
   }
   layer.draw();
}
function layerClick() {
   var position = stage.getMousePosition();
   var j = Math.floor((position.x-20)/20);
   var i = Math.floor((position.y-20)/20);
   if (conway.get(i,j) === false) {
      conway.set(i,j,true);
      drawCell(i,j);
   } else {
      conway.set(i,j,false);
      killCell(i,j);
   }
   lifeLayer.draw();
}
function drawCell(i, j) {
   var r = new Kinetic.Rect({
      id:'cell_'+i+'_'+j,
      x: j*20+21,y: i*20+21,
      width: 18, height: 18,
      fill: 'red'
   });
   lifeLayer.add(r);
}
function killCell(i, j) {
   var lifeCell = lifeLayer.get('#cell_'+i+'_'+j)[0];
   if(lifeCell != null) {
      lifeCell.remove(lifeCell);
   }
}
function removeCells() {
   for(i = 0; i<conway.rows; ++i) {
      for(j = 0; j<conway.columns; ++j) {
         killCell(i,j);
      }
   }
}
function redrawLayer(frame) {
   removeCells();
   for(i = 0; i<conway.rows; ++i) {
      for(j = 0; j<conway.columns; ++j) {
         if(conway.get(i,j)) {
            drawCell(i,j);
         }
      }
   }
   lifeLayer.draw();
}
function printStage() {
   conway.nextStage();
   redrawLayer();
}
function startConway() {
   anim = setInterval(printStage, 100);
}
function stopConway() {
   clearInterval(anim);
}
