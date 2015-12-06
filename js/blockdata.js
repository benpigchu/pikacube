function BlockData(block,x,y,z,rc,lc,uc,dc,fc,bc) {
	this.block=block
	this.position={x:x,y:y,z:z}
	this.colors={r:rc,l:lc,u:uc,d:dc,f:fc,b:bc}
	this.direction=0
}

BlockData.prototype.setByDirection=function(){
	var oldPosition={}
	oldPosition.x=this.block.originalPosition.x
	oldPosition.y=this.block.originalPosition.y
	oldPosition.z=this.block.originalPosition.z
	oldPosition.X=-oldPosition.x
	oldPosition.Y=-oldPosition.y
	oldPosition.Z=-oldPosition.z
	this.position.x=oldPosition[directionPosition[this.direction][0]]
	this.position.y=oldPosition[directionPosition[this.direction][1]]
	this.position.z=oldPosition[directionPosition[this.direction][2]]
	this.colors.r=this.block.originalColorChar[directionColor[this.direction][0]]
	this.colors.l=this.block.originalColorChar[directionColor[this.direction][1]]
	this.colors.u=this.block.originalColorChar[directionColor[this.direction][2]]
	this.colors.d=this.block.originalColorChar[directionColor[this.direction][3]]
	this.colors.f=this.block.originalColorChar[directionColor[this.direction][4]]
	this.colors.b=this.block.originalColorChar[directionColor[this.direction][5]]

}

BlockData.prototype.update=function(){
	this.direction=this.block.direction
	this.setByDirection()
}

BlockData.prototype.rotate=function(rotateNumber){
	this.direction=directionChange[rotateNumber][this.direction]
	this.setByDirection()
}

BlockData.prototype.trunToDirection=function(direction){
	this.direction=direction
	this.setByDirection()
}
