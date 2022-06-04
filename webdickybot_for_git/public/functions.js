currentShapeID = 0;
currentBackgroundID = 0;
currentColorID = 0;
currentHatID = -1;

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += "active";

    if (tabName =="shapes") {
      var rad = document.shapeForm.shape;

      document.getElementById("shape " + currentShapeID).checked = true;

      var prev = null;
      for(var i = 0; i < rad.length; i++) 
      {
        rad[i].onclick = function () 
        {
          if(this !== prev) 
          {
            prev = this;
            currentShapeID = this.value;
            fading('0', true);
          }
        };
      }
    } else if (tabName =="colors") {
      var rad = document.colorForm.color;

      document.getElementById("color " + currentColorID).checked = true;

      var prev = null;
      for(var i = 0; i < rad.length; i++) 
      {
        rad[i].onclick = function () 
        {
          if(this !== prev) 
          {
            prev = this;
            currentColorID = this.value;
            fading('0', true);
          }
        };
      }
    } else if (tabName =="hats") {
      var rad = document.hatForm.hat;

      document.getElementById("hat " + currentHatID).checked = true;

      var prev = null;
      for(var i = 0; i < rad.length; i++) 
      {
        rad[i].onclick = function () 
        {
          if(this !== prev) 
          {
            prev = this;
            currentHatID = this.value;
            fading('0', true);
          }
        };
      }
    } else if (tabName =="bgs") {
      var rad = document.bgForm.bg;

      document.getElementById("bg " + currentBackgroundID).checked = true;

      for(var i = 0; i < rad.length; i++) 
      {
        rad[i].onclick = function () 
        {
          if(this !== prev) 
          {
            prev = this;
            currentBackgroundID = this.value;
            fading('0', true);
          }
        };
      }
    }

}

function resizeCanvas() {
  const outerCanvasContainer = document.getElementById('fabric-canvas-wrapper');

  const ratio = canvas.getWidth() / canvas.getHeight();
  const containerWidth = outerCanvasContainer.clientWidth;
  const scale = containerWidth / canvas.getWidth();
  const zoom = canvas.getZoom() * scale;

  canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
}
        

function fading(alpha, callfunc) 
{
  var fade= document.getElementById("overlay");

      if (alpha =="0") {
        fade.className = "fadingIn";
      }else{
        fade.className = "fadingOut";
      }
      
    if (callfunc==true) 
    {
      //fix ---- need to run only on first animation end
      fade.addEventListener('animationend', (event) => {
        if (event.animationName == "fadeIn") {
          generateImage(currentShapeID, currentBackgroundID, currentColorID, currentHatID);
        }
      });
    }
}

var SelfLoadingImage = fabric.util.createClass(fabric.Object, {
  initialize: function(src) {
      this.image = new Image();
      this.image.src = src;
      this.image.onload = (function() {
          this.width = this.image.width;
          this.height = this.image.height;
          this.loaded = true;
          this.setCoords();
          this.fire('image:loaded');
          canvas.renderAll();
      }).bind(this);
  },

  _render: function(ctx)
  {
      if (this.loaded) {
          ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
      }
  }
});

function spawnColors() {
  for(i=0;i<colors.length;i++)
  {
    var radiobox = document.createElement('input');
    radiobox.name = "color";
    radiobox.type = 'radio';
    radiobox.id = "color "+i;
    radiobox.value = i;

    var label = document.createElement("label");
    label.id = "colorLabel";
    var span = document.createElement("span");
    
    if (colors[i].length==1) 
    {
      span.style.backgroundColor = colors[i];
    } else if(colors[i].length==2)
    {
      span.style.background ='linear-gradient(180deg, '+colors[i][0]+' 0%, '+colors[i][1]+' 100%)';
    } else if(colors[i].length==3)
    {
      span.style.background ='linear-gradient(180deg, '+colors[i][0]+' 0%, '+colors[i][1]+' 50%, '+colors[i][2]+' 100%)';
    }

    var container = document.getElementById('colorForm');
    container.appendChild(label);
    label.appendChild(radiobox);
    
    label.appendChild(span);
  }
}

function spawnShapes() {
  for(i=0;i<bodyLibrary.length;i++)
  {
    var radiobox = document.createElement('input');
    radiobox.name = "shape";
    radiobox.type = 'radio';
    radiobox.id = "shape "+i;
    radiobox.value = i;

    var label = document.createElement("label");
    label.id = "shapeLabel";
    var span = document.createElement("span");
    
    span.style.backgroundImage = "url(" + bodyLibrary[i][2] +")";
    
    var container = document.getElementById('shapeForm');
    container.appendChild(label);
    label.appendChild(radiobox);
    
    label.appendChild(span);
  }
}

function spawnHats() {
  for(i=0;i<hats.length;i++)
  {
    var radiobox = document.createElement('input');
    radiobox.name = "hat";
    radiobox.type = 'radio';
    radiobox.id = "hat "+i;
    radiobox.value = i;

    var label = document.createElement("label");
    label.id = "hatLabel";
    var span = document.createElement("span");
    
    span.style.backgroundImage = "url(" + hats[i][3] +")";
    
    var container = document.getElementById('hatForm');
    container.appendChild(label);
    label.appendChild(radiobox);
    
    label.appendChild(span);
  }
}

function spawnBG() {
  for(i=0;i<backgrounds.length;i++)
  {
    var radiobox = document.createElement('input');
    radiobox.name = "bg";
    radiobox.type = 'radio';
    radiobox.id = "bg "+i;
    radiobox.value = i;

    var label = document.createElement("label");
    label.id = "bgLabel";
    var span = document.createElement("span");
    
    span.style.backgroundImage = "url(" + backgrounds[i][1] +")";
    
    var container = document.getElementById('bgForm');
    container.appendChild(label);
    label.appendChild(radiobox);
    
    label.appendChild(span);
  }
}

function generateImage(base, bg, col, hat) 
{
  canvas.clear();
  //background
  var img = new SelfLoadingImage(backgrounds[bg][0]);
  canvas.add(img)
  //color
  fabric.loadSVGFromURL(bodyLibrary[base][0], function(objects, options) 
  {
    var shape = fabric.util.groupSVGElements(objects, options);

      
    if (colors[col].length==1) {
        shape.set('fill', colors[col])
    } 
    else if (colors[col].length==2)
      {
        shape.set('fill', new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'pixels',
          coords: { x1: 0, y1: 0, x2: 0, y2: shape.height},
          colorStops:[
              { offset: 0, color: colors[col][0]},
              { offset: 1, color: colors[col][1]}
          ]
          }));
    } else if (colors[col].length==3)
      {
        shape.set('fill', new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'pixels',
          coords: { x1: 0, y1: 0, x2: 0, y2: shape.height},
          colorStops:[
              { offset: 0, color: colors[col][0]},
              { offset: 0.5, color: colors[col][1]},
              { offset: 1, color: colors[col][2]}
          ]
          }));
    }

    shape.set({
        left: 100,
        top: 100,
        width: 300,
    height: 351});

    canvas.insertAt(shape,1);
  });

  //outline and details
  var img = new SelfLoadingImage(bodyLibrary[base][1]);
  img.left = 100;
  img.top = 100;
  img.width= 300;
  img.height= 351;
  canvas.add(img);

  //hat
  if (hats[hat] != undefined) 
  {
    var img = new SelfLoadingImage(hats[hat][0]);
    img.left = hats[hat][1];
    img.top = hats[hat][2];
    
    canvas.add(img)
  }

  fading('1',false);
}

const canvas = new fabric.StaticCanvas('canvas',{
  width: 500,
  height: 450,
  selection: false,
  backgroundColor: '#F3F3F3'
});



spawnShapes();
spawnColors();
spawnHats();
spawnBG();

generateImage(currentShapeID, currentBackgroundID, currentColorID, currentHatID);
resizeCanvas();
window.addEventListener('resize', function(event) {
  resizeCanvas();
}, true);
canvas.requestRenderAll();