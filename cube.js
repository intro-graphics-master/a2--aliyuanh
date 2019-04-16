
var canvas;
var gl;
var program; 
var cBuffer2;
var vBuffer2;
var cBuffer;
var vBuffer;
var vColor;
var vPosition;
var NumVertices  = 18;
var numHexVertices = 36;
var hexVertexPositions = [
    vec4(1/2,0,-.5/2,1),
    vec4(.5/2,.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

    vec4(1/2,.0,-.5/2,1),
    vec4(.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

    vec4(.5/2,-.866/2,-.5/2,1),
    vec4(-.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

    vec4(-1/2,.0,-.5/2,1),
    vec4(-.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

    vec4(-1/2,.0,-.5/2,1),
    vec4(-.5/2,.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

    vec4(-.5/2,.866/2,-.5/2,1),
    vec4(.5/2,.866/2,-.5/2,1),
    vec4(0,0,-.1,1),

//this forms the bottom part of the "hexagonal diamond"


    vec4(1/2,0,-.5/2,1),
    vec4(.5/2,.866/2,-.5/2,1),
    vec4(0,0,-.7,1),

    vec4(1/2,.0,-.5/2,1),
    vec4(.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.7,1),

    vec4(.5/2,-.866/2,-.5/2,1),
    vec4(-.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.7,1),
 
    vec4(-1/2,.0,-.5/2,1),
    vec4(-.5/2,-.866/2,-.5/2,1),
    vec4(0,0,-.7,1),

    vec4(-1/2,.0,-.5/2,1),
    vec4(-.5/2,.866/2,-.5/2,1),
     vec4(0,0,-.7,1),

    vec4(-.5/2,.866/2,-.5/2,1),
    vec4(.5/2,.866/2,-.5/2,1),
    vec4(0,0,-.7,1),
 ];
var hexVertexColors = [
    [1,0,0,1],
    [0,1,0,1],
    [0,0,1,1],

    [1,1,1,1],
    [0,1,0,1],
    [0,0,1,1],

    [1,0,0,1],
    [0,1,.5,1],
    [0,0,1,1],

    [1,0,0,1],
    [0,1,0,1],
    [1,0,1,1],

    [1,0,0,1],
    [0,1,0,1],
    [0,.5,1,1],

    [1,0,0,1],
    [.4,1,0,1],
    [0,0,1,1],

    [.1,0,0,1],
    [0,.8,0,1],
    [0,0,1,1],

    [1,0,0,1],
    [0,.3,0,1],
    [0,.5,1,1],

    [1,0,0,1],
    [0,1,0,1],
    [0,.1,1,1],

    [1,0,0,1],
    [0,.5,0,1],
    [0,0,1,1],

    [1,0,0,1],
    [0,1,0,1],
    [0,0,1,1],

    [1,0,0,1],
    [0,1,0,1],
    [0,0,1,1],
];
                                   // For each face of the cube, make two triangles of three vertices each:
var vertexPositions = [
    vec4( -0.5, 0.5, 0.5, 1 ),
    vec4( -0.5, -0.5, 0.5, 1 ),
    vec4( 0.5, -0.5, 0.5, 1 ),
    vec4( -0.5, 0.5, 0.5, 1 ),
    vec4( 0.5, -0.5, 0.5, 1 ),
    vec4( 0.5, 0.5, 0.5, 1 ),

    vec4(-0.5,-0.5,0.5,1), //left triangle
    vec4(-0.5,0.5,0.5,1),
    vec4(0.0,0.0,0.0,1),

    vec4(-0.5,-0.5,0.5,1),//bottom triangle
    vec4(0.5,-0.5,0.5,1),
    vec4(0.0,0.0,0.0,1),

    vec4(0.5,0.5,0.5,1), //right triangle
    vec4(0.5,-0.5,0.5,1),
    vec4(0.0,0.0,0.0,1),

    vec4(0.5,0.5,0.5,1),//top triangle 
    vec4(-0.5,0.5,0.5,1),//change vertex 1 and 3 
    vec4(0.0,0.0,0.0,1)

];

var vertexColors = [

    [-0.5, 0.5, 0.5, 1 ],
    [-0.5, -0.5, 0.5, 1 ],
    [ 0.5, -0.5, 0.5, 1 ],
    [-0.5, 0.5, 0.5, 1 ],
    [0.5, -0.5, 0.5, 1 ],
    [ 0.5, 0.5, 0.5, 1 ],

    [-0.5,-0.5,0.5,1],//left triangle 
    [-0.5,0.5,0.5,1],
    [0.0,0.0,0.0,1],

    [-0.5,-0.5,0.5,1], //bottom triangle 
    [0.5,-0.5,0.5,1],
    [0.0,0.0,0.0,1],

    [1,0,0,1],//right triangle 
    [0.5,-0.5,0.5,1],
    [1.0,0.0,0.0,1],
    
    [0.0,1.0,0.0,1],//top triangle 
    [-0.5,0.5,0.5,1],
    [0.0,1.0,0.0,1],

//new shit above -- use these colors as reference 
    [ 1.0, 0.0, 0.0, 1.0 ], // red
    [ 1.0, 0.0, 0.0, 1.0 ],
    [ 1.0, 0.0, 0.0, 1.0 ],
    [ 1.0, 0.0, 0.0, 1.0 ],
    [ 1.0, 0.0, 0.0, 1.0 ],
    [ 1.0, 0.0, 0.0, 1.0 ],

    [ 1.0, 1.0, 0.0, 1.0 ], // yellow
    [ 1.0, 1.0, 0.0, 1.0 ],
    [ 1.0, 1.0, 0.0, 1.0 ],

    [ 0.0, 1.0, 0.0, 1.0 ], // green
    [ 0.0, 1.0, 0.0, 1.0 ],
    [ 0.0, 1.0, 0.0, 1.0 ],

    [ 0.0, 1.0, 1.0, 1.0 ], // cyan
    [ 0.0, 1.0, 1.0, 1.0 ],
    [ 0.0, 1.0, 1.0, 1.0 ],

    [ 0.0, 0.0, 1.0, 1.0 ], // blue
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],

    [ 1.0, 0.0, 1.0, 1.0 ], // magenta
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ]
];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexPositions), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexVertexColors), gl.STATIC_DRAW);

    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexVertexPositions), gl.STATIC_DRAW);
    
    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
        
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);
    //draw the pyramid with a seam 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices);

    //draw the hexagonal pyramid 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.LINE_STRIP, 0, numHexVertices );
    
    requestAnimFrame( render );
}
