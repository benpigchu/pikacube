function Stage(){
	this.scene=new THREE.Scene()
	
	this.cameraGroup=new THREE.Group
	this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
	this.cameraGroup.add(this.camera)
	this.camera.position.x=25
	this.camera.position.y=0
	this.camera.position.z=0
	this.camera.lookAt(this.scene.position)
	this.scene.add(this.cameraGroup)
	
	this.controller={nowDirection:{x:120,y:40}}
	this.controller.rate=0.01
	var newQuaternion=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,-1,0),this.controller.nowDirection.x*this.controller.rate).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),this.controller.nowDirection.y*this.controller.rate))
	this.cameraGroup.quaternion.copy(newQuaternion)
	
	var lineXGeometry=new THREE.Geometry()
	lineXGeometry.vertices.push(
		new THREE.Vector3(-5,0,0),		
		new THREE.Vector3(5,0,0),
		new THREE.Vector3(5,0.5,0.5),
		new THREE.Vector3(5,-0.5,-0.5),
		new THREE.Vector3(5,0,0),
		new THREE.Vector3(5,-0.5,0.5),
		new THREE.Vector3(5,0.5,-0.5)
	)
	var lineXMaterial=new THREE.LineBasicMaterial({color:0xFF7F7F,linewidth:2})
	var lineX=new THREE.Line(lineXGeometry,lineXMaterial)
	this.scene.add(lineX)
	
	var lineYGeometry=new THREE.Geometry()
	lineYGeometry.vertices.push(
		new THREE.Vector3(0,-5,0),		
		new THREE.Vector3(0,5,0),
		new THREE.Vector3(-0.5,5,0.5),
		new THREE.Vector3(0,5,0),
		new THREE.Vector3(-0.5,5,-0.5),
		new THREE.Vector3(0,5,0),
		new THREE.Vector3(0.5,5,0)
	)
	var lineYMaterial=new THREE.LineBasicMaterial({color:0x7FFF7F,linewidth:2})
	var lineY=new THREE.Line(lineYGeometry,lineYMaterial)
	this.scene.add(lineY)
	
	var lineZGeometry=new THREE.Geometry()
	lineZGeometry.vertices.push(
		new THREE.Vector3(0,0,-5),		
		new THREE.Vector3(0,0,5),
		new THREE.Vector3(0.5,0.5,5),
		new THREE.Vector3(-0.5,0.5,5),
		new THREE.Vector3(0.5,0.5,5),
		new THREE.Vector3(-0.5,-0.5,5),
		new THREE.Vector3(0.5,-0.5,5)
	)
	var lineZMaterial=new THREE.LineBasicMaterial({color:0x7F7FFF,linewidth:2})
	var lineZ=new THREE.Line(lineZGeometry,lineZMaterial)
	this.scene.add(lineZ)
	
	this.renderer=new THREE.WebGLRenderer({antialias:true})
	document.getElementById("canvas").appendChild(this.renderer.domElement)
	this.width=this.renderer.domElement.parentElement.clientWidth
	this.height=this.renderer.domElement.parentElement.clientHeight
	this.renderer.setSize(this.width,this.height)
	this.renderer.setClearColor(0x777777)
}

Stage.prototype.render=function() {
	requestAnimationFrame(function(){stage.render()})
	this.width=this.renderer.domElement.parentElement.clientWidth
	this.height=this.renderer.domElement.parentElement.clientHeight
	this.camera.aspect=this.width/this.height
	this.camera.lookAt(this.scene.position)
	this.camera.updateProjectionMatrix()
	this.renderer.setSize(this.width,this.height)
	this.renderer.render(this.scene,this.camera)
}

Stage.prototype.setController=function(){
	var mousedown=function(event){
		this.controller.beginPoint={x:event.screenX,y:event.screenY}
		this.controller.oldDirection={x:this.controller.nowDirection.x,y:this.controller.nowDirection.y}
		document.addEventListener("mousemove",mousemove,false);
		document.addEventListener("mouseup",mouseup,false);
	}.bind(this)
	var mousemove=function(event){
		this.controller.offset={x:event.screenX-this.controller.beginPoint.x,y:event.screenY-this.controller.beginPoint.y}
		this.controller.nowDirection={x:this.controller.oldDirection.x+this.controller.offset.x,y:this.controller.oldDirection.y+this.controller.offset.y}
		var newQuaternion=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,-1,0),this.controller.nowDirection.x*this.controller.rate).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),this.controller.nowDirection.y*this.controller.rate))
		this.cameraGroup.quaternion.copy(newQuaternion)
	}.bind(this)
	var mouseup=function(event){
		document.removeEventListener("mousemove",mousemove,false);
		document.removeEventListener("mouseup",mouseup,false);
	}.bind(this)
	this.renderer.domElement.parentElement.parentElement.addEventListener("mousedown",mousedown,false)
}