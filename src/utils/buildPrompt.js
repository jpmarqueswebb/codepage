// Monta a mensagem que vai para a IA. Não impõe cor nenhuma: o efeito sempre
// assume a paleta, as fontes e o estilo do projeto onde for aplicado.
export function buildPrompt({ effect, section, code, format = 'React', extra = '' }) {
  const lines = [
    `Chat, adicione este efeito no nosso site, exatamente na seção "${section}":`,
    '',
    `EFEITO: ${effect.name}`,
    `CATEGORIA: ${effect.categoryLabel}`,
    `DESCRIÇÃO VISUAL: ${effect.description}`,
    '',
    'CORES E ESTILO: use a paleta de cores, as fontes e o estilo visual do projeto onde o efeito vai entrar. As cores, fontes e textos do código abaixo são só a referência da página de onde ele saiu: troque todos pelos do projeto, sem exceção. Nenhuma cor do código original deve ficar se não fizer parte da paleta do projeto.',
    '',
    'COMO IMPLEMENTAR:',
    `1. Integre o código na seção "${section}" sem alterar os dados reais que já existem nela.`,
    '2. Mantenha o comportamento do efeito (animação, tempos e interação) igual ao código.',
    '3. Deixe 100% responsivo para mobile e desktop.',
    '4. Respeite prefers-reduced-motion e mantenha o texto legível com as cores do projeto.',
  ];
  if (extra.trim()) lines.push(`5. INSTRUÇÃO EXTRA: ${extra.trim()}`);
  lines.push('', `--- CÓDIGO DO EFEITO (${format}) ---`, code, '');
  return lines.join('\n');
}
