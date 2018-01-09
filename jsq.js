var boxarry=new Array();
var boomarry=new Array();
var max=5;//棋盘宽高 
var bommnumb=5;// 炸弹数量
var cantc=false;
var maxnum;
function add(){
	max = parseInt($("input1").value);
	bommnumb = parseInt($("input2").value);
	if($("input1").value=""||$("input2").value="")
	{max=5;bommnumb=5;}
	if(max>12){
		$("input1").value="";
		$("input2").value="";
		$("show").innerHTML="煞笔吗!!!放不下啦！";
		add();
	}
	if(bommnumb>=max*max)
	{
		$("input1").value="";
		$("input2").value="";
		$("show").innerHTML="煞笔吗!!!地雷这么多！";
		add();
	}
	maxnum=max*max;
	cantc=false;
	$("box").style.width=52*max+"px";
	for(var i=0;i<max+2;i++)
	{	
		boxarry[i]=new Array();
		for(var j=0;j<max+2;j++)
			boxarry[i][j]=-99;
	}
	for(var n=0;n<max*max;n++)
	{	
		$("box").innerHTML+="<div class='divb' id='d"+n+"' onclick='onck(this.id)'></div>";
	}
	radoms();
}
function replay(){
	$("box").innerHTML='</div> <div id="show"></div> <div class="gamehd"><input type="button" value="重开" onclick="replay()"/>';
	boomarry=new Array();
	add();
}
function radoms(){
	while(boomarry.length<bommnumb)
	{
		var isc=false;
		var rad=Math.floor(Math.random()*max*max);
		for(var i=0;i<boomarry.length;i++)
			if(rad==boomarry[i])
				isc=true;
		if(!isc)
			boomarry[boomarry.length]=rad;
	}
	writbox();
}
function writbox(){
	for(var n=0;n<boomarry.length;n++)
	{
		//炸弹用*显示
		//$("d"+boomarry[n]).innerHTML="*";
		boxarry[Math.floor(parseInt((boomarry[n])/max))+1][parseInt((boomarry[n])%max)+1]=-1;
	}
	
	var one=1;
	for(var i=1;i<max+1;i++)
	{	for(var j=1;j<max+1;j++)
		{
			var bomnum=0;
			if(boxarry[i][j]!=-1)
			{	if(j-1>=0&&i-1>=0)
				{	//左上  上 右上  左 右 左下 下 右下
					if(parseInt(boxarry[i-1][j-1])==-1)
						bomnum++;
					if(parseInt(boxarry[i-1][j])==-1)
						bomnum++;
					if(parseInt(boxarry[i-1][j+1])==-1)
						bomnum++;
					if(parseInt(boxarry[i][j-1])==-1)
						bomnum++;
					if(parseInt(boxarry[i][j+1])==-1)
						bomnum++;
					if(parseInt(boxarry[i+1][j-1])==-1)
						bomnum++;
					if(parseInt(boxarry[i+1][j])==-1)
						bomnum++;
					if(parseInt(boxarry[i+1][j+1])==-1)
						bomnum++;
				}	
				// if(bomnum!=0)//不显示0
				// {
				boxarry[i][j]=bomnum;
					//显示周围炸弹数量
					//$("d"+((i-1)*max+j-1)).innerHTML=bomnum;
				// }
			}
		}
	}
}
var firstClickBoom;
function fbn(ne){
	replay();
	onck(ne);
}
function onck(str){
	if(!cantc){
		var id=str.substr(1);
		var x=Math.floor(parseInt(id)/(max))+1;
		var y=parseInt(id)%(max)+1;
		
		var nm=boxarry[x][y];
		
		if(nm!=-99)
		{
			$(str).style.backgroundImage="url(images/blank.png)";
			$(str).innerHTML=nm;
			boxarry[x][y]=-99;
			maxnum--;
			if(nm==0)
			{
				$(str).innerHTML="";
				isblank(id);
			}
			
		}
		for(var i=0;i<boomarry.length;i++)
			if(id==boomarry[i])
			{
				if(maxnum==max*max-1)
					fbn(str);
				else {
					$(str).style.backgroundImage="url(images/boom.png)";
					$(str).innerHTML="";
					$("show").innerHTML="GaLi GayGay";
					cantc=true;
					maxnum++;
				}
				
			}
		if(maxnum==bommnumb)
		{
			$("show").innerHTML="恭喜你！扫雷成功！";
			cantc=true;
		}
	}
}

function isblank(id){
	var x=Math.floor(parseInt(id)/(max))+1;
	var y=parseInt(id)%(max)+1;
	if(boxarry[x+1][y] !=-99 )
		onck("d"+(parseInt(id)+parseInt(max)));
	if(boxarry[x-1][y] !=-99 )
		onck("d"+(parseInt(id)-parseInt(max)));
	if(boxarry[x][y+1] !=-99 )
		onck("d"+(parseInt(id)+1));
	if(boxarry[x][y-1] !=-99 )
		onck("d"+(parseInt(id)-1));
}

function $(id){
	return document.getElementById(id);
}
