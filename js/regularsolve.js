CubeData.prototype.regularSolve=function(outputMethod){
	var rotateList=new OperatorList()
	
	var centerBlockPositionNum=9*this.data[1][0][1].position.x+3*this.data[1][0][1].position.y+this.data[1][0][1].position.z
	switch(centerBlockPositionNum){
		case 3:
			rotateList.push("Z","Z")
			this.rotate("Z")
			this.rotate("Z")
			break
		case 1:
			rotateList.push("Xi")
			this.rotate("Xi")
			break
		case -1:
			rotateList.push("X")
			this.rotate("X")
			break
		case 9:
			rotateList.push("Z")
			this.rotate("Z")
			break
		case -9:
			rotateList.push("Zi")
			this.rotate("Zi")
			break
		case -3:
			break
		default:
	}
	
	var rightCenterPositionNum=9*this.data[2][1][1].position.x+3*this.data[2][1][1].position.y+this.data[2][1][1].position.z
	switch(rightCenterPositionNum){
		case -9:
			rotateList.push("Y","Y")
			this.rotate("Y")
			this.rotate("Y")
			break
		case -1:
			rotateList.push("Y")
			this.rotate("Y")
			break
		case 1:
			rotateList.push("Yi")
			this.rotate("Yi")
			break
		case 9:
			break
		default:
	}

	for(var i=0;i<bottomMiddleBlockData.length;i++){
		var bottomMiddleBlockOriginalPosition={x:bottomMiddleBlockData[i].x,z:bottomMiddleBlockData[i].z,y:-1}
		var bottomMiddleBlockPosition=this.data[bottomMiddleBlockOriginalPosition.x+1][bottomMiddleBlockOriginalPosition.y+1][bottomMiddleBlockOriginalPosition.z+1].position
		var finishFlag=false
		
		if(bottomMiddleBlockPosition.y==-1){
			if(bottomMiddleBlockPosition.x!=1||bottomMiddleBlockPosition.z!=0||this.faceData.d[1][2]!=this.cube.colorChar.d){
				var blockPositionNum=3*bottomMiddleBlockPosition.x+bottomMiddleBlockPosition.z
				switch(blockPositionNum){
					case 3:
						rotateList.push("R","R")
						this.rotate("R")
						this.rotate("R")
						break
					case -3:
						rotateList.push("L","L")
						this.rotate("L")
						this.rotate("L")
						break
					case 1:
						rotateList.push("F","F")
						this.rotate("F")
						this.rotate("F")
						break
					case -1:
						rotateList.push("B","B")
						this.rotate("B")
						this.rotate("B")
						break				
					default:
				}
			}else{finishFlag=true}
		}
		
		if(!finishFlag){
			if(bottomMiddleBlockPosition.y==0){
				var midBlockPositionNum=3*bottomMiddleBlockPosition.x+bottomMiddleBlockPosition.z
				switch(midBlockPositionNum){
					case 2:
						rotateList.push("B","U","Bi")
						this.rotate("B")
						this.rotate("U")
						this.rotate("Bi")
						break
					case 4:
						rotateList.push("R","U","Ri")
						this.rotate("R")
						this.rotate("U")
						this.rotate("Ri")
						break
					case -2:
						rotateList.push("F","U","Fi")
						this.rotate("F")
						this.rotate("U")
						this.rotate("Fi")
						break
					case -4:
						rotateList.push("L","U","Li")
						this.rotate("L")
						this.rotate("U")
						this.rotate("Li")
						break				
					default:
				}
			}
			
			var topBlockPositionNum=3*bottomMiddleBlockPosition.x+bottomMiddleBlockPosition.z
			switch(topBlockPositionNum){
				case -1:
					rotateList.push("U")
					this.rotate("U")
					break
				case 1:
					rotateList.push("Ui")
					this.rotate("Ui")
					break
				case -3:
					rotateList.push("U","U")
					this.rotate("U")
					this.rotate("U")
					break
				case 3:
					break				
				default:
			}
			if(this.faceData.u[1][2]==this.cube.colorChar.d){
				rotateList.push("R","R")
				this.rotate("R")
				this.rotate("R")
			}else{
				rotateList.push("U","F","Ri","Fi")
				this.rotate("U")
				this.rotate("F")
				this.rotate("Ri")
				this.rotate("Fi")
			}
		}
		
		rotateList.push("Y")
		this.rotate("Y")
	}
	
	for(var i=0;i<bottomCornerBlockData.length;i++){
		var bottomCornerBlockOriginalPosition={x:bottomCornerBlockData[i].x,z:bottomCornerBlockData[i].z,y:-1}
		var bottomCornerBlockPosition=this.data[bottomCornerBlockOriginalPosition.x+1][bottomCornerBlockOriginalPosition.y+1][bottomCornerBlockOriginalPosition.z+1].position
		var finishFlag2=false
		
		if(bottomCornerBlockPosition.y==-1){
			if(bottomCornerBlockPosition.x!=1||bottomCornerBlockPosition.z!=1||this.faceData.d[0][2]!=this.cube.colorChar.d){
				var bottomCornerPositionNum=3*bottomCornerBlockPosition.x+bottomCornerBlockPosition.z
				switch(bottomCornerPositionNum){
					case 2:
						rotateList.push("B","U","Bi")
						this.rotate("B")
						this.rotate("U")
						this.rotate("Bi")
						break
					case 4:
						rotateList.push("R","U","Ri")
						this.rotate("R")
						this.rotate("U")
						this.rotate("Ri")
						break
					case -2:
						rotateList.push("F","U","Fi")
						this.rotate("F")
						this.rotate("U")
						this.rotate("Fi")
						break
					case -4:
						rotateList.push("L","U","Li")
						this.rotate("L")
						this.rotate("U")
						this.rotate("Li")
						break				
					default:
				}
			}else{finishFlag2=true}
		}
		
		if(!finishFlag2){
			var topCornerPositionNum=3*bottomCornerBlockPosition.x+bottomCornerBlockPosition.z
			switch(topCornerPositionNum){
				case -2:
					rotateList.push("Ui")
					this.rotate("Ui")
					break
				case -4:
					rotateList.push("U","U")
					this.rotate("U")
					this.rotate("U")
					break
				case 2:
					rotateList.push("U")
					this.rotate("U")
					break
				case 4:
					break				
				default:
			}
			if(this.faceData.u[2][2]==this.cube.colorChar.d){
				rotateList.push("R","Ui","Ri","U","U")
				this.rotate("R")
				this.rotate("Ui")
				this.rotate("Ri")
				this.rotate("U")
				this.rotate("U")
			}
			if(this.faceData.f[0][2]==this.cube.colorChar.d){
				rotateList.push("U","R","Ui","Ri")
				this.rotate("U")
				this.rotate("R")
				this.rotate("Ui")
				this.rotate("Ri")
			}else{
				rotateList.push("Ui","Fi","U","F")
				this.rotate("Ui")
				this.rotate("Fi")
				this.rotate("U")
				this.rotate("F")
			}
		}
		
		rotateList.push("Y")
		this.rotate("Y")
	}

	for(var i=0;i<middleEdgeData.length;i++){
		var middleEdgeBlockOriginalPosition={x:middleEdgeData[i].x,z:middleEdgeData[i].z,y:0}
		var middleEdgeBlockPosition=this.data[middleEdgeBlockOriginalPosition.x+1][middleEdgeBlockOriginalPosition.y+1][middleEdgeBlockOriginalPosition.z+1].position
		var finishFlag3=false
		
		if(middleEdgeBlockPosition.y==0){
			if(middleEdgeBlockPosition.x!=1||middleEdgeBlockPosition.z!=1||this.faceData.f[1][2]!=this.faceData.f[1][1]){
				var middleEdgePositionNum=3*middleEdgeBlockPosition.x+middleEdgeBlockPosition.z
				switch(middleEdgePositionNum){
					case 2:
						rotateList.push("Y","R","Ui","Ri","Ui","Fi","U","F","Yi")
						this.rotate("Y")
						this.rotate("R")
						this.rotate("Ui")
						this.rotate("Ri")
						this.rotate("Ui")
						this.rotate("Fi")
						this.rotate("U")
						this.rotate("F")
						this.rotate("Yi")
						break
					case 4:
						rotateList.push("R","Ui","Ri","Ui","Fi","U","F")
						this.rotate("R")
						this.rotate("Ui")
						this.rotate("Ri")
						this.rotate("Ui")
						this.rotate("Fi")
						this.rotate("U")
						this.rotate("F")
						break
					case -2:
						rotateList.push("Yi","R","Ui","Ri","Ui","Fi","U","F","Y")
						this.rotate("Yi")
						this.rotate("R")
						this.rotate("Ui")
						this.rotate("Ri")
						this.rotate("Ui")
						this.rotate("Fi")
						this.rotate("U")
						this.rotate("F")
						this.rotate("Y")
						break
					case -4:
						rotateList.push("Y","Y","R","Ui","Ri","Ui","Fi","U","F","Yi","Yi")
						this.rotate("Y")
						this.rotate("Y")
						this.rotate("R")
						this.rotate("Ui")
						this.rotate("Ri")
						this.rotate("Ui")
						this.rotate("Fi")
						this.rotate("U")
						this.rotate("F")
						this.rotate("Yi")
						this.rotate("Yi")
						break				
					default:
				}
			}else{finishFlag3=true}
		}
		if(!finishFlag3){
			var topEdgePositionNum=3*middleEdgeBlockPosition.x+middleEdgeBlockPosition.z
			switch(topEdgePositionNum){
				case -1:
					rotateList.push("U")
					this.rotate("U")
					break
				case 1:
					rotateList.push("Ui")
					this.rotate("Ui")
					break
				case -3:
					rotateList.push("U","U")
					this.rotate("U")
					this.rotate("U")
					break
				case 3:
					break				
				default:
			}
			if(this.faceData.r[0][1]==this.faceData.r[1][1]){
				rotateList.push("Ui","Fi","U","F","U","R","Ui","Ri")
				this.rotate("Ui")
				this.rotate("Fi")
				this.rotate("U")
				this.rotate("F")
				this.rotate("U")
				this.rotate("R")
				this.rotate("Ui")
				this.rotate("Ri")
			}else{
				rotateList.push("U","U","R","Ui","Ri","Ui","Fi","U","F")
				this.rotate("U")
				this.rotate("U")
				this.rotate("R")
				this.rotate("Ui")
				this.rotate("Ri")
				this.rotate("Ui")
				this.rotate("Fi")
				this.rotate("U")
				this.rotate("F")
			}
		}
		
		
		rotateList.push("Y")
		this.rotate("Y")
	}
	
	if(this.faceData.u[1][2]!=this.faceData.u[1][1]&&this.faceData.u[1][0]!=this.faceData.u[1][1]&&this.faceData.u[0][1]!=this.faceData.u[1][1]&&this.faceData.u[2][1]!=this.faceData.u[1][1]){
		rotateList.push("F","U","R","Ui","Ri","Fi")
		this.rotate("F")
		this.rotate("U")
		this.rotate("R")
		this.rotate("Ui")
		this.rotate("Ri")
		this.rotate("Fi")
	}
	while(this.faceData.u[1][0]!=this.faceData.u[1][1]){
		rotateList.push("U")
		this.rotate("U")
	}
	if(this.faceData.u[1][2]!=this.faceData.u[1][1]||this.faceData.u[0][1]!=this.faceData.u[1][1]||this.faceData.u[2][1]!=this.faceData.u[1][1]){
		if(this.faceData.u[2][1]==this.faceData.u[1][1]){
			rotateList.push("U")
			this.rotate("U")
		}
		if(this.faceData.u[0][1]==this.faceData.u[1][1]){
			rotateList.push("F","U","R","Ui","Ri","Fi")
			this.rotate("F")
			this.rotate("U")
			this.rotate("R")
			this.rotate("Ui")
			this.rotate("Ri")
			this.rotate("Fi")
		}else{
			rotateList.push("F","R","U","Ri","Ui","Fi")
			this.rotate("F")
			this.rotate("R")
			this.rotate("U")
			this.rotate("Ri")
			this.rotate("Ui")
			this.rotate("Fi")
		}
	}
	
	while(this.faceData.u[0][0]!=this.faceData.u[1][1]||this.faceData.u[0][2]!=this.faceData.u[1][1]||this.faceData.u[2][0]!=this.faceData.u[1][1]||this.faceData.u[2][2]!=this.faceData.u[1][1]){
		var topCorrectBlockNum=0
		for(var i=0;i<2;i++){
			for(var j=0;j<2;j++){
				topCorrectBlockNum+=this.faceData.u[2*i][2*j]!=this.faceData.u[1][1]?0:1
			}
		}
		if(topCorrectBlockNum==0){
			while(this.faceData.l[0][2]!=this.faceData.u[1][1]){
				rotateList.push("U")
				this.rotate("U")
			}
		}
		if(topCorrectBlockNum==1){
			while(this.faceData.u[2][0]!=this.faceData.u[1][1]){
				rotateList.push("U")
				this.rotate("U")
			}
		}
		if(topCorrectBlockNum==2){
			while(this.faceData.f[0][0]!=this.faceData.u[1][1]){
				rotateList.push("U")
				this.rotate("U")
			}
		}
		rotateList.push("R","U","Ri","U","R","U","U","Ri")
		this.rotate("R")
		this.rotate("U")
		this.rotate("Ri")
		this.rotate("U")
		this.rotate("R")
		this.rotate("U")
		this.rotate("U")
		this.rotate("Ri")
	}
	
	while(this.faceData.f[0][0]!=this.faceData.f[0][2]||this.faceData.r[0][0]!=this.faceData.r[0][2]||this.faceData.b[0][0]!=this.faceData.b[0][2]||this.faceData.l[0][0]!=this.faceData.l[0][2]){
		if(this.faceData.f[0][0]==this.faceData.f[0][2]||this.faceData.r[0][0]==this.faceData.r[0][2]||this.faceData.b[0][0]==this.faceData.b[0][2]||this.faceData.l[0][0]==this.faceData.l[0][2]){
			while(this.faceData.b[0][0]!=this.faceData.b[0][2]){
				rotateList.push("U")
				this.rotate("U")
			}
		}
		rotateList.push("Ri","F","Ri","B","B","R","Fi","Ri","B","B","R","R","Ui")
		this.rotate("Ri")
		this.rotate("F")
		this.rotate("Ri")
		this.rotate("B")
		this.rotate("B")
		this.rotate("R")
		this.rotate("Fi")
		this.rotate("Ri")
		this.rotate("B")
		this.rotate("B")
		this.rotate("R")
		this.rotate("R")
		this.rotate("Ui")
	}
	
	while(this.faceData.f[0][0]!=this.faceData.f[0][1]||this.faceData.r[0][0]!=this.faceData.r[0][1]||this.faceData.b[0][0]!=this.faceData.b[0][1]||this.faceData.l[0][0]!=this.faceData.l[0][1]){
		if(this.faceData.f[0][0]==this.faceData.f[0][1]||this.faceData.r[0][0]==this.faceData.r[0][1]||this.faceData.b[0][0]==this.faceData.b[0][1]||this.faceData.l[0][0]==this.faceData.l[0][1]){
			while(this.faceData.b[0][0]!=this.faceData.b[0][1]){
				rotateList.push("U")
				this.rotate("U")
			}
		}
		rotateList.push("F","F","U","L","Ri","F","F","Li","R","U","F","F")
		this.rotate("F")
		this.rotate("F")
		this.rotate("U")
		this.rotate("L")
		this.rotate("Ri")
		this.rotate("F")
		this.rotate("F")
		this.rotate("Li")
		this.rotate("R")
		this.rotate("U")
		this.rotate("F")
		this.rotate("F")
	}
	
	while(this.faceData.f[0][0]!=this.faceData.f[1][1]){
		rotateList.push("U")
		this.rotate("U")
	}
	
	rotateList[outputMethod]()
	this.update()
	return rotateList
}