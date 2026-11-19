import { useRef, useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import Icone from '../Icone';
import { LIMITE_ARQUIVO_MB, emMegabytes } from '../../logica/regrasFormulario';
import classes from './PopupTrocarFoto.module.css';

// Popup "Trocar foto" (30, quadro 3): Enviar foto (escolhe um arquivo), Tirar foto (abre a
// câmera no celular; no computador, escolhe um arquivo) e Remover foto, mais Cancelar.
// Confere se o arquivo é imagem de até 5 MB e mostra o erro no próprio popup.
// Recebe aberto, temFoto (Remover só funciona com foto), aoEscolher(arquivo), aoRemover()
// e aoFechar().
export default function PopupTrocarFoto({ aberto, temFoto, aoEscolher, aoRemover, aoFechar }) {
  const refEnviar = useRef(null);
  const refCamera = useRef(null);
  const [erro, setErro] = useState('');

  // Fecha o popup e limpa o erro
  function fechar() {
    setErro('');
    aoFechar();
  }

  // Confere o arquivo escolhido; se estiver certo, usa como foto e fecha.
  function aoMudarArquivo(evento) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = '';
    if (!arquivo) return;
    if (!arquivo.type.startsWith('image/')) {
      setErro('Escolha um arquivo de imagem (JPG, PNG ou WEBP).');
      return;
    }
    if (arquivo.size > LIMITE_ARQUIVO_MB * 1024 * 1024) {
      setErro(
        `Esta foto tem ${emMegabytes(arquivo.size)}. Escolha uma imagem de até ${LIMITE_ARQUIVO_MB} MB.`,
      );
      return;
    }
    aoEscolher(arquivo);
    fechar();
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={fechar}
      titulo="Trocar foto"
      largura={480}
      botoes={
        <Botao variante="secundario" onClick={fechar}>
          Cancelar
        </Botao>
      }
    >
      {erro && (
        <p className={classes.erro} role="alert">
          <Icone nome="error" tamanho={20} />
          {erro}
        </p>
      )}
      <ul className={classes.lista}>
        <li>
          <button type="button" className={classes.opcao} onClick={() => refEnviar.current.click()}>
            <Icone nome="upload" tamanho={20} className={classes.icone} />
            Enviar foto
          </button>
        </li>
        <li>
          <button type="button" className={classes.opcao} onClick={() => refCamera.current.click()}>
            <Icone nome="photo_camera" tamanho={20} className={classes.icone} />
            Tirar foto
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`${classes.opcao} ${classes.remover}`}
            disabled={!temFoto}
            aria-disabled={!temFoto || undefined}
            aria-label={temFoto ? undefined : 'Remover foto. Você ainda não tem foto'}
            onClick={() => {
              aoRemover();
              fechar();
            }}
          >
            <Icone nome="delete" tamanho={20} />
            Remover foto
          </button>
        </li>
      </ul>
      <input
        ref={refEnviar}
        type="file"
        accept="image/*"
        hidden
        onChange={aoMudarArquivo}
        aria-hidden="true"
        tabIndex={-1}
      />
      <input
        ref={refCamera}
        type="file"
        accept="image/*"
        capture="user"
        hidden
        onChange={aoMudarArquivo}
        aria-hidden="true"
        tabIndex={-1}
      />
    </Popup>
  );
}
