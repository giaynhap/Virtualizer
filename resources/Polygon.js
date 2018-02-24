
(function(window){

var Polygon = function(ctx){
	this.ctx = ctx;
	this.pos = new Vector(0,0);
	this.vel = new Vector(0,0);
	this.acc = new Vector(0,0);
	this.rotate =0;
	this.size=1;
	this.alive=true;
	this.start=1;
	
}
Polygon.prototype = {

	init:function(x,y,size,rotate)
	{
		this.default={};
		this.pos.x = x;
		this.pos.y = y;
		this.size=size;
		this.rotate = rotate;
		this.default.pos= Vector(x,y);
		this.default.size=size;
		this.default.rotate=rotate;
		this.sides=3;
		this.alpha=0;
		this.start=1;
		this.onkill=null;
		this.kill=this.kill.bind(this);
		this.randomSize=[Math.random()*0.7+0.4,Math.random()];
		
	},
	update:function(){
		if(!this.alive) return;
		this.vel.addVecOwr(this.acc);
		this.pos.addVecOwr(this.vel);
	 	this.rotate+=this.vel.length()/100000*Math.PI
		this.draw();
		
		if (this.start==1)
		{
			this.alpha+=0.2 ;
			if (this.alpha>=1) {
				this.alpha=1;
				this.start=0;
			}
		}
		else
			this.alpha-=0.3/this.size;
		if(this.alpha<0){
			this.alpha=0;
			this.kill();
		}
	},
	setVelocity(x,y)
	{
		this.vel.x =x;
		this.vel.y=y;
	},
	draw()
	{


			var a = ((Math.PI * 2)/this.sides);

			this.ctx.beginPath();
			this.ctx.translate(this.pos.x,this.pos.y);

			this.ctx.rotate(this.rotate);

			this.ctx.moveTo(this.size,0);

			for (var i = 1; i < this.sides ; i++) {

			this.ctx.lineTo(this.size*Math.cos(a*i*this.randomSize[0]),this.size*Math.sin(a*i));

			}
			this.ctx.closePath();

			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.ctx.globalAlpha=0.2-(1.0-this.alpha)*0.2;
			this.ctx.fill();
			this.ctx.globalAlpha=this.alpha;
			this.ctx.stroke();
			this.ctx.globalAlpha=1;

				
	},
	kill:function()
	{
		
		this.alive=false;
		if(this.onkill!=null) this.onkill(this);
	}



}


window.Polygon = Polygon;

})(window);