/* global THREE */

//speed
var moveTime=60//frames

//colors
var red=0xFF0000
var green=0x00FF00
var blue=0x0000FF
var yellow=0xFFFF00
var orange=0xFF7F00
var white=0xFFFFFF
var blank=0x000000

//for box construct
var faceList="rludfb"
var axisList="xyz"
var facePosition={
	r:{x:1,y:0,z:0},
	l:{x:-1,y:0,z:0},
	u:{x:0,y:1,z:0},
	d:{x:0,y:-1,z:0},
	f:{x:0,y:0,z:1},
	b:{x:0,y:0,z:-1},
}
var faceRotate={
	r:new THREE.Quaternion(0,1,0,1).normalize(),
	l:new THREE.Quaternion(0,-1,0,1).normalize(),
	u:new THREE.Quaternion(-1,0,0,1).normalize(),
	d:new THREE.Quaternion(1,0,0,1).normalize(),
	f:new THREE.Quaternion(0,0,0,1).normalize(),
	b:new THREE.Quaternion(1,0,0,0).normalize(),
}

//for cube construct
var colorList=[
	[//-1
		["xlxdxb","xlxdxx","xlxdfx"],//-1
		["xlxxxb","xlxxxx","xlxxfx"],//0
		["xluxxb","xluxxx","xluxfx"] //1
	],
	[//0
		["xxxdxb","xxxdxx","xxxdfx"],//-1
		["xxxxxb","xxxxxx","xxxxfx"],//0
		["xxuxxb","xxuxxx","xxuxfx"] //1
	],
	[//1
		["rxxdxb","rxxdxx","rxxdfx"],//-1
		["rxxxxb","rxxxxx","rxxxfx"],//0
		["rxuxxb","rxuxxx","rxuxfx"] //1
	]
]

var directionRotate=[
	new THREE.Quaternion(0,0,0,1).normalize(),
	new THREE.Quaternion(0,-1,0,1).normalize(),
	new THREE.Quaternion(0,1,0,0).normalize(),
	new THREE.Quaternion(0,1,0,1).normalize(),
	
	new THREE.Quaternion(1,1,1,1).normalize(),
	new THREE.Quaternion(0,0,1,1).normalize(),
	new THREE.Quaternion(-1,-1,1,1).normalize(),
	new THREE.Quaternion(1,1,0,0).normalize(),
	
	new THREE.Quaternion(-1,-1,-1,1).normalize(),
	new THREE.Quaternion(0,1,1,0).normalize(),
	new THREE.Quaternion(-1,1,1,1).normalize(),
	new THREE.Quaternion(-1,0,0,1).normalize(),
	
	new THREE.Quaternion(-1,0,1,0).normalize(),
	new THREE.Quaternion(1,0,0,0).normalize(),
	new THREE.Quaternion(1,0,1,0).normalize(),
	new THREE.Quaternion(0,0,1,0).normalize(),
	
	new THREE.Quaternion(1,-1,0,0).normalize(),
	new THREE.Quaternion(-1,1,-1,1).normalize(),
	new THREE.Quaternion(0,0,-1,1).normalize(),
	new THREE.Quaternion(1,-1,-1,1).normalize(),
	
	new THREE.Quaternion(0,1,-1,0).normalize(),
	new THREE.Quaternion(1,1,-1,1).normalize(),
	new THREE.Quaternion(1,0,0,1).normalize(),
	new THREE.Quaternion(1,-1,1,1).normalize(),
]
var directionPosition=[
	"xyz","Zyx","XyZ","zyX",
	"zxy","Yxz","ZxY","yxZ",
	"yzx","Xzy","YzX","xzY",
	"ZYX","xYZ","zYx","XYz",
	"YXZ","zXY","yXz","ZXy",
	"XZY","yZX","xZy","YZx",
]
var directionColor=[
	"rludfb","bfudrl","lrudbf","fbudlr",
	"fbrlud","durlfb","bfrldu","udrlbf",
	"udfbrl","lrfbud","dufblr","rlfbdu",
	"bfdulr","rldubf","fbdurl","lrdufb",
	"dulrbf","fblrdu","udlrfb","bflrud",
	"lrbfdu","udbflr","rlbfud","dubfrl",
]
var colorToDirection={
	"rludfb":0,"bfudrl":1,"lrudbf":2,"fbudlr":3,
	"fbrlud":4,"durlfb":5,"bfrldu":6,"udrlbf":7,
	"udfbrl":8,"lrfbud":9,"dufblr":10,"rlfbdu":11,
	"bfdulr":12,"rldubf":13,"fbdurl":14,"lrdufb":15,
	"dulrbf":16,"fblrdu":17,"udlrfb":18,"bflrud":19,
	"lrbfdu":20,"udbflr":21,"rlbfud":22,"dubfrl":23,
	"--udfb":0,"--udrl":1,"--udbf":2,"--udlr":3,
	"--rlud":4,"--rlfb":5,"--rldu":6,"--rlbf":7,
	"--fbrl":8,"--fbud":9,"--fblr":10,"--fbdu":11,
	"--dulr":12,"--dubf":13,"--durl":14,"--dufb":15,
	"--lrbf":16,"--lrdu":17,"--lrfb":18,"--lrud":19,
	"--bfdu":20,"--bflr":21,"--bfud":22,"--bfrl":23,
	"rl--fb":0,"bf--rl":1,"lr--bf":2,"fb--lr":3,
	"fb--ud":4,"du--fb":5,"bf--du":6,"ud--bf":7,
	"ud--rl":8,"lr--ud":9,"du--lr":10,"rl--du":11,
	"bf--lr":12,"rl--bf":13,"fb--rl":14,"lr--fb":15,
	"du--bf":16,"fb--du":17,"ud--fb":18,"bf--ud":19,
	"lr--du":20,"ud--lr":21,"rl--ud":22,"du--rl":23,
	"rlud--":0,"bfud--":1,"lrud--":2,"fbud--":3,
	"fbrl--":4,"durl--":5,"bfrl--":6,"udrl--":7,
	"udfb--":8,"lrfb--":9,"dufb--":10,"rlfb--":11,
	"bfdu--":12,"rldu--":13,"fbdu--":14,"lrdu--":15,
	"dulr--":16,"fblr--":17,"udlr--":18,"bflr--":19,
	"lrbf--":20,"udbf--":21,"rlbf--":22,"dubf--":23,
	"rl----":0,"bf----":1,"lr----":2,"fb----":3,"du----":5,"ud----":7,
	"--fb--":8,"--du--":12,"--lr--":16,"--bf--":20,"--ud--":0,"--rl--":5,
	"----bf":13,"----rl":14,"----fb":15,"----du":17,"----ud":19,"----lr":21,
	"------":0
}
/*
directionList
+------+------+------+------+
|   y  |   y  |   y  |   y  |
|     x|    -z|    -x|     z|
| z    | x    |-z    |-x    |
|   0  |   1  |   2  |   3  |
+------+------+------+------+
|   x  |   x  |   x  |   x  |
|     z|    -y|    -z|     y|
| y    | z    |-y    |-z    |
|   4  |   5  |   6  |   7  |
+------+------+------+------+
|   z  |   z  |   z  |   z  |
|     y|    -x|    -y|     x|
| x    | y    |-x    |-y    |
|   8  |   9  |  10  |  11  |
+------+------+------+------+
|  -y  |  -y  |  -y  |  -y  |
|    -z|     x|     z|    -x|
|-x    |-z    | x    | z    |
|  12  |  13  |  14  |  15  |
+------+------+------+------+
|  -x  |  -x  |  -x  |  -x  |
|    -y|     z|     y|    -z|
|-z    |-y    | z    | y    |
|  16  |  17  |  18  |  19  |
+------+------+------+------+
|  -z  |  -z  |  -z  |  -z  |
|    -x|     y|     x|    -y|
|-y    |-x    | y    | x    |
|  20  |  21  |  22  |  23  |
+------+------+------+------+
x=r -x=l z=f -z=b y=u -y=d
*/

var directionChange=[
	[11,6,20,17,3,10,12,21,7,2,16,13,19,22,4,9,23,14,8,1,15,18,0,5],
	[22,19,9,4,14,23,1,8,18,15,5,0,6,11,17,20,10,3,21,12,2,7,13,16],
	[1,2,3,0,5,6,7,4,9,10,11,8,13,14,15,12,17,18,19,16,21,22,23,20],
	[3,0,1,2,7,4,5,6,11,8,9,10,15,12,13,14,19,16,17,18,23,20,21,22],
	[18,8,7,21,22,0,11,13,14,4,3,17,10,16,23,5,2,20,15,9,6,12,19,1],
	[5,23,16,10,9,15,20,2,1,19,12,6,21,7,8,18,13,11,0,22,17,3,4,14]
]
/*
rotateList
0=x 1=-x 2=y 3=-y 4=z 5=-z
*/

var cubeRotate={
	R:{axis:"x",checkNum:1,rotateDirection:0,blockNum:9},
	Ri:{axis:"x",checkNum:1,rotateDirection:1,blockNum:9},
	L:{axis:"x",checkNum:-1,rotateDirection:1,blockNum:9},
	Li:{axis:"x",checkNum:-1,rotateDirection:0,blockNum:9},
	U:{axis:"y",checkNum:1,rotateDirection:2,blockNum:9},
	Ui:{axis:"y",checkNum:1,rotateDirection:3,blockNum:9},
	D:{axis:"y",checkNum:-1,rotateDirection:3,blockNum:9},
	Di:{axis:"y",checkNum:-1,rotateDirection:2,blockNum:9},
	F:{axis:"z",checkNum:1,rotateDirection:4,blockNum:9},
	Fi:{axis:"z",checkNum:1,rotateDirection:5,blockNum:9},
	B:{axis:"z",checkNum:-1,rotateDirection:5,blockNum:9},
	Bi:{axis:"z",checkNum:-1,rotateDirection:4,blockNum:9},
	X:{axis:"-",checkNum:undefined,rotateDirection:0,blockNum:27},
	Xi:{axis:"-",checkNum:undefined,rotateDirection:1,blockNum:27},
	Y:{axis:"-",checkNum:undefined,rotateDirection:2,blockNum:27},
	Yi:{axis:"-",checkNum:undefined,rotateDirection:3,blockNum:27},
	Z:{axis:"-",checkNum:undefined,rotateDirection:4,blockNum:27},
	Zi:{axis:"-",checkNum:undefined,rotateDirection:5,blockNum:27},
}

var faceDataSrc={
	r:[[{x:1,y:1,z:1},{x:1,y:1,z:0},{x:1,y:1,z:-1}],[{x:1,y:0,z:1},{x:1,y:0,z:0},{x:1,y:0,z:-1}],[{x:1,y:-1,z:1},{x:1,y:-1,z:0},{x:1,y:-1,z:-1}]],
	l:[[{x:-1,y:1,z:-1},{x:-1,y:1,z:0},{x:-1,y:1,z:1}],[{x:-1,y:0,z:-1},{x:-1,y:0,z:0},{x:-1,y:0,z:1}],[{x:-1,y:-1,z:-1},{x:-1,y:-1,z:0},{x:-1,y:-1,z:1}]],
	u:[[{x:-1,y:1,z:-1},{x:0,y:1,z:-1},{x:1,y:1,z:-1}],[{x:-1,y:1,z:0},{x:0,y:1,z:0},{x:1,y:1,z:0}],[{x:-1,y:1,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}]],
	d:[[{x:-1,y:-1,z:1},{x:0,y:-1,z:1},{x:1,y:-1,z:1}],[{x:-1,y:-1,z:0},{x:0,y:-1,z:0},{x:1,y:-1,z:0}],[{x:-1,y:-1,z:-1},{x:0,y:-1,z:-1},{x:1,y:-1,z:-1}]],
	f:[[{x:-1,y:1,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}],[{x:-1,y:0,z:1},{x:0,y:0,z:1},{x:1,y:0,z:1}],[{x:-1,y:-1,z:1},{x:0,y:-1,z:1},{x:1,y:-1,z:1}]],
	b:[[{x:1,y:1,z:-1},{x:0,y:1,z:-1},{x:-1,y:1,z:-1}],[{x:1,y:0,z:-1},{x:0,y:0,z:-1},{x:-1,y:0,z:-1}],[{x:1,y:-1,z:-1},{x:0,y:-1,z:-1},{x:-1,y:-1,z:-1}]],
}

//for update from format
var positionOfFace={
	r:{axis:"x",num:1},
	l:{axis:"x",num:-1},
	u:{axis:"y",num:1},
	d:{axis:"y",num:-1},
	f:{axis:"z",num:1},
	b:{axis:"z",num:-1},
}

var anotherFace={
	r:"l",
	l:"r",
	u:"d",
	d:"u",
	f:"b",
	b:"f",
}

//for check soluable
var directionFlag=[
	true,false,true,false,
	true,false,true,false,
	true,false,true,false,
	false,true,false,true,
	false,true,false,true,
	false,true,false,true,
]

var faceFlag={
	r:[[1,2],[2,1]],
	l:[[1,2],[2,1]],
	u:[[0,0],[0,0]],
	d:[[0,0],[0,0]],
	f:[[1,2],[2,1]],
	b:[[1,2],[2,1]],
}

//for regular solve
var bottomMiddleBlockData=[
	{x:1,z:0},
	{x:0,z:-1},
	{x:-1,z:0},
	{x:0,z:1},
]

var bottomCornerBlockData=[
	{x:1,z:1},
	{x:1,z:-1},
	{x:-1,z:-1},
	{x:-1,z:1},
]

var middleEdgeData
middleEdgeData=bottomCornerBlockData
