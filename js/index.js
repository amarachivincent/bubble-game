

screenY=0;
score=0;
names=[];
letters=[];
colors=[];
timer=0;


function getSettings()
{
	input=window.location.search;

	if(input.indexOf('choice')==7)
	{
       	l=input.slice(input.indexOf('length'),(input.indexOf('action')-1)).split('=')[1];
       	timer=1000;
       return {'word':undefined,'timer':1000,'length':l}
	}
	else{


	w=input.slice(1,(input.indexOf('choice')-1)).split('=')[1];
	s=input.slice(input.indexOf('choice'),(input.indexOf('length')-1)).split('=')[1];
  	l=input.slice(input.indexOf('length'),(input.indexOf('action')-1)).split('=')[1];
  	timer=s;
     return {'word':w,'timer':s,'length':l}

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


function Ball(name,screenx,text,color,screenY){


this.left=screenx;
this.text=text;
this.color=color;
this.screenY=screenY;
this.name=name;

topd=document.createElement('div');
topd.id=this.name;
document.body.appendChild(topd);


this.getBall=function(){

	elem=document.createElement('button');
	att=document.createAttribute('class');
	att.value=this.name;
	elem.setAttributeNode(att);
	elem.appendChild(document.createTextNode(this.text));
    elem.style.left=this.left+'px';
	elem.style.position='relative';
	elem.style.background=this.color;
	elem.style.color='white';
	elem.style.borderRadius='12px';
	elem.style.top=this.screenY+'px';
	elem.style.padding='12px';
	elem.style.border='1px solid white';
	elem.style.textAlign='center';
	topd.appendChild(elem);
	return topd;

}

return this;


}


function shuffle(screeny){


	for(var i=0;i<names.length;i++)
	{
	    screenX=Math.floor(Math.random()*1200);
		xi=new Ball(names[i],screenX,letters[i].toUpperCase(),colors[i],screeny);
		document.body.replaceChild(xi.getBall(),document.getElementById(names[i]));
	}

        instance=xi;
 
	   
   
}



bounce=()=>{
		    
 


	speed=document.getElementById('speed');
	replay=document.getElementById('replay');	     	
     
	   

			screenY+=50;
		    shuffle(screenY);
       
			if(screenY>=350)
			{

			  speed.innerHTML='GAME OVER';

			  screenY=0;
		      speed.style.color='red';
			  speed.style.fontSize='25px';		
		      stopGame(id);
			}else{


			speed.innerHTML='Speed: '+ (timer/1000);

		     id=setTimeout(bounce,timer)
		    }	

 

            document.getElementById('score').innerHTML=Math.floor(score); 
		    replay.innerHTML='<a href="index.html">'+' '+'Settings</a>';
		    

	     
}

document.addEventListener('click',function(event){


balls=document.querySelectorAll('button');
container=document.getElementById('container');


   for(var i=0;i<balls.length;i++)
   {
       
    
  
     if(event.target.innerHTML.toUpperCase()==balls[i].innerHTML){

  

      if(timer>0)
      {

    	timer-=20;

      }

     if(screenY>0)
      {
      	screenY-=10;
      }

      score+=1;
      
    
     container.innerHTML=event.target.innerHTML.toUpperCase();
     container.style.background='black';
     document.getElementById(balls[i].parentNode.id).removeChild(document.querySelector("."+balls[i].className+""));

     }


      document.getElementById('score').innerHTML=Math.floor(score);  
   }



});



document.addEventListener('keypress',function(event){



balls=document.querySelectorAll('button');
container=document.getElementById('container');


   for(var i=0;i<balls.length;i++)
   {
       
    
  
     if(event.key.toUpperCase()==balls[i].innerHTML){

  

      if(timer>0)
      {

    	timer-=20;

      }

     if(screenY>0)
      {
      	screenY-=10;
      }

      score+=1;
      
    
     container.innerHTML=event.key.toUpperCase();
     container.style.background='black';
     document.getElementById(balls[i].parentNode.id).removeChild(document.querySelector("."+balls[i].className+""));

     }


      document.getElementById('score').innerHTML=Math.floor(score);  
   }



});


function stopGame(id)
{

	clearTimeout(id)
}

id=setTimeout(bounce,3000);

