import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { ArrowRight, ArrowUpRight } from '../ui/Icons';
import { RevealHeading, SectionLabel } from '../ui/SectionHeading';
import { contactEmail } from '../../data/content';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [mailLink, setMailLink] = useState('');
  const [messageText, setMessageText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const reducedMotion = useReducedMotion();
  const hasEndpoint = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setCopied(false);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const text = `Nome: ${data.name}\nE-mail: ${data.email}\nEmpresa: ${data.company || 'Não informada'}\nInvestimento: ${data.budget}\n\n${data.message}`;
    setMessageText(text);

    if (!hasEndpoint) {
      const subject = encodeURIComponent(`Novo projeto — ${data.name}`);
      setMailLink(`mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(text)}`);
      setStatus('ready');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Não foi possível enviar.');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('idle');
      setError('A mensagem não foi enviada. Tente novamente ou escreva diretamente para nosso e-mail.');
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = messageText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopied(true);
  };

  return (
    <section id="contato" className="contact" data-bg="#0a0910" aria-labelledby="contact-title">
      <div className="section-shell">
        <div className="contact__top"><SectionLabel number="06">Nova transmissão</SectionLabel><span>SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</span></div>
        <RevealHeading id="contact-title" className="contact__title" lines={['VAMOS CRIAR', 'ALGO RARO?']} />
        <div className="contact__layout">
          <div className="contact__aside" data-parallax="30">
            <p>Conte o que você imagina.<br />A gente responde em até dois dias úteis.</p>
            <a href={`mailto:${contactEmail}`} data-cursor="interactive">{contactEmail}<ArrowUpRight /></a>
            <div className="contact__availability"><i /><span>Agenda aberta para<br /><b>projetos a partir de jan/27</b></span></div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <input id="name" name="name" type="text" placeholder=" " autoComplete="name" required minLength={2} />
                <label htmlFor="name">Seu nome *</label><span className="form-field__line" />
              </div>
              <div className="form-field">
                <input id="email" name="email" type="email" placeholder=" " autoComplete="email" required />
                <label htmlFor="email">Seu e-mail *</label><span className="form-field__line" />
              </div>
            </div>
            <div className="form-field">
              <input id="company" name="company" type="text" placeholder=" " autoComplete="organization" />
              <label htmlFor="company">Marca ou empresa</label><span className="form-field__line" />
            </div>
            <fieldset className="form-budget">
              <legend>Uma faixa de investimento</legend>
              <div>
                {['R$ 20—40k', 'R$ 40—80k', 'R$ 80k+', 'Vamos conversar'].map((budget, index) => (
                  <label key={budget}><input type="radio" name="budget" value={budget} defaultChecked={index === 3} /><span>{budget}</span></label>
                ))}
              </div>
            </fieldset>
            <div className="form-field form-field--textarea">
              <textarea id="message" name="message" placeholder=" " rows="3" required minLength={10} />
              <label htmlFor="message">Um pouco sobre o desafio *</label><span className="form-field__line" />
            </div>
            <div className="contact-form__submit">
              <Magnetic type="submit" className="submit-button" disabled={status === 'sending'}>
                <span>{status === 'sending' ? 'Enviando...' : hasEndpoint ? 'Enviar mensagem' : 'Preparar mensagem'}</span><ArrowRight />
              </Magnetic>
              <p>{hasEndpoint ? 'Seus dados são usados apenas para responder ao contato.' : 'Você revisa e envia pelo seu aplicativo de e-mail.'}</p>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <AnimatePresence mode="wait">
              {(status === 'ready' || status === 'sent') && (
                <motion.div
                  className="form-success"
                  role="status"
                  key={status}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div><span>✦</span><p><b>{status === 'sent' ? 'Mensagem enviada.' : 'Sua mensagem está pronta.'}</b><br />{status === 'sent' ? 'Obrigado. Em breve entramos em contato.' : 'Nada foi enviado ainda. Escolha como continuar:'}</p></div>
                  {status === 'ready' && <div className="form-success__actions"><a href={mailLink} data-cursor="interactive">Abrir no e-mail <ArrowUpRight /></a><button type="button" onClick={copyMessage} data-cursor="interactive">{copied ? 'Copiada ✓' : 'Copiar mensagem'}</button></div>}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
