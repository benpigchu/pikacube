function Block(x,y,z,r,l,u,d,f,b,rc,lc,uc,dc,fc,bc) {
	
	//x,y,z are always 1,0,-1
	this.originalPosition={x:x,y:y,z:z}
	this.originalColors={r:r,l:l,u:u,d:d,f:f,b:b}
	this.originalColorChar={r:rc,l:lc,u:uc,d:dc,f:fc,b:bc}
	this.direction=0
	this.blockData=new BlockData(this,x,y,z,rc,lc,uc,dc,fc,bc)
	
	this.rotating=false
	
	this.threeObject=new THREE.Group()
	var shape=new THREE.Shape()
	shape.moveTo(-1,-1)
	shape.lineTo(-1,1)
	shape.lineTo(1,1)
	shape.lineTo(1,-1)
	var geometry=new THREE.ShapeGeometry(shape);
	for (var i=0;i<faceList.length; i++) {
		var letter=faceList[i];
		var material=new THREE.MeshBasicMaterial({color:this.originalColors[letter]})
		var mesh=new THREE.Mesh(geometry,material)
		mesh.position.x=facePosition[letter].x+2.1*this.originalPosition.x
		mesh.position.y=facePosition[letter].y+2.1*this.originalPosition.y
		mesh.position.z=facePosition[letter].z+2.1*this.originalPosition.z
		mesh.quaternion.copy(faceRotate[letter])
		this.threeObject.add(mesh)
	}
	var lineGeometry=new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(+1,+1,+1),		
		new THREE.Vector3(+1,+1,-1),
		new THREE.Vector3(+1,-1,-1),
		new THREE.Vector3(+1,-1,+1),
		new THREE.Vector3(+1,+1,+1),
		new THREE.Vector3(-1,+1,+1),
		new THREE.Vector3(-1,+1,-1),
		new THREE.Vector3(+1,+1,-1),
		new THREE.Vector3(-1,+1,-1),
		new THREE.Vector3(-1,-1,-1),
		new THREE.Vector3(+1,-1,-1),
		new THREE.Vector3(-1,-1,-1),
		new THREE.Vector3(-1,-1,+1),
		new THREE.Vector3(-1,+1,+1),
		new THREE.Vector3(-1,-1,+1),
		new THREE.Vector3(+1,-1,+1)
	)
	var lineMaterial=new THREE.LineBasicMaterial({color:0x000000,linewidth:2})
	var line=new THREE.Line(lineGeometry,lineMaterial)
	line.position.x=2.1*this.originalPosition.x
	line.position.y=2.1*this.originalPosition.y
	line.position.z=2.1*this.originalPosition.z
	this.threeObject.add(line)
	stage.scene.add(this.threeObject)
	
}

Block.prototype.rotate=function(rotateNumber,callback){
	this.turnToDirection(directionChange[rotateNumber][this.direction],callback)
}

Block.prototype.turnToDirection=function(direction,callback){
	if(this.rotating==false){
		this.rotating=true
		this.rotationStep=1
		this.oldRotation=this.threeObject.quaternion
		this.newRotation=directionRotate[direction]
		this.direction=direction
		this.blockData.update()
	}
	THREE.Quaternion.slerp(this.oldRotation,this.newRotation,this.threeObject.quaternion,this.rotationStep/moveTime)
	if(this.rotationStep==moveTime){
		this.threeObject.quaternion.copy(directionRotate[this.direction])
		console.log("blockEndTurn")
		this.rotating=false
		callback()
		return
	}else{
		this.rotationStep++
		var nextFrame=this.turnToDirection.bind(this,direction,callback)
		requestAnimationFrame(nextFrame)
	}
	
}