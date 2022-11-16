var colors = "264653-2a9d8f-e9c46a-f4a261-e76f51-599AA6".split("-").map(a=>"#"+a)	//色票
var song
var songIsplay=false
var amp
var a
class LOVELY{
	constructor(args){  //接收下面參數的值 || 如果值沒傳成功的預設值
		this.r = args.r || random(150) //直徑
		this.p = args.p || {x:random(width),y:random(height)}  //位置
		this.v = {x:random(-1,1),y:random(-1,1)}  //速率
		this.a = args.a || {x:0,y:0}
		this.color = random(colors)
		this.mode = random(["happy","sleepy"])
		this.rid = random(10000) //讓每一個物件都不一樣的動
	}
	draw()  //繪製
	{
		push()
			translate(this.p.x,this.p.y)
			fill(this.color)
			noStroke()
			ellipse(0,0,this.r,(this.r-this.r/10)); //頭
			rectMode(CENTER)
			rect(-this.r/2.5,-this.r/2.5,this.r/3)
			circle(-this.r/1.8,-this.r/2.5,this.r/3)
			circle(-this.r/2.5,-this.r/1.8,this.r/3);	//左耳
			rect(this.r/2.5,-this.r/2.5,this.r/3)
			circle(this.r/1.8,-this.r/2.5,this.r/3)
			circle(this.r/2.5,-this.r/1.8,this.r/3);	//右耳
			fill(255)
			ellipse(-this.r/6.3,-this.r/30,this.r/2.5)
			ellipse(this.r/6.3,-this.r/30,this.r/2.5)
			arc(0,0,this.r/1.4,this.r/1.5,0,PI);	//臉
		if(this.mode=="happy"){
			fill(255)
			strokeWeight(this.r/100)
			stroke(0)
			circle(this.r/6.3,this.r/50,this.r/6)
			circle(-this.r/6.3,this.r/50,this.r/6);	//眼白
			noStroke()
			fill(20)
			circle(this.r/6.6,this.r/60,this.r/7)
			circle(-this.r/6.6,this.r/60,this.r/7);	//眼珠
			fill(255)
			circle(this.r/6.6+map(mouseX,0,width,-5,5),0+map(mouseY,0,height,-5,5),this.r/24)
			circle(-this.r/6.6+map(mouseX,0,width,-5,5),0+map(mouseY,0,height,-5,5),this.r/24);	//眼睛反光
			fill(227,84,49)
			if(!songIsplay)
			{
				arc(0,this.r/10,this.r/10,this.r/30,0,PI)	//音樂沒撥放時微笑
			}
			else
			{
				arc(0,this.r/10,this.r/10,this.r/a,0,PI);	//音樂有撥放時開口
			}
		}
		else
		{
			fill(255,174,185)
			ellipse(this.r/6.3,this.r/10,this.r/10,this.r/18)
			ellipse(-this.r/6.3,this.r/10,this.r/10,this.r/18);	//腮紅
			noFill()
			strokeWeight(2)
			stroke(0)
			arc(this.r/6.3,0,this.r/7,this.r/20,0,PI)
			arc(-this.r/6.3,0,this.r/7,this.r/20,0,PI);	//眼睛
			stroke(227,84,49)
			arc(0,this.r/13,this.r/8,this.r/30,0,PI)	//嘴巴
		}
		pop()
	}
	update(){	//運作的動作
		this.p.x += this.v.x  //this.p.x = this.p.x + this.v.x
		this.p.y += this.v.y  //this.p.y = this.p.y + this.v.x
		this.v.x = this.v.x + this.a.x
		this.v.y = this.v.y + this.a.y;	
		if(this.mode=="happy"){
			this.p.y+=sin(frameCount/(10+this.rid/100))*5 //利用sin()函數做上下隨機程度跳動
		}
		if(this.mode=="sleepy"){			
			this.v.x+=random(-3,3)
			this.v.y+=random(-3,3)
		}
		this.v.x*=0.999
		this.v.y*=0.999
		if(this.p.y>height){
			this.v.y = -abs(this.v.y)
		}
	}
	setSleepy(){
		this.mode="sleepy"
	}
	isLOVELYInRange(){	//鼠標觸碰到物件時更改物件模式
		let d=dist(mouseX,mouseY,this.p.x,this.p.y)
		if(d<this.r){
			return true
		}
		else
		{
			return false
		}
	}
	setMode(mode){
		this.mode="sleepy"
	}
}
function preload(){
	song=loadSound("TWICE - Say Yes (Clean Instrumental).mp3");
}
function mousePressed(){
	lovely=new LOVELY({  //滑鼠按一下，產生一個新的物件
			r:random(100,200),
			p:{x:mouseX,y:mouseY}
		})
	lovelys.push(lovely)
	if(!songIsplay){
		song.play();
		songIsplay=new p5.Amplitude()
	}else{
			song.pause()
			songIsplay=false
		}
}
var lovely
var lovelys=[]
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)
	amp=new p5.Amplitude()
	for(var i=0;i<20;i++){	//lovely數量
		lovely=new LOVELY({r:random(100,200)})    //傳參數過去上面	//產生一個新的Lovely class元件
		lovelys.push(lovely)
	}
}
function draw() {
	background(0)
	//for(var i =0;i<lovelys.length;i++){
		//let lovely = lovelys[i]
	for(let lovely of lovelys){
		lovely.draw()  //呼叫class裡面的function
		let vol=amp.getLevel();
			a=map(vol,-1,1,10,1)
		lovely.update()  
		if(lovely.isLOVELYInRange())
		{
			lovely.color="#FF60AF"
			lovely.setMode("sleepy")
		}
	}
}