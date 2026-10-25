export default function Marquee({ items = ['Estratégia', 'Design', 'Tecnologia', 'Movimento'], inverted = false }) {
  const content = [...items, ...items];
  return (
    <div className={`marquee ${inverted ? 'marquee--inverted' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {content.map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i>✦</i></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
