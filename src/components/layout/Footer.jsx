import { useEffect, useState } from 'react';
import { socialLinks } from '../../data/content';
import { useSmoothScroll } from './SmoothScroll';
import { ArrowUpRight, OrbitMark } from '../ui/Icons';

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export default function Footer() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const timer = window.setInterval(() => setTime(timeFormatter.format(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="footer" data-bg="#07070a">
      <div className="section-shell">
        <div className="footer__top">
          <a href="#inicio" className="footer__brand" onClick={(event) => { event.preventDefault(); scrollTo(0); }} aria-label="NØVA — início"><OrbitMark /> NØVA®</a>
          <div className="footer__clock"><span>HORA LOCAL · SÃO PAULO</span><time aria-label={`Hora local em São Paulo: ${time}`}>{time} BRT</time></div>
          <button className="back-to-top" type="button" onClick={() => scrollTo(0)} data-cursor="interactive"><span>Voltar ao topo</span><ArrowUpRight /></button>
        </div>
        <div className="footer__middle">
          <div><span>SOCIAL</span>{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" data-cursor="interactive">{link.label}<ArrowUpRight size={14} /></a>)}</div>
          <div><span>BASE</span><p>São Paulo, Brasil<br />Trabalhando sem fronteiras.</p></div>
          <div><span>DISPONIBILIDADE</span><p>Projetos selecionados<br />a partir de janeiro de 2027.</p></div>
        </div>
        <div className="footer__wordmark" aria-hidden="true">NØVA<span>®</span></div>
        <div className="footer__bottom"><span>© 2026 NØVA STUDIO</span><span>FEITO COM INTENÇÃO, CAFÉ E CÓDIGO.</span><span>TODOS OS SINAIS RESERVADOS.</span></div>
      </div>
    </footer>
  );
}
