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
"Analyze your CV and get AI-powered feedback about your skills and career readiness."
},


{
title:"Skill Gap Analysis",
image:skillImg,
description:
"Identify missing skills and get personalized learning recommendations."
},


{
title:"Smart Opportunity Matching",
image:matchImg,
description:
"Find internships and jobs matched with your skills and goals."
},


{
title:"Application Tracker",
image:trackerImg,
description:
"Manage applications, interviews and career progress."
},


{
title:"Career Analytics",
image:analyticsImg,
description:
"Measure improvement and track your career growth."
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
Powerful tools designed to help students build a successful career.
</p>


</div>





<div className="features-slider">


{

features.map((item,index)=>(


<motion.div

className="feature-card"

key={index}


initial={{

opacity:0,

x:80

}}


whileInView={{

opacity:1,

x:0

}}


transition={{

duration:.5,

delay:index*.1

}}


viewport={{

once:true

}}



>


<div className="feature-image">


<img

src={item.image}

alt={item.title}

/>


</div>




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


))


}


</div>



</section>


)

}