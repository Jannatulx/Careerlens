import logo from "../assets/careerlens-logo.png";
import "./Nav.css";


export default function Navbar(){

return(

<nav className="navbar">

<div className="nav-container">


{/* Logo */}

<a href="#home" className="logo-area">

<img src={logo} alt="CareerLens"/>

<div>
<h2>CareerLens</h2>
<p>Career Growth Platform</p>
</div>

</a>





{/* Menu */}

<div className="nav-menu">


<a href="#features">
Features
</a>


<a href="#how-it-works">
How It Works
</a>


<a href="#opportunities">
Opportunities
</a>


<a href="#recruiters">
For Recruiters
</a>


</div>






{/* Action */}

<div className="nav-actions">


<button className="signin-btn">

Sign In

</button>



<button className="signup-btn">

Get Started →

</button>


</div>



</div>

</nav>


)

}