import { useState } from "react";
import { motion } from "framer-motion";
import { Rv } from "./ui";
import "./Play.css";


const ROLES = {


"MERN Developer":{

score:82,

have:[
"HTML",
"CSS",
"JavaScript",
"React",
"MongoDB"
],

need:[

["Node.js","High","Backend fundamentals"],
["Express.js","High","REST API development"],
["Authentication","Medium","JWT & security"],
["Deployment","Medium","Docker & CI/CD"]

],

tip:
"Your frontend foundation is strong. Improve backend architecture and deployment skills to become job-ready."

},



"Data Analyst":{

score:68,

have:[
"Python",
"SQL",
"Excel",
"Git"
],

need:[

["Pandas","High","Data cleaning & analysis"],
["Statistics","High","Data interpretation"],
["Power BI","Medium","Dashboard creation"]

],

tip:
"Build real data projects and showcase insights to improve your profile."

},




"Cybersecurity":{

score:61,

have:[
"Linux",
"Python",
"Networking",
"C"
],

need:[

["Web Security","High","OWASP Top 10"],
["Pen Testing","High","Security labs"],
["SIEM Basics","Medium","Log monitoring"]

],

tip:
"Practice security labs and document your projects for recruiters."

}


};






export default function Play(){


const [role,setRole]=useState("MERN Developer");


const data=ROLES[role];



return(

<section className="play-section" id="play">


<div className="play-container">


<Rv>

<span className="play-tag">
AI SKILL GAP ANALYZER
</span>


<h2>
Discover Your Career Readiness
</h2>


<p>
Select your target role and AI will identify your strengths,
skill gaps and learning path.
</p>


</Rv>






<div className="play-dashboard">





{/* LEFT */}



<motion.div

className="skill-panel"

initial={{
opacity:0,
x:-80
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.7
}}

viewport={{
once:true
}}

>




<div className="role-tabs">


{

Object.keys(ROLES).map(item=>(


<button

key={item}

className={
role===item?"active":""
}

onClick={()=>setRole(item)}

>

{item}

</button>


))


}

</div>







<div className="score-box">


<div className="circle">


<div>

<h3>
{data.score}%
</h3>


<span>
Career Ready
</span>


</div>


</div>


</div>






<h4>
Your Current Skills
</h4>




<div className="chips">


{

data.have.map((skill,index)=>(


<span

key={skill}

style={{
animationDelay:`${index*100}ms`
}}

>

✓ {skill}

</span>


))


}


</div>



</motion.div>









{/* RIGHT */}



<motion.div

className="gap-panel"

initial={{
opacity:0,
x:80
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.7,
delay:.15
}}

viewport={{
once:true
}}

>




<div className="ai-header">


<div>

<span>
AI ANALYSIS
</span>


<h3>
Your Skill Roadmap
</h3>


</div>


<div className="scan">
AI
</div>


</div>







{

data.need.map(item=>(


<div

className="skill-gap"

key={item[0]}

>


<div>


<h4>
{item[0]}
</h4>


<p>
{item[2]}
</p>


</div>




<span className={item[1]}>
{item[1]}
</span>


</div>


))


}







<div className="ai-insight">


<strong>
✦ AI Recommendation
</strong>


<p>
{data.tip}
</p>


</div>




</motion.div>




</div>



</div>


</section>


)

}