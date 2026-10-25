export function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? 'section-label--dark' : ''}`}>
      <span>{number}</span>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  );
}

export function RevealHeading({ lines, id, className = '', as: Tag = 'h2' }) {
  return (
    <Tag id={id} className={`reveal-heading ${className}`} data-reveal-heading>
      {lines.map((line) => (
        <span className="reveal-mask" key={line}>
          <span className="reveal-line">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
