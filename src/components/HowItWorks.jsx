import { useState, useEffect } from "react";
import { Rv } from "./ui";
import "./How.css";


const STEPS = [

{
title:"Build Your Career Profile",
desc:"Create your personalized profile with education, skills, projects and career goals.",
items:[
"Profile completed ✓",
"Skills: React, JavaScript, MongoDB",
"Goal: Full Stack Developer"
]
},


{
title:"AI Career Analysis",
desc:"Our AI analyzes your CV and identifies strengths, weaknesses and skill gaps.",
items:[
"Career readiness: 82%",
"Strong: React & Problem Solving",
"Improve: Database & Communication"
]
},


{
title:"Smart Opportunity Matching",
desc:"Find internships and jobs ranked according to your skills and interests.",
items:[
"Frontend Intern — 94% match",
"MERN Developer — 87% match",
"Junior Developer — 82% match"
]
},


{
title:"Track Your Growth",
desc:"Manage applications and monitor your career improvement.",
items:[
"Applied → Shortlisted → Interview",
"Interview rate: 25%",
"Career score: 82% ↑ 8%"
]
}

];




export default function How(){


const [active,setActive]=useState(0);



useEffect(()=>{

const timer=setInterval(()=>{

setActive((prev)=>(prev+1)%STEPS.length);

},4000);


return ()=>clearInterval(timer);


},[]);





return(

<section className="how-section" id="how-it-works">


<div className="how-container">



<Rv>


<span className="how-tag">
HOW IT WORKS
</span>


<h2>
Your Career Journey
Made Simple.
</h2>


<p>
From profile creation to career growth,
CareerLens helps you move towards the right opportunity.
</p>


</Rv>





<div className="how-grid">



{/* LEFT SIDE */}


<div className="steps">


{

STEPS.map((step,index)=>(


<button

key={index}

className={`step-card ${
active===index ? "active":""
}`}


onClick={()=>setActive(index)}

>


<div className="step-number">

{index+1}

</div>



<div>

<h3>
{step.title}
</h3>


<p>
{step.desc}
</p>

</div>



</button>


))

}


</div>







{/* RIGHT DASHBOARD */}


<div className="career-preview">


<div className="preview-top">


<div>

<span>
CAREER INSIGHT
</span>


<h3>
{STEPS[active].title}
</h3>


</div>



<div className="live">

LIVE

</div>


</div>






{

STEPS[active].items.map((item,index)=>(


<div

className="insight-card"

key={index}

>


{item}


</div>


))


}







<div className="progress-area">


<p>
Career Readiness
</p>


<div className="progress-bar">


<span
style={{
width:`${70+active*6}%`
}}
/>


</div>


<h4>
{70+active*6}%
</h4>


</div>



</div>





</div>



</div>


</section>


)

}