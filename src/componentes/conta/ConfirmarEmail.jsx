import { useEffect, useState } from 'react';
import Botao from '../Botao';
import CampoCodigo from './CampoCodigo';
import {
  ESPERA_REENVIO,
  TAMANHO_CODIGO,
  formatarEspera,
  gerarCodigo,
} from '../../logica/codigoEmail';
import classes from './FormularioConta.module.css';

// Passo "Confirme seu e-mail" do cadastro: a pessoa digita o código de 6 números.
// O protótipo não manda e-mail: o código sorteado aparece na ajuda do campo.
// Dá para pedir outro código depois de 45 segundos.
// Recebe aoConfirmar(), chamado com o código certo (devolve uma promessa).
export default function ConfirmarEmail({ aoConfirmar }) {
  const [codigo, setCodigo] = useState(gerarCodigo);
  const [digitado, setDigitado] = useState('');
  const [erro, setErro] = useState('');
  const [espera, setEspera] = useState(ESPERA_REENVIO);
  const [reenviado, setReenviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Conta os segundos até poder pedir outro código
  useEffect(() => {
    if (espera === 0) return undefined;
    const relogio = setTimeout(() => setEspera((atual) => atual - 1), 1000);
    return () => clearTimeout(relogio);
  }, [espera]);

  // Sorteia um código novo e recomeça a espera
  function pedirOutro() {
    setCodigo(gerarCodigo());
    setDigitado('');
    setErro('');
    setEspera(ESPERA_REENVIO);
    setReenviado(true);
  }

  // Confere o código digitado
  async function confirmar(evento) {
    evento.preventDefault();
    if (digitado.length < TAMANHO_CODIGO) {
      setErro('Digite os 6 números do código.');
      document.getElementById('codigo')?.focus();
      return;
    }
    if (digitado !== codigo) {
      setErro('Código errado. Confira o e-mail ou peça outro código.');
      document.getElementById('codigo')?.focus();
      return;
    }
    setErro('');
    setEnviando(true);
    await aoConfirmar();
  }

  return (
    <form className={classes.formulario} onSubmit={confirmar} noValidate>
      <CampoCodigo
        id="codigo"
        valor={digitado}
        aoMudar={(valor) => {
          setDigitado(valor);
          if (erro) setErro('');
        }}
        erro={erro}
        ajuda={`Protótipo sem envio de e-mail: o código é ${codigo}.`}
      />

      <p className={classes.meta} role="status">
        {espera > 0 ? (
          `${reenviado ? 'Enviamos outro código. ' : ''}Não chegou? Olhe o spam ou peça outro em ${formatarEspera(espera)}.`
        ) : (
          <>
            Não chegou? Olhe o spam ou
            <Botao variante="texto" onClick={pedirOutro}>
              peça outro código
            </Botao>
          </>
        )}
      </p>

      <Botao variante="principal" type="submit" largo carregando={enviando}>
        {enviando ? 'Criando a conta…' : 'Confirmar'}
      </Botao>
    </form>
  );
}
