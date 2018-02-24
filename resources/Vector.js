
(function(window){

var Vector = function(x,y){
	this.x = x;
	this.y = y
}
Vector.prototype = {
	length : function()
	{
		if (this.x==null || this.y==null) return 0;
		return Math.sqrt(this.x*this.x+this.y*this.y)
	},
	normal:function()
	{
		length = this.lenght();
		return (lenght >0) ?(new Vector(this.x/x,this.y/y)): null;
	},
	mutil:function(number)
	{
		if (this.x==null || this.y==null) return null;
		return new Vector(this.x*number,this.y*number);
	},
	mutilOwn:function(number)
	{
		if (this.x==null || this.y==null) {
			this.x=0;
			this.y=0;
			return;
		}
		this.x*=number;
		this.y*=number;
		 
	},
	addVecOwr:function(vec)
	{
		if (vec==null) return null;
		if (this.x==null || this.y==null){
			this.x=vec.x;
			this.y =vec.y
			return;
		}
		this.x+=vec.x;
		this.y+=vec.y;
	},
	addVec:function(vec)
	{
		if (this.x==null || this.y==null || vec ==null) return null;
		return new Vector(this.x+vec.x,this.y+vec.y);
	}
}

window.Vector = Vector;

})(window);