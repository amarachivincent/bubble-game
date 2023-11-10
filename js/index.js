

count=0;
score=0;
names=[];
letters=[];
colors=[];



function getSettings()
{
	input=window.location.search;

	if(input.indexOf('choice')==7)
	{
       	l=input.slice(input.indexOf('length'),(input.indexOf('action')-1)).split('=')[1];
       return {'word':undefined,'speed':1000,'length':l}
	}
	else{


	w=input.slice(1,(input.indexOf('choice')-1)).split('=')[1];
	s=input.slice(input.indexOf('choice'),(input.indexOf('length')-1)).split('=')[1];
  	l=input.slice(input.indexOf('length'),(input.indexOf('action')-1)).split('=')[1];
     return {'word':w,'speed':s,'length':l}

       }

}


init(getSettings().length,getSettings().word);


function init(num=26,filter)
{ 
  
 
   if (filter)
   	{
        for(var i=0;i<filter.length;i++)
        {

        	letters.push(filter.trim().charAt(i));
        	num=filter.length;

        }

   	}else{

		for (i = 65; i <= 90; i++) {
		    letters.push(String.fromCharCode(i));
		    if(getSettings().length && getSettings().length<=26)
		    	{
                  num=getSettings().length;
		    	}else{
                  num=26;
		    	}
		 
		}

  }


	for(var i=0;i<num;i++)
	{

	 names.push('one'+i);
	 colors[i]=('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*55)+','+Math.floor(Math.random()*155)+')');
	}



}


function Ball(name,left,text,color,count){


this.left=left;
this.text=text;
this.color=color;
this.count=count;
this.name=name;

topd=document.createElement('div');
topd.id=this.name;
document.body.appendChild(topd);


this.getBall=function(){

	elem=document.createElement('div');
	att=document.createAttribute('class');
	att.value=this.name;
	elem.setAttributeNode(att);
	elem.appendChild(document.createTextNode(this.text));
    elem.style.left=this.left+'px';
	elem.style.position='relative';
	elem.style.background=this.color;
	elem.style.color='white';
	elem.style.width='20px';
	elem.style.borderRadius='200px';
	elem.style.top=this.count+'px';
	elem.style.padding='10px';
	elem.style.textAlign='center';
	topd.appendChild(elem);
	return topd;

}


return this;


}


function shuffle(){


	for(var i=0;i<names.length;i++)
	{
	    screen=Math.floor(Math.random()*1200);
		xi=new Ball(names[i],screen,letters[i].toUpperCase(),colors[i],count);
		document.body.replaceChild(xi.getBall(),document.getElementById(names[i]));
	}

        instance=xi;
   
}



bounce=()=>{

	count+=10;
	speed=document.getElementById('speed');
	replay=document.getElementById('replay');

        
	speed.innerHTML='Speed: '+ count;
	if(count==400)
	{

	  speed.innerHTML='GAME OVER';
	
    
	  count=0;

      speed.style.color='red';
	  speed.style.fontSize='25px';
	  clearInterval(id);

	}
	  shuffle();

	  replay.innerHTML='<a href="index.html">'+' '+'Settings</a>';


}



document.addEventListener('keypress',function(event){


balls=document.querySelectorAll('div');



   for(var i=0;i<balls.length;i++)
   {
       

  
     if(event.key.toUpperCase()==balls[i].innerHTML){

      instance.count-=10;
      score+=1;
     document.getElementById('score').innerHTML=Math.floor((score/balls.length)*100);   
     document.getElementById('container').innerHTML=event.key.toUpperCase();
     document.getElementById('container').style.background='black';
     document.getElementById(balls[i].parentNode.id).removeChild(document.querySelector("."+balls[i].className+""));


     }

   }




});




id=setInterval(bounce,getSettings().speed);

