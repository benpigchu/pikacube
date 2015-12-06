function CubeData(cube) {
	this.cube=cube
	this.charFace={}
	for(var i=0;i<faceList.length;i++){
		this.charFace[this.cube.colorChar[faceList[i]]]=faceList[i]
	}
	this.data=[[[],[],[]],[[],[],[]],[[],[],[]]]
	
	this.mapData=[[[],[],[]],[[],[],[]],[[],[],[]]]//map from current position to original position
	this.faceData={r:[[],[],[]],l:[[],[],[]],u:[[],[],[]],d:[[],[],[]],f:[[],[],[]],b:[[],[],[]]}
	/*faceDataMethod
	  +---+---+---+
	  | 0 | 1 | 2 |
	  +---+---+---+
	  | 3 | 4 | 5 |
	  +---+---+---+  
	  | 6 | 7 | 8 |
	  +---+---+---+
	 /   /   /   /+---+---+---+  
	+---+---+---+ | 0 | 1 | 2 |
	| 0 | 1 | 2 |/+---+---+---+
	+---+---+---+ | 3 | 4 | 5 |
	| 3 | 4 | 5 |/+---+---+---+
	+---+---+---+ | 6 | 7 | 8 |
	| 6 | 7 | 8 |/+---+---+---+
	+---+---+---+
		  
	              +---+---+---+ 
	+---+---+---+/| 2 | 1 | 0 |
	| 2 | 1 | 0 | +---+---+---+
	+---+---+---+/| 5 | 4 | 3 |
	| 5 | 4 | 3 | +---+---+---+
	+---+---+---+/| 8 | 7 | 6 |
	| 8 | 7 | 6 | +---+---+---+
	+---+---+---+/   /   /   /
	            +---+---+---+
	            | 6 | 7 | 8 |
	            +---+---+---+
	            | 3 | 4 | 5 |
	            +---+---+---+
	            | 0 | 1 | 2 |
	            +---+---+---+
	*/
	for(var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				this.data[i+1][j+1][k+1]=this.cube.blockList[i+1][j+1][k+1].blockData
			}
		}
	}
	this.update()
}

CubeData.prototype.updateLayout=function(){
	for(var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				this.mapData[this.data[i+1][j+1][k+1].position.x+1][this.data[i+1][j+1][k+1].position.y+1][this.data[i+1][j+1][k+1].position.z+1]={x:i,y:j,z:k}
			}
		}
	}
	for(var i=0;i<faceList.length;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				var faceBlockPosition=faceDataSrc[faceList[i]][j+1][k+1]
				var faceBlockIndex=this.mapData[faceBlockPosition.x+1][faceBlockPosition.y+1][faceBlockPosition.z+1]
				this.faceData[faceList[i]][j+1][k+1]=this.data[faceBlockIndex.x+1][faceBlockIndex.y+1][faceBlockIndex.z+1].colors[faceList[i]]
			}
		}
	}
}

CubeData.prototype.update=function(){
	for(var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				this.data[i+1][j+1][k+1].update()
				this.mapData[this.data[i+1][j+1][k+1].position.x+1][this.data[i+1][j+1][k+1].position.y+1][this.data[i+1][j+1][k+1].position.z+1]={x:i,y:j,z:k}
			}
		}
	}
	for(var i=0;i<faceList.length;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				var faceBlockPosition=faceDataSrc[faceList[i]][j+1][k+1]
				var faceBlockIndex=this.mapData[faceBlockPosition.x+1][faceBlockPosition.y+1][faceBlockPosition.z+1]
				this.faceData[faceList[i]][j+1][k+1]=this.data[faceBlockIndex.x+1][faceBlockIndex.y+1][faceBlockIndex.z+1].colors[faceList[i]]
			}
		}
	}
}

CubeData.prototype.rotate=function(rotateChar){
	if(this.cube.rotating){throw("cannot rotate data when cube rotating")}
	for(var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				if(this.data[i+1][j+1][k+1].position[cubeRotate[rotateChar].axis]==cubeRotate[rotateChar].checkNum){
					this.data[i+1][j+1][k+1].rotate(cubeRotate[rotateChar].rotateDirection)
				}
			}
		}
	}
	this.updateLayout()
}

CubeData.prototype.updateFromTWDLikeFormat=function(data,faceOrder){
	if(faceOrder==undefined){faceOrder=faceList}
	var invalid=function(){this.update();throw("invalid data format")}.bind(this)
	var blockCheckList=[[[false,false,false],[false,false,false],[false,false,false]],[[false,false,false],[false,false,false],[false,false,false]],[[false,false,false],[false,false,false],[false,false,false]]]
	var positionCheckList=[[[false,false,false],[false,false,false],[false,false,false]],[[false,false,false],[false,false,false],[false,false,false]],[[false,false,false],[false,false,false],[false,false,false]]]
	
	var checkRegExp=new RegExp("[^"+this.cube.colorChar.r+this.cube.colorChar.l+this.cube.colorChar.u+this.cube.colorChar.d+this.cube.colorChar.f+this.cube.colorChar.b+this.cube.colorChar.x+"]","g")
	data.replace(checkRegExp,"")
	
	if(data.length!=162){invalid()}
	for(var k=0;k<27;k++) {
		var blockString=data.substr(6*k,6)
		var blockColor={}
		var blockOriginalPosition={x:0,y:0,z:0}
		var blockPosition={x:0,y:0,z:0}
		
		for(var i=0;i<faceOrder.length;i++) {
			blockColor[faceOrder[i]]=this.charFace[blockString[i]]
			if(blockString[i]!=this.cube.colorChar.x){
				if(blockPosition[positionOfFace[faceOrder[i]].axis]!=0){invalid()}
				blockPosition[positionOfFace[faceOrder[i]].axis]=positionOfFace[faceOrder[i]].num
				
				var letter=this.charFace[blockString[i]]
				if(blockOriginalPosition[positionOfFace[letter].axis]!=0){invalid()}
				blockOriginalPosition[positionOfFace[letter].axis]=positionOfFace[letter].num
			}
		}
		
		if(blockCheckList[blockOriginalPosition.x+1][blockOriginalPosition.y+1][blockOriginalPosition.z+1]){invalid()}
		blockCheckList[blockOriginalPosition.x+1][blockOriginalPosition.y+1][blockOriginalPosition.z+1]=true
		if(positionCheckList[blockPosition.x+1][blockPosition.y+1][blockPosition.z+1]){invalid()}
		positionCheckList[blockPosition.x+1][blockPosition.y+1][blockPosition.z+1]=true
		
		if(blockColor.r!=undefined&&blockColor.l!=undefined){invalid()}
		if(blockColor.u!=undefined&&blockColor.d!=undefined){invalid()}
		if(blockColor.f!=undefined&&blockColor.b!=undefined){invalid()}
		
		for(var i=0;i<faceList.length; i++) {
			if(blockColor[anotherFace[faceList[i]]]!=undefined){
				blockColor[faceList[i]]=anotherFace[blockColor[anotherFace[faceList[i]]]]
			}
		}
		
		var colorString=""
		var toSetDirection
		for(var i=0;i<faceList.length;i++){
			if(blockColor[faceList[i]]!=undefined){
				colorString+=blockColor[faceList[i]]
			}else{
				colorString+="-"
			}
		}
		toSetDirection=colorToDirection[colorString]
		if(toSetDirection==undefined){invalid()}
		this.data[blockOriginalPosition.x+1][blockOriginalPosition.y+1][blockOriginalPosition.z+1].trunToDirection(toSetDirection)
	}
	this.updateLayout()
	if(!this.checkSoluable()){invalid()}
}

CubeData.prototype.outputAsTWDLikeFormat=function(axisOrder,faceOrder){
	if(faceOrder==undefined){faceOrder=faceList}
	if(axisOrder==undefined){axisOrder="xyz"}
	var output=""
	for(var i=-1;i<2;i++){
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				var blockPosition={}
				blockPosition[axisOrder[0]]=i
				blockPosition[axisOrder[1]]=j
				blockPosition[axisOrder[2]]=k
				var blockOriginalPosition=this.mapData[blockPosition.x+1][blockPosition.y+1][blockPosition.z+1]
				var block=this.data[blockOriginalPosition.x+1][blockOriginalPosition.y+1][blockOriginalPosition.z+1]
				for(var l=0;l<faceOrder.length;l++){
					output+=block.colors[faceOrder[l]]
				}
			}
		}
	}
	return output
}

CubeData.prototype.checkSoluable=function(){
	var colorString=""
	for(var i=0;i<faceList.length;i++){
		colorString+=this.charFace[this.faceData[faceList[i]][1][1]]
	}
	if(colorToDirection[colorString]==undefined){return false}
	
	var stateList=[]
	for(var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				stateList[i*9+j*3+k+13]=this.mapData[i+1][j+1][k+1].x*9+this.mapData[i+1][j+1][k+1].y*3+this.mapData[i+1][j+1][k+1].z+13
			}
		}
	}
	var checkBlockPosition=true
	for(var i=0;i<stateList.length;i++){
		for(var j=i+1;j<stateList.length;j++){
			if(stateList[i]>stateList[j]){checkBlockPosition=!checkBlockPosition}
		}
	}
	if(!checkBlockPosition){return false}
	
	var checkBlockDirection=true
	for(var i=0;i<axisList.length;i++){
		for(var j=0;j<2;j++){
			for(var k=0;k<2;k++){
				var testBlockPosition={}
				testBlockPosition[axisList[i]]=0
				testBlockPosition[axisList[(i+1)%3]]=2*j-1
				testBlockPosition[axisList[(i+2)%3]]=2*k-1
				if(!directionFlag[this.data[testBlockPosition.x+1][testBlockPosition.y+1][testBlockPosition.z+1].direction]){
					checkBlockDirection=!checkBlockDirection
				}
			}
		}
	}
	if(!checkBlockDirection){return false}
	
	var checkFacePosition=0
	for(var i=0;i<faceList.length;i++){
		for(var j=0;j<2;j++){
			for(var k=0;k<2;k++){
				if(this.faceData[faceList[i]][2*j][2*k]==this.cube.colorChar.u||this.faceData[faceList[i]][2*j][2*k]==this.cube.colorChar.d){
					checkFacePosition+=faceFlag[faceList[i]][j][k]	
				}
			}
		}
	}
	if(checkFacePosition%3!=0){return false}
	
	return true
}

