import { Stack } from '@mantine/core';
import CampoArquivo from '../formulario/CampoArquivo';
import TituloSecao from './TituloSecao';
import { LIMITE_FOTO_MB } from '../../logica/esquemaNovoPedido';

// Terceira parte do formulário: foto opcional do problema.
// Só o nome do arquivo fica no pedido; a imagem não é salva neste protótipo.
export default function SecaoFoto() {
  return (
    <Stack component="section" gap="lg" aria-labelledby="secao-foto">
      <TituloSecao id="secao-foto" numero={3} titulo="Mostre o problema" />

      <CampoArquivo
        nome="foto"
        rotulo="Foto (opcional)"
        descricao={`Imagem JPG, PNG ou WEBP de até ${LIMITE_FOTO_MB} MB. A foto não é salva neste protótipo.`}
        placeholder="Escolher foto"
        aceita="image/*"
        icone="photo_camera"
        rotuloLimpar="Tirar a foto escolhida"
      />
    </Stack>
  );
}
