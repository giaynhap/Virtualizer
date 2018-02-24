
(function(window){

var Circle = function(ctx){
	this.ctx=ctx;
	this.sides =30;
	this.pos=new Vector(0,0);
	this.radius=170;
	this.data = new Array(100);
	this.polygons = [];
	this.effects = [];
	this.lasMake=0;
	this.lasMake2=0;
	this.intensity =0;
	this.rot =0;
	this.onPolygonDie=this.onPolygonDie.bind(this);
	this.makePolygonAlive=this.makePolygonAlive.bind(this);
	this.moveData= new Array(100);
	this.rus = 0;
	this.default={};
	this.shock = false;
	this.showEffect = true;




	for (var i = 0;i<80; i++) {

		var	polygon = new Polygon(this.ctx);
		polygon.init(200,200,60,5)
	
		polygon.alive=false;
		polygon.onkill=this.onPolygonDie;
		this.polygons[i]=polygon;
		if (this.showEffect  )
		this.effects[i]= new EffectMove(this.ctx);



	}
	for(var i=0;i<this.data.length;i++)
	{
		this.moveData[i]=0
		this.data[i]=0;
	}
	this.loopUpdate  = setInterval(this.makePolygonAlive,1000);

}
Circle.prototype = {

		init:function(x,y) {
			this.pos.x = x;
			this.pos.y = y;
			this.default.x=x;
			this.default.y=y;
		},
		onPolygonDie:function(elm)
		{
this.resetPoligonData(elm);
		},
		makePolygonAlive:function()
		{

			var n=0;
			var maxm = 3;
			if (this.shock)
				 maxm = 10;

			if (this.showEffect )
			{
				for (var k in this.polygons)
				{
					if(!this.effects[k].alive )
					{
						n++
						this.effects[k].alive = true;
						this.effects[k].init(Math.random()*60+60,this.lasMake2,this.pos)
						this.lasMake2+=Math.PI/maxm
						
					}
					if (n==maxm*2) break;

				}

				n=0;
			}
			for (var k in this.polygons)
			{
					

				if(!this.polygons[k].alive)
				{

					this.resetPoligonData(this.polygons[k],maxm);
					n++;
				}
				if (n>maxm) return;
			}
			this.shock = 0;


			

		},
		resetPoligonData:function(polygon,inum = 3)
		{
			var radius =this.radius+10 ;
			var rag = Math.random()*Math.PI*2;
			if(Math.random()<0.5)
			var rag = this.lasMake;

			this.lasMake+=Math.PI/inum;

			var f_x = Math.cos(rag);
			var f_y = Math.sin(rag);
			var ax = f_x/Math.abs(f_x)*((this.shock)?2:1);
			var ay = f_x/Math.abs(f_x)*((this.shock)?2:1);
			var x = f_x*radius+this.pos.x;
			var y = f_y*radius+this.pos.y;

			polygon.init(x,y,Math.random()*30+5,Math.random()*Math.PI)
			polygon.vel.x=f_x*((this.shock)?2:1);
			polygon.vel.y=f_y*((this.shock)?2:1);
			//polygon.acc.x=ax/10;
			//polygon.acc.y=ay/10;


			polygon.alive=true;
		},
		update(){
			

			for (var k in this.polygons) {

			
			 	this.polygons[k].update();
			 	if (this.showEffect )
			 	this.effects[k].update();

				}
			this.draw();
					this.rus =  this.intensity
		},
		draw:function(){
			this.sides=100;
			var space =2;
			var react_x=0,react_y=0;
			var a = ((Math.PI * 2)/(this.sides-1));

			this.ctx.beginPath();
			this.ctx.translate(this.pos.x,this.pos.y);

			this.ctx.rotate(this.rotate);

			radius = this.radius ;
			this.ctx.moveTo(radius*Math.cos(this.rot),radius*Math.sin(this.rot));
			var las =0;
			for (var i = 0; i < this.sides ; i++) {
			
 			ans =this.analysGetDB(i);
 			data = ans;

 			las= ans[1];
 		
 			if (Math.abs(this.moveData[i]-data)>5)
 			{
 				var sub = data-this.moveData[i];
 				var acc = Math.abs(sub)/sub;
 				 
 				this.moveData[i]+=acc*10;	
 			}
 			else
 				this.moveData[i] = data;

 			data = this.moveData[i];
		
			this.ctx.lineTo((radius+data)*Math.cos(a*i+this.rot),(radius+data)*Math.sin(a*i+this.rot));
			 

			this.ctx.lineTo((radius-space-data)*Math.cos(a*i+this.rot),(radius-space-data)*Math.sin(a*i+this.rot));
			

			
		

			this.ctx.moveTo((radius+data)*Math.cos(a*i+this.rot),(radius+data)*Math.sin(a*i+this.rot));
			
			react_x +=Math.cos(a*i+this.rot) * (this.radius + ans);
			react_y += Math.sin(a*i+this.rot) * (this.radius + ans);

			}
			 this.pos.x = this.default.x  ;
			 this.pos.y = this.default.y ;
 

			radius-=2;
			this.ctx.moveTo(radius*Math.cos(this.rot),radius*Math.sin(this.rot));
			for (var i = 0; i < this.sides ; i++) {
 				 data= this.moveData[i];
 			 	this.ctx.lineTo((radius-data)*Math.cos(a*i+this.rot),(radius-data)*Math.sin(a*i+this.rot));

			}
 
			this.ctx.closePath();
					this.ctx.stroke();
			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			 
			var per = react_x/6000;
		 
			 this.ctx.translate(-per*this.pos.x,-per*this.pos.y*2);
			 this.ctx.scale(1+per,1+per);

			this.ctx.globalAlpha=this.alpha;
		
		
		},
		updateData:function(data)
		{

			 
			this.rot = 0;//this.rot + this.intensity * 0.0001;
			this.intensity = 0;

			for(var i in data)
			{
				this.data[i]= Math.min(99999, Math.max((data[i] * 2.5 - 200), 0))/10;
				this.intensity+=this.data[i];
			
			}

			 
		},
		analysGetDB(index)
		{

		 
			switch (index)
			{
				case 8:
				return Math.max(this.intensity-200,0) /2
				case 9:
				if(this.intensity>100)
					return Math.max(this.intensity-200,0)/10 ;
				return 0;
			 
				case 7:
				return this.shockPoint(index,20,60);
				case 17:
				return this.shockPoint(index,10,30,50);
				case 19:
				return this.shockPoint(index,10,40);
				case 15:
				return this.shockPoint(index,50,50);
				case 20:
				return this.shockPoint(index,20,40,50);
				case 14:
				return this.shockPoint(index,60,30,40);
				case 25:
				return Math.max( Math.abs(this.intensity-this.rus)-20,0)*10;
				case 2:
				return (this.moveData[8]>4)? Math.max(60-this.moveData[8],0) : 0;
				case 90:
				return Math.max(this.intensity-200,0) /2
				case 40:
				return this.shockPoint(index,20,30,40);
				case 44:
				return this.shockPoint(index,20,60);
				case 60:
				return this.shockPoint(index,100,60,100);
				return this.shockPoint(index,10,30,50);
				case 98:
				return this.shockPoint(index,10,40);
				case 5:
				return this.shockPoint(index,50,50);
				case 3:
				return this.shockPoint(index,20,40,50);
			}
			if (index>60&& index<90)
			{
				if (index%2==0) return 0;

				return this.shockPoint(index,(15-Math.abs(75-index))*2,40,(40+index-60));
			}

			if (index>30&& index<50)
			{
				if (index%2==0) return 0;

				return this.shockPoint(index,(15-Math.abs(40-index))*2,40,(40+index-60));
			}
			if (this.intensity-this.rus>60)
			{
				this.shock =true;
			}
			return Math.max(this.data[index%16]-45,0);
		}
		,shockPoint(index,size,sox,max=1000)
		{
			if (Math.abs(this.intensity-this.rus)>sox && Math.abs(this.intensity-this.rus)<max)
				{
					 	return this.moveData[index]=size  ;
				}else 
				 
				if (Math.abs(this.moveData[index])>5)
				 return this.moveData[index]-5;
				else return 0;
		}
}

window.Circle = Circle;

})(window);