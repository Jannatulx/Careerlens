import "./Marquee.css";


const items = [

"Remote Jobs",

"AI Career Matching",

"MERN Developer",

"Frontend Internship",

"Skill Based Opportunities",

"Global Companies",

"Career Roadmap",

"Resume Analysis",

"Smart Hiring"

];



export default function Marquee(){


return(

<section className="marquee-section">


<div className="marquee-container">


<div className="marquee-track">


{

[...items,...items].map((item,index)=>(


<div 
className="marquee-card"
key={index}
>


<span>
✓
</span>


{item}


</div>


))


}


</div>


</div>


</section>


)

}