import {useState} from "react";
import logo from "../assets/logo.png";
import "./Nav.css";


export default function Navbar(){


const [talentOpen,setTalentOpen]=useState(false);
const [active,setActive]=useState("");



return(

<nav className="navbar">

<div className="nav-container">



<a href="#home" className="logo-area">

<img src={logo} alt="CareerLens"/>

<div>

<h2>
CareerLens
</h2>

<p>
Career Growth Platform
</p>

</div>

</a>





<div className="nav-menu">





{/* FOR TALENT DROPDOWN */}

<div

className="dropdown"

onMouseEnter={()=>setTalentOpen(true)}

onMouseLeave={()=>setTalentOpen(false)}

>


<button>

For Talent <span>▾</span>

</button>




{

talentOpen &&

<div className="mega-menu">



<div>

<h5>
FIND OPPORTUNITIES
</h5>


<a>
Job Search
</a>

<p>
Find internships & jobs based on your skills
</p>



<a>
AI Career Match
</a>

<p>
Smart opportunity recommendations
</p>


</div>





<div>

<h5>
BUILD YOUR PROFILE
</h5>


<a>
AI CV Analyzer
</a>

<p>
Improve your CV score
</p>




<a>
Skill Gap Analysis
</a>

<p>
Know what skills to improve
</p>


</div>





<div>

<h5>
TRACK YOUR GROWTH
</h5>


<a>
Career Roadmap
</a>


<p>
Plan your career journey
</p>



<a>
Application Tracker
</a>


<p>
Manage applications easily
</p>


</div>






</div>


}


</div>


<a

href="#how-it-works"

className={active==="how"?"active":""}

onClick={()=>setActive("how")}

>

How It Works

</a>





<a

href="#features"

className={active==="features"?"active":""}

onClick={()=>setActive("features")}

>

Features

</a>





</div>








<div className="nav-actions">


<button className="signin-btn">

Sign In

</button>




<a

href="#cta"

className="signup-btn"

>

Get Started →

</a>



</div>




</div>

</nav>


)

}