import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import Icone from '../Icone';
import LogoGithub from './LogoGithub';
import { LINKS_PITCH } from '../../dados/equipe';
import classes from './CardPitch.module.css';

// Card "Pitch" da Equipe: miniatura do vídeo, o texto e os botões Repositório e
// Assistir ao pitch. Sem o link do vídeo (dados/equipe.js), "Assistir ao pitch" fica desabilitado.
export default function CardPitch() {
  const temVideo = Boolean(LINKS_PITCH.video);

  return (
    <SecaoCard titulo="Pitch">
      <div className={classes.pitch}>
        <div className={classes.video} aria-hidden="true">
          <Icone nome="smart_display" tamanho={32} />
        </div>
        <div>
          <p className={classes.texto}>
            Vídeo de até 3 minutos mostrando o site. O link entra aqui quando o vídeo estiver
            pronto.
          </p>
          <div className={classes.botoes}>
            <Botao variante="secundario" href={LINKS_PITCH.repositorio}>
              <LogoGithub />
              Repositório
            </Botao>
            <Botao
              variante="principal"
              icone="play_arrow"
              href={LINKS_PITCH.video ?? undefined}
              desabilitado={!temVideo}
              aria-label={temVideo ? undefined : 'Assistir ao pitch. O vídeo ainda não está pronto'}
            >
              Assistir ao pitch
            </Botao>
          </div>
        </div>
      </div>
    </SecaoCard>
  );
}
