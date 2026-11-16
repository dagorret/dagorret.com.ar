// Convierte párrafos que solo contienen $$...$$ en una línea en matemática de bloque.
export default function remarkSingleLineDisplayMath() {
  return (tree, file) => {
    const source = String(file);

    function visit(parent) {
      for (let index = 0; index < (parent.children?.length ?? 0); index++) {
        const node = parent.children[index];
        const formula = node.type === 'paragraph' && node.children.length === 1
          ? node.children[0]
          : undefined;

        if (formula?.type === 'inlineMath' && formula.position) {
          const raw = source.slice(formula.position.start.offset, formula.position.end.offset);
          const opening = raw.match(/^\$+/)?.[0];
          const closing = raw.match(/\$+$/)?.[0];

          if (opening === '$$' && closing === '$$' && !/[\r\n]/.test(raw)) {
            parent.children[index] = {
              type: 'math',
              meta: null,
              value: formula.value,
              position: node.position,
              data: {
                hName: 'pre',
                hChildren: [{
                  type: 'element',
                  tagName: 'code',
                  properties: { className: ['language-math', 'math-display'] },
                  children: [{ type: 'text', value: formula.value }],
                }],
              },
            };
            continue;
          }
        }

        if (node.children) visit(node);
      }
    }

    visit(tree);
  };
}
