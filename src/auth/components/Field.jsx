import { useState } from "react";
import Icon from "./Icons";

export default function Field({ id, label, icon, error, type = "text", children, hint, ...rest }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div className={"field" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      <div className="control">
        {icon && <span className="lead-ic"><Icon n={icon} size={18} /></span>}
        {children ? (
          children
        ) : (
          <input id={id} type={isPw && show ? "text" : type} aria-invalid={!!error}
            aria-describedby={error ? id + "-err" : undefined} {...rest} />
        )}
        {isPw && (
          <button type="button" className="eye" onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}>
            <Icon n={show ? "eyeOff" : "eye"} size={18} />
          </button>
        )}
      </div>
      {hint && !error && <p className="hint-txt">{hint}</p>}
      {error && (
        <p className="err" id={id + "-err"} role="alert">
          <Icon n="alert" size={14} /> {error}
        </p>
      )}
    </div>
  );
}
