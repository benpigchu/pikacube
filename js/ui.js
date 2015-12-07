Cube.prototype.setUi=function(){
	document.getElementById("load").addEventListener("click",function(){
		var method=document.getElementById("method").value
		var data=document.getElementById("inData").value
		if(!this.rotating){
			var buttonList=document.getElementsByClassName("button")
			for(var i=0;i<buttonList.length;i++){
				buttonList[i].disabled=true
			}
			try {
				if(method=="bpc"){
					this.cubeData.updateFromTWDLikeFormat(data,"rludfb")
				}else if(method=="twd"){
					this.cubeData.updateFromTWDLikeFormat(data,"fblrud")
				}
				this.turnToData(function(){
					document.getElementById("output").innerText="Loaded"
					var buttonList=document.getElementsByClassName("button")
				for(var i=0;i<buttonList.length;i++){
					buttonList[i].disabled=false
				}
				})
			} catch (error) {
				var buttonList=document.getElementsByClassName("button")
				for(var i=0;i<buttonList.length;i++){
					buttonList[i].disabled=false
				}
				document.getElementById("output").innerText="Error: Invalid input"
			}
		}
	}.bind(this),false)
	
	document.getElementById("solve").addEventListener("click",function(){
		if(!this.rotating){
			var solveMethod=document.getElementById("solve-method").value
			var ansMethod=document.getElementById("ans-method").value
			var buttonList=document.getElementsByClassName("button")
			for(var i=0;i<buttonList.length;i++){
				buttonList[i].disabled=true
			}
			var ans=this.cubeData[solveMethod](ansMethod)
			document.getElementById("output").innerText="Answer is:\n"+ans.join(" ")
			this.playSolve(solveMethod,ansMethod,function(){
				var buttonList=document.getElementsByClassName("button")
				for(var i=0;i<buttonList.length;i++){
					buttonList[i].disabled=false
				}
			})
		}
	}.bind(this),false)
	
	document.getElementById("export").addEventListener("click",function(){
		if(!this.rotating){
			var method=document.getElementById("method").value
			var data
			if(method=="bpc"){
				data=this.cubeData.outputAsTWDLikeFormat("xyz","rludfb")
			}else if(method=="twd"){
				data=this.cubeData.outputAsTWDLikeFormat("zyx","fblrud")
			}
			document.getElementById("output").innerText="Export as "+method+" method:\n"+data
		}
	}.bind(this),false)
	
	var rotateBottonList=document.getElementsByClassName("rotate")
	for(var i=0;i<rotateBottonList.length;i++){
		var element=rotateBottonList[i];
		element.addEventListener("click",function(rotateNumber){
			if(!this.rotating){
				var buttonList=document.getElementsByClassName("button")
				for(var i=0;i<buttonList.length;i++){
					buttonList[i].disabled=true
				}
				this.rotate(rotateNumber,function(){
					var buttonList=document.getElementsByClassName("button")
					for(var i=0;i<buttonList.length;i++){
						buttonList[i].disabled=false
					}
				})
			}
		}.bind(this,element.id),false)
	}
}
