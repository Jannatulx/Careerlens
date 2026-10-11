import { useEffect, useState } from "react";
import "./Hero.css";


import img1 from "../assets/student.png";
import img2 from "../assets/resume.png";
import img3 from "../assets/career.png";


export default function Hero(){


const images=[img1,img2,img3];


const [current,setCurrent]=useState(0);



useEffect(()=>{


const timer=setInterval(()=>{


setCurrent((prev)=>(prev+1)%images.length);


},5000);



return()=>clearInterval(timer);


},[]);




return(

<section className="hero">


{/* Background Slider */}


<div className="hero-background">


{

images.map((img,index)=>(


<img

key={index}

src={img}

className={

index===current ?

"active"

:

""

}

/>


))

}



</div>




{/* Overlay */}


<div className="hero-overlay"></div>






{/* Content */}


<div className="hero-content">



<span className="badge">

Career Growth Platform

</span>




<h1>

From Your Skills

<br/>

<span>

To Your Next Opportunity.

</span>


</h1>




<p>

CareerLens helps students analyze their CV,
understand their skills, identify gaps,
and discover the right career opportunities.

</p>





<div className="buttons">


<button>

Analyze My CV

</button>


<button className="outline">

Explore Opportunities

</button>



</div>





</div>



</section>


)


}