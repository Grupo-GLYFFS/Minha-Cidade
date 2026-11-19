import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoBusca from '../servicos/CampoBusca';
import classes from './HeroiInicio.module.css';

// Cabeçalho do Início: faixa azul centralizada com "Olá, <primeiro nome>", "Um resumo da sua
// cidade" e a busca grande, que leva ao catálogo de Serviços já buscando (/servicos?q=…).
// Recebe o primeiro nome da pessoa (vazio para visitante: só "Olá").
export default function HeroiInicio({ primeiroNome }) {
  const [texto, setTexto] = useState('');
  const navegar = useNavigate();

  // Leva para Serviços com o texto da busca (sem texto, abre o catálogo inteiro)
  function buscar() {
    const busca = texto.trim();
    navegar(busca ? `/servicos?q=${encodeURIComponent(busca)}` : '/servicos');
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
            valor={texto}
            aoMudar={setTexto}
            aoEnviar={buscar}
            grande
          />
        </div>
      </div>
    </section>
  );
}
