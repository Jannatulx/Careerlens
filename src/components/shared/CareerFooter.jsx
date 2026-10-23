
import './CareerFooter.css';

const headlines = [
  ['Build Skills', 'Unlock Potential'],
  ['Dream Big', 'Start Somewhere'],
  ['Discover Your Path', 'Make Your Move'],
];

const highlights = [
  'Skill Growth',
  'Career Confidence',
  'Better Opportunities',
  'Your Future, In Motion',
];

export default function CareerFooter() {
  return (
    <footer className="clf-footer">

      {/* Upper lane: Right to Left */}
      <div className="clf-marquee clf-marquee--top">
        <div className="clf-track clf-track--left">
          {[0, 1].map((copy) => (
            <div className="clf-set" key={copy}>
              {headlines.map(([first, second], index) => (
                <span
                  className="clf-headline"
                  key={`${copy}-${index}`}
                >
                  {first}
                  <b className="clf-spark">✳</b>
                  {second}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="clf-divider" />

      {/* Lower lane: Left to Right */}
      <div className="clf-marquee clf-marquee--bottom">
        <div className="clf-track clf-track--right">
          {[0, 1].map((copy) => (
            <div className="clf-set" key={copy}>
              {highlights.map((text, index) => (
                <span
                  className="clf-highlight"
                  key={`${copy}-${index}`}
                >
                  <span className="clf-dot">●</span>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
}
