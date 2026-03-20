// Rehype plugin to rewrite image src paths with base URL
import { visit } from 'unist-util-visit';

export function rehypeBaseUrl() {
  const base = process.env.CI ? '/lekce' : '';
  
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties?.src;
        if (src && typeof src === 'string' && src.startsWith('/') && !src.startsWith('/lekce')) {
          node.properties.src = base + src;
        }
      }
    });
  };
}
