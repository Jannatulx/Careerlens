import logo from  "../../assets/logo.png";;

export const HOME_URL = import.meta.env.VITE_LANDING_URL || "/";

export default function Logo({ light = false }) {
  return (
    <a href={HOME_URL} className={"logo-area" + (light ? " logo-area--light" : "")} aria-label="CareerLens home">
      <img src={logo} alt="" />
      <span>
        <strong>CareerLens</strong>
        <small>Career Growth Platform</small>
      </span>
    </a>
  );
}
