function Cube(r,l,u,d,f,b,x,rc,lc,uc,dc,fc,bc,xc) {
	this.colors={r:r,l:l,u:u,d:d,f:f,b:b,x:x}
	this.colorChar={r:rc,l:lc,u:uc,d:dc,f:fc,b:bc,x:xc}
	this.blockList=[[[],[],[]],[[],[],[]],[[],[],[]]]
	
	this.rotatingNum=0
	this.rotating=false
	
	for (var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				this.blockList[i+1][j+1][k+1]=new Block(i,j,k
					,this.colors[colorList[i+1][j+1][k+1][0]]
					,this.colors[colorList[i+1][j+1][k+1][1]]
					,this.colors[colorList[i+1][j+1][k+1][2]]
					,this.colors[colorList[i+1][j+1][k+1][3]]
					,this.colors[colorList[i+1][j+1][k+1][4]]
					,this.colors[colorList[i+1][j+1][k+1][5]]
					,this.colorChar[colorList[i+1][j+1][k+1][0]]
					,this.colorChar[colorList[i+1][j+1][k+1][1]]
					,this.colorChar[colorList[i+1][j+1][k+1][2]]
					,this.colorChar[colorList[i+1][j+1][k+1][3]]
					,this.colorChar[colorList[i+1][j+1][k+1][4]]
					,this.colorChar[colorList[i+1][j+1][k+1][5]])
			}
		}
	}
	
	this.cubeData=new CubeData(this)
}

Cube.prototype.rotate=function(rotateChar,callback){
	this.cubeData.update()
	this.rotateCallback=callback
	for (var i=-1;i<2;i++) {
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				if(this.blockList[i+1][j+1][k+1].blockData.position[cubeRotate[rotateChar].axis]==cubeRotate[rotateChar].checkNum){
					this.blockList[i+1][j+1][k+1].rotate(cubeRotate[rotateChar].rotateDirection,this.rotateEnd.bind(this))
				}
			}
		}
	}
	this.rotating=true
	this.rotatingNum+=cubeRotate[rotateChar].blockNum
}

Cube.prototype.rotateEnd=function(){
	this.rotatingNum--
	if(this.rotatingNum==0){
		this.rotating=false
		this.rotateCallback()
		this.cubeData.update()
	}
}

Cube.prototype.rotateByOrder=function(operate,callback){
	if(operate.length!=0){
		var turn=operate.shift()
		this.rotate(turn,this.rotateByOrder.bind(this,operate,callback))
	}else{callback()}
}

Cube.prototype.turnToData=function(callback){
	this.rotateCallback=callback
	for (var i=-1;i<2;i++){
		for(var j=-1;j<2;j++){
			for(var k=-1;k<2;k++){
				this.blockList[i+1][j+1][k+1].turnToDirection(this.blockList[i+1][j+1][k+1].blockData.direction,this.rotateEnd.bind(this))
			}
		}
	}
	this.rotating=true
	this.rotatingNum+=27
}

Cube.prototype.playSolve=function(outputMethod,callback){
	this.rotateByOrder(this.cubeData.regularSolve(outputMethod),callback)
}