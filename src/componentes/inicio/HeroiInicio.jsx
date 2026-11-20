import { useState } from 'react';
import CampoBusca from '../servicos/CampoBusca';
import PopupBusca from '../servicos/PopupBusca';
import classes from './HeroiInicio.module.css';

// Cabeçalho do Início: faixa azul centralizada com "Olá, <primeiro nome>", "Um resumo da sua
// cidade" e a busca grande. A busca só abre o popup da lupa do topo (PopupBusca), com o cursor
// já no campo dele: clique ou toque, Enter, espaço ou "Buscar". Uma letra digitada no campo
// abre o popup já com ela.
// Recebe o primeiro nome da pessoa (vazio para visitante: só "Olá").
export default function HeroiInicio({ primeiroNome }) {
  const [aberto, setAberto] = useState(false);
  const [textoInicial, setTextoInicial] = useState('');

  function abrir(texto = '') {
    setTextoInicial(texto);
    setAberto(true);
  }

  // Enter e espaço abrem o popup; uma letra abre e vai junto para o campo do popup
  function teclar(evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      abrir();
      return;
    }
    const letra = evento.key.length === 1 && !evento.ctrlKey && !evento.metaKey && !evento.altKey;
    if (letra) {
      evento.preventDefault();
      abrir(evento.key);
    }
  }

  return (
    <section className={classes.heroi} aria-labelledby="inicio-titulo">
      <div className={classes.miolo}>
        <h1 className={classes.titulo} id="inicio-titulo">
          {primeiroNome ? `Olá, ${primeiroNome}` : 'Olá'}
        </h1>
        <p className={classes.subtitulo}>Um resumo da sua cidade</p>
        <div className={classes.busca}>
          <CampoBusca
            id="busca-inicio"
            rotulo="Buscar serviços e informações"
            placeholder="O que você precisa? Ex.: IPTU, vacina, poda de árvore"
            valor=""
            aoMudar={() => {}}
            aoEnviar={() => abrir()}
            aoTeclar={teclar}
            onClick={() => abrir()}
            readOnly
            aria-haspopup="dialog"
            aria-expanded={aberto}
            grande
          />
        </div>
      </div>
      <PopupBusca
        aberto={aberto}
        aoFechar={() => setAberto(false)}
        textoInicial={textoInicial}
      />
    </section>
  );
}
