import "./Features.css";
import { motion } from "framer-motion";


import cvImg from "../assets/cv.png";
import skillImg from "../assets/skills.png";
import matchImg from "../assets/matching.png";
import trackerImg from "../assets/tracker.png";
import analyticsImg from "../assets/analytics.png";


const features = [

{
title:"AI CV Analyzer",
image:cvImg,
description:
"Upload your CV and receive detailed feedback about your strengths, weaknesses and career readiness score."
},


{
title:"Skill Gap Analysis",
image:skillImg,
description:
"Identify missing skills for your desired career path and get personalized recommendations to improve."
},


{
title:"Smart Opportunity Matching",
image:matchImg,
description:
"Discover internships and jobs that match your skills, interests and career goals."
},


{
title:"Application Tracker",
image:trackerImg,
description:
"Track applications, interviews and career progress from one organized dashboard."
},


{
title:"Career Analytics",
image:analyticsImg,
description:
"Measure your growth, monitor improvements and understand your career readiness."
}

];



export default function Features(){


return(

<section className="features-section" id="features">


<div className="features-heading">

<span>
FEATURES
</span>


<h2>
Everything You Need For Career Growth
</h2>


<p>
Powerful tools to analyze skills, improve readiness,
and discover the right opportunities.
</p>


</div>





<div className="features-wrapper">


{

features.map((item,index)=>(


<div

className={`feature-row ${
index % 2 !== 0 ? "reverse" : ""
}`}

key={index}

>


{/* IMAGE */}


<motion.div

className="feature-image"

initial={{

opacity:0,

x:index % 2 === 0 ? -120 : 120

}}

whileInView={{

opacity:1,

x:0

}}

transition={{

duration:.8,

ease:"easeOut"

}}

viewport={{
once:true,
amount:.3
}}

>


<div className="image-bg">

<img

src={item.image}

alt={item.title}

/>

</div>


</motion.div>







{/* TEXT */}


<motion.div


className="feature-content"


initial={{

opacity:0,

x:index % 2 === 0 ? 120 : -120

}}


whileInView={{

opacity:1,

x:0

}}


transition={{

duration:.8,

delay:.15

}}


viewport={{
once:true,
amount:.3
}}



>


<h3>
{item.title}
</h3>


<p>
{item.description}
</p>



<button>
Explore →
</button>


</motion.div>




</div>


))


}


</div>



</section>


)

}