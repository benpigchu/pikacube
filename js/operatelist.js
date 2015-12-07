function OperatorList(){
	for(var i=0;i<arguments.length;i++){
		this.push(arguments[i])
	}
}

OperatorList.prototype=new Array()

OperatorList.prototype.simplify=function(){
	var i=0
	var j=1
	while(j<this.length){
		if(this[i][0]!=this[j][0]){
			i=j
		}else{
			if(j-i==1){
				if(this[i].length!=this[j].length){
					this.splice(i,2)
					j--
					if(i>0){
						i--
						j--
					}
					if(i>0){
						if(this[i][0]==this[i-1][0]){
							i--
							j--
						}
					}
				}
			}else{
				if(this[i].length==this[j].length){
					this.splice(i+1,2)
					if(this[i].length==2){
						this[i]=this[i][0]
					}else{
						this[i]+="i"
					}
					j-=2
				}else{
					i++
					j--
				}
			}
		}
		j++
	}
	var k=this.length-1
	while(k>0&&(this[k][0]=="X"||this[k][0]=="Y"||this[k][0]=="Z")){
		this.pop()
		k--
	}
}

OperatorList.prototype.raw=function(){}

OperatorList.prototype.noI=function(){
	this.simplify()
	for(var i=0;i<this.length;i++){
		if(this[i].length==2){
			var char=this[i][0]
			if(i+1<this.length){
				if(this[i]==this[i+1]){
					this.splice(i,2,char,char)
				}else{
					this.splice(i,1,char,char,char)
				}
			}else{
				this.splice(i,1,char,char,char)
			}
		}
	}
}

OperatorList.prototype.noXYZ=function(){
	var i=0
	while(i<this.length){
		if(this[i][0]=="X"||this[i][0]=="Y"||this[i][0]=="Z"){
			var rotate=this[i]
			this.splice(i,1)
			for(var j=i;j<this.length;j++){
				this[j]=rotateOfRotate[rotate][this[j]]
			}
		}else{
			i++
		}
	}
	this.simplify()
}

OperatorList.prototype.noXYZI=function(){
	this.noXYZ()
	this.noI()
}

OperatorList.prototype.onlyXZU=function(){
	var i=0
	while(i<this.length){
		if(this[i][0]!="X"&&this[i][0]!="U"&&this[i][0]!="Z"){
			var raw=this[i]
			this.splice(i,1)
			for(var j=0;j<turnToXZU[raw].length;j++){
				this.splice(i,0,turnToXZU[raw][turnToXZU[raw].length-j-1])
			}
		}
		i++
	}
	this.noI()
}