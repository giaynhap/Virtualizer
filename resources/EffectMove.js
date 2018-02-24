	effects=[];

	effects[0] = new Image();
	effects[0].src="resources/effect_1.png";

	effects[1] = new Image();
	effects[1].src="resources/effect_2.png";

	effects[2] = new Image();
	effects[2].src="resources/effect_3.png";

(function(window){

var EffectMove = function(ctx){
	this.ctx = ctx
	this.alive = false;
	this.center = null;
	this.adv = 2;
	this.effect = Math.floor(Math.random()*3);
}
EffectMove.prototype = {
	 init:function(radius,rotate,center)
	 {

	 	this.rotate = rotate+Math.random()*Math.PI/10;
	 	this.scale = Math.random()*0.7+0.5; 
	 	this.adv=2;
	 	this.center = center;
	 	this.pos = new Vector(Math.cos(rotate)*radius+center.x,Math.sin(rotate)*radius+center.y);
		this.vel = new Vector(Math.cos(rotate)*2,Math.sin(rotate)*2);
	 },
	 update:function()
	 { 
	 	if (this.pos==null||! this.alive ) return


	 	this.pos.addVecOwr(this.vel);
	 	this.adv -=0.05;
	 	if (this.adv <=0)  this.alive = false;

	 this.draw();
	 },
	 draw:function()
	 {
	 	ax = 1-Math.abs(1-this.adv);
	 	if(ax<0) ax=0
	 	this.ctx.globalAlpha=ax;

	 	this.drawRotatedImage(effects[this.effect],this.pos.x,this.pos.y,this.rotate);
		this.ctx.globalAlpha=1;
	 },
drawRotatedImage:function(image, x, y, angle) { 

	this.ctx.save(); 
	this.ctx.translate(x, y);

	this.ctx.rotate(angle);
		this.ctx.scale(this.scale,this.scale)
	this.ctx.drawImage(image, -(image.width/2), -(image.height/2));
	this.ctx.restore(); 
}

}

window.EffectMove = EffectMove;

})(window);

