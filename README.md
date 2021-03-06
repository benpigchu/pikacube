# pikacube
A WebGL magic cube with THREE.js

As part of mega-homework of FOP

## Notice
This project is still using ES5, and may be rewriten into ES6 when browsers generally support it.

## About input method
### TWD2 method(TWD)
The TWD2 method(TWD) comes from [MagicCube by twd2](https://github.com/twd2/MagicCube).

This method uses characters to show colors: R for red, G for green, B for blue, Y for yellow, W for white, O for orange, and - for invisible.

Therefore, a single block will be describe as a string of 6 characters, which uses the 6 letters to show the color of the front, back, left, right, up, down faces respectly.For example, a up-right-front corner block whose up face is white, right face is red, front face is blue, should be describe as "B--RW-", and the center of the cube is always "------"

Then, a cube can be written as 27 strings of blocks. Though this program does not mind the order of blocks when it is parsing the input data, it uses the order of blocks below to output data: assume that there is a coordinate system, whose origin is the down-left-back corner, X-axis points to the right, Y-axis points to the top, Z-axis points to the front, and the data describes the blocks at points (0,0,0) (1,0,0) (2,0,0) (0,1,0) (1,1,0) (2,1,0) (0,2,0) (1,2,0) (2,2,0) (0,0,1) (1,0,1) (2,0,1) (0,1,1) (1,1,1) (2,1,1) (0,2,1) (1,2,1) (2,2,1) (0,0,2) (1,0,2) (2,0,2) (0,1,2) (1,1,2) (2,1,2) (0,2,2) (1,2,2) (2,2,2) in order.

For example, a completed cube may be output as below:

	-BO--Y-B---Y-B-R-Y-BO----B-----B-R---BO-W--B--W--B-RW---O--Y-----Y---R-Y--O------------R----O-W-----W----RW-G-O--YG----YG--R-YG-O---G-----G--R--G-O-W-G---W-G--RW-

### BPC method(BPC)
This method is similar to the TWD2 method but uses different order of faces and blocks: the order of faces is right, left, up, down, front, back, and the order of blocks is (0,0,0) (0,0,1) (0,0,2) (0,1,0) (0,1,1) (0,1,2) (0,2,0) (0,2,1) (0,2,2) (1,0,0) (1,0,1) (1,0,2) (1,1,0) (1,1,1) (1,1,2) (1,2,0) (1,2,1) (1,2,2) (2,0,0) (2,0,1) (2,0,2) (2,1,0) (2,1,1) (2,1,2) (2,2,0) (2,2,1) (2,2,2)

### FaceOrder method(FaceOrder)
Different from the two methods below, this method directly use color on faces to describe the cube.

		  +---+---+---+
		  | 0 | 1 | 2 |
		  +---+---+---+
		  | 3 | 4 | 5 | < up
		  +---+---+---+  
		  | 6 | 7 | 8 |
		  +---+---+---+
		 /   /   /   /+---+---+---+  
		+---+---+---+ | 0 | 1 | 2 |
		| 0 | 1 | 2 |/+---+---+---+
		+---+---+---+ | 3 | 4 | 5 | < right
		| 3 | 4 | 5 |/+---+---+---+
		+---+---+---+ | 6 | 7 | 8 |
		| 6 | 7 | 8 |/+---+---+---+
		+---+---+---+
			^ Front
			
			v Left    +---+---+---+ 
		+---+---+---+/| 2 | 1 | 0 |
		| 2 | 1 | 0 | +---+---+---+
		+---+---+---+/| 5 | 4 | 3 | < back
		| 5 | 4 | 3 | +---+---+---+
		+---+---+---+/| 8 | 7 | 6 |
		| 8 | 7 | 6 | +---+---+---+
		+---+---+---+/   /   /   /
					+---+---+---+
					| 6 | 7 | 8 |
					+---+---+---+
			 Down > | 3 | 4 | 5 | 
					+---+---+---+
					| 0 | 1 | 2 |
					+---+---+---+
This method use 9 letters strings to encode colors of faces, use the block order below. Then join the six strings in the order:right, left, up, down, front, back, and we get the description of cube.
For example, a completed cube may be output as:

	RRRRRRRRROOOOOOOOOYYYYYYYYYWWWWWWWWWBBBBBBBBBGGGGGGGGG

### XuBoss method(XuBoss)
This method is similar to the FaceOrder method but uses different order of faces: the order of faces is front, back, left, right, up, down.

## Thanks
Thanks [twd2](https://github.com/twd2) who inspired me to make a big news like this. Also thanks for his TWD2 method and his test data.

Special thanks [THREE.js](http://threejs.org) by mrdoob and other developers, this project won't be completed without that.
