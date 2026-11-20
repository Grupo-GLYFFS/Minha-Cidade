import { Select } from '@mantine/core';
import Icone from '../Icone';
import { ENDERECOS_CADASTRO } from '../../dados/enderecosCadastro';
import campoClasses from '../CampoTexto.module.css';
import classes from './CampoEndereco.module.css';

// Os 6 endereços de teste
const OPCOES = ENDERECOS_CADASTRO.map((item) => ({ value: item.id, label: item.rotulo }));

// Campo "Endereço" do Criar conta: Select do Mantine no padrão dos campos do app
// (44 de altura, raio 12, borda do app) com a lista suspensa no mesmo estilo
// e o item escolhido em azul-claro; os 6 endereços aparecem sem rolagem. Abre e escolhe pelo teclado (setas, Enter e Esc).
// Recebe value (id do endereço ou ''), onChange(id), onBlur, erro e ref (do Controller).
export default function CampoEndereco({ value, onChange, onBlur, erro, ref }) {
  return (
    <Select
      ref={ref}
      id="endereco"
      label="Endereço"
      placeholder="Escolha seu endereço"
      data={OPCOES}
      value={value || null}
      onChange={(id) => onChange(id ?? '')}
      onBlur={onBlur}
      allowDeselect={false}
      withCheckIcon={false}
      rightSection={<Icone nome="expand_more" />}
      rightSectionPointerEvents="none"
      maxDropdownHeight={320}
      comboboxProps={{ offset: 6 }}
      error={
        erro && (
          <>
            <Icone nome="error" tamanho={20} />
            {erro}
          </>
        )
      }
      classNames={{
        label: campoClasses.rotulo,
        input: `${campoClasses.campo} ${classes.campo}`,
        section: classes.seta,
        dropdown: classes.lista,
        option: classes.opcao,
        error: campoClasses.erro,
      }}
    />
  );
}
