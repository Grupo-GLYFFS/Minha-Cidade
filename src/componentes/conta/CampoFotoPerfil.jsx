import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Avatar, Box, Group } from '@mantine/core';
import CampoArquivo from '../formulario/CampoArquivo';
import Icone from '../Icone';
import { LIMITE_ARQUIVO_MB } from '../../logica/regrasFormulario';

// Foto de perfil opcional, com prévia redonda da imagem escolhida.
// A prévia usa um endereço temporário do navegador (object URL), apagado quando a foto muda.
// A foto não é salva: depois do cadastro o avatar mostra as iniciais do nome.
export default function CampoFotoPerfil() {
  const { control } = useFormContext();
  const foto = useWatch({ control, name: 'foto' });
  // Prévia da última foto lida: { arquivo, endereco }
  const [previa, setPrevia] = useState(null);

  // Só mostra a prévia de imagem válida (tipo imagem e até o limite de tamanho)
  const fotoValida =
    foto && foto.type.startsWith('image/') && foto.size <= LIMITE_ARQUIVO_MB * 1024 * 1024;

  // Cria o endereço temporário da foto e o apaga quando a foto muda ou o campo sai da tela.
  // A prévia entra no próximo quadro da tela (requestAnimationFrame), fora do efeito,
  // para não atualizar o estado no meio dele.
  useEffect(() => {
    if (!fotoValida) return undefined;
    const endereco = URL.createObjectURL(foto);
    const quadro = requestAnimationFrame(() => setPrevia({ arquivo: foto, endereco }));
    return () => {
      cancelAnimationFrame(quadro);
      URL.revokeObjectURL(endereco);
    };
  }, [foto, fotoValida]);

  // A prévia só vale se for da foto escolhida agora
  const enderecoPrevia = fotoValida && previa?.arquivo === foto ? previa.endereco : null;

  return (
    <Group gap="md" wrap="nowrap" align="flex-start">
      <Avatar
        src={enderecoPrevia}
        alt={enderecoPrevia ? 'Prévia da foto escolhida' : ''}
        size={64}
        radius="100%"
        color="azul"
      >
        <Icone nome="person" tamanho={28} />
      </Avatar>
      <Box flex={1} miw={0}>
        <CampoArquivo
          nome="foto"
          rotulo="Foto de perfil (opcional)"
          descricao={`Imagem JPG, PNG ou WEBP de até ${LIMITE_ARQUIVO_MB} MB. A foto não é salva neste protótipo.`}
          placeholder="Escolher foto"
          aceita="image/*"
          icone="photo_camera"
          rotuloLimpar="Tirar a foto escolhida"
        />
      </Box>
    </Group>
  );
}
