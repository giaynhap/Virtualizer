
(function(window){

var Canvas = function(id){
	var canvas = document.getElementById(id);




	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	this.ctx = canvas.getContext("2d");
	this.element= canvas;
	this.fillColor = "##ffffff"
	this.shadowColor = "#ffffff"
	this.strokeColor="#ffffff"
 

	this.circle = new Circle(this.ctx);
	this.circle.init(canvas.width/2,canvas.height/2)
	this.bgImage = new Image();
	this.bgImage.src="resources/background.png"
	this.crossOrigin = "Anonymous";
		/*
		ctx.fillStyle = "#eaf1fc";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		var testPolygon = new Polygon(this.ctx);
		testPolygon.init(200,200,10,5)
		testPolygon.draw();
		testPolygon = new Polygon(this.ctx);
		testPolygon.init(300,300,80,2)
		testPolygon.draw();
		*/
	this.update=this.update.bind(this);
		 this.initAudio();

}
Canvas.prototype = {
	onresize:function(){
		this.element.width  = window.innerWidth;
		this.element.height = window.innerHeight;
		this.circle.init(this.element.width/2,this.element.height/2)
	},
	init:function()
	{
		this.loop = setInterval(this.update,70);
		
	},
	initAudio(){

	},
	preUpdate()
	{
	//	this.ctx.save(); 
		this.ctx.fillStyle="white";
		this.ctx.clearRect(0, 0, this.element.width,this.element.height);
		

		this.ctx.drawImage(this.bgImage,0,0,this.element.width,this.element.height);
		this.ctx.strokeStyle = this.strokeColor;
 		this.ctx.fillStyle=this.fillColor;
		this.ctx.shadowBlur = 20;
		this.ctx.shadowColor =  this.shadowColor;
		
		this.ctx.fillText("by Giay Nhap @2018",this.element.width-115,10);
		 

	},
	beforeUpdate()
	{
 			this.ctx.globalAlpha=1;
 			//	this.ctx.restore(); 
	}
	,
	update:function()
	{
		this.preUpdate();
	 
		 this.circle.update();
		 this.beforeUpdate();
		 

	},
	updateData:function(data)
	{
		this.circle.updateData(data);
	},setFillColor:function(color)
	{
		 
			this.fillColor = color
			this.shadowColor = color
			this.strokeColor=color
	},setShowEffect:function(val)
	{
		this.circle.showEffect  = val;
	},setBackGroundImage:function(src)
	{
		this.bgImage.src = src;
	}
}

window.Canvas = Canvas;

})(window);