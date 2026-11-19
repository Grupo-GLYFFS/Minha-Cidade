import { useRef, useState } from 'react';
import Icone from '../Icone';
import Botao from '../Botao';
import MiniaturasFotos from './MiniaturasFotos';
import { LIMITE_ARQUIVO_MB } from '../../logica/regrasFormulario';
import { MAXIMO_FOTOS, TIPOS_FOTO, conferirFotos } from '../../logica/esquemaNovoPedido';
import classes from './NovoPedido.module.css';

// Etapa 3 do Abrir pedido: até 3 fotos (opcional), arrastando para a área ou pelo botão.
// Cada foto aparece em miniatura, com o X para tirar. Tipo e tamanho são conferidos na hora.
// No celular a área de arrastar some: as fotos ficam em grade de 3 com o quadrado "Adicionar".
// Recebe as fotos atuais ([{ nome, url }]) e aoMudar(novaLista).
export default function EtapaFotos({ fotos, aoMudar }) {
  const entrada = useRef(null);
  const [erro, setErro] = useState('');
  const [arrastando, setArrastando] = useState(false);
  const cheia = fotos.length >= MAXIMO_FOTOS;

  // Confere os arquivos e junta os aceitos à lista, com o endereço da miniatura
  function adicionar(lista) {
    const { aceitas, erro: problema } = conferirFotos(Array.from(lista), fotos.length);
    setErro(problema);
    if (aceitas.length === 0) return;
    const novas = aceitas.map((arquivo) => ({
      nome: arquivo.name,
      url: URL.createObjectURL(arquivo),
    }));
    aoMudar([...fotos, ...novas]);
  }

  // Tira uma foto e libera a memória da miniatura
  function tirar(foto) {
    URL.revokeObjectURL(foto.url);
    setErro('');
    aoMudar(fotos.filter((item) => item !== foto));
  }

  function aoSoltar(evento) {
    evento.preventDefault();
    setArrastando(false);
    if (!cheia) adicionar(evento.dataTransfer.files);
  }

  return (
    <div className={classes.campo}>
      <p className={classes.rotuloFotos} id="rotulo-fotos">
        Fotos <span className={classes.opcional}>(opcional)</span>
      </p>
      <p className={classes.ajuda} id="ajuda-fotos">
        Até {MAXIMO_FOTOS} fotos JPG, PNG ou WEBP, de até {LIMITE_ARQUIVO_MB} MB cada.
      </p>
      <div
        className={arrastando ? `${classes.zona} ${classes.zonaAtiva}` : classes.zona}
        onDragOver={(evento) => {
          evento.preventDefault();
          setArrastando(!cheia);
        }}
        onDragLeave={() => setArrastando(false)}
        onDrop={aoSoltar}
      >
        <Icone nome="add_photo_alternate" tamanho={32} />
        <p className={classes.zonaTitulo}>
          {cheia ? 'Você já escolheu 3 fotos' : 'Arraste as fotos para cá'}
        </p>
        {!cheia && <p className={classes.zonaOu}>ou</p>}
        <Botao
          variante="secundario"
          icone="upload"
          desabilitado={cheia}
          aria-describedby="rotulo-fotos ajuda-fotos"
          onClick={() => entrada.current?.click()}
        >
          Escolher fotos
        </Botao>
        <input
          ref={entrada}
          id="fotos"
          className={classes.oculto}
          type="file"
          accept={TIPOS_FOTO.join(',')}
          multiple
          tabIndex={-1}
          aria-hidden="true"
          onChange={(evento) => {
            adicionar(evento.currentTarget.files);
            // Limpa para a mesma foto poder ser escolhida de novo depois de tirada
            evento.currentTarget.value = '';
          }}
        />
      </div>
      {erro && (
        <p className={classes.erroCampo} role="alert">
          <Icone nome="error" tamanho={20} />
          {erro}
        </p>
      )}
      <MiniaturasFotos
        fotos={fotos}
        aoTirar={tirar}
        adicionar={
          !cheia && (
            <button
              type="button"
              className={classes.adicionar}
              aria-describedby="rotulo-fotos ajuda-fotos"
              onClick={() => entrada.current?.click()}
            >
              <Icone nome="add_a_photo" tamanho={28} />
              Adicionar<span className={classes.oculto}> fotos</span>
            </button>
          )
        }
      />
    </div>
  );
}
