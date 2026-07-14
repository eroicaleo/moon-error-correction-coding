/* MathJax 3 — load before tex-chtml-full.js (see mkdocs.yml order).
 * mdx_math outputs <script type="math/tex">…</script> (MathJax v2 style).
 * v3 needs an extra renderAction; see https://docs.mathjax.org/en/latest/upgrading/v2.html
 */
window.MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
    tags: 'ams',
  },
  options: {
    renderActions: {
      find_script_mathtex: [
        10,
        function (doc) {
          for (const node of document.querySelectorAll('script[type^="math/tex"]')) {
            const display = !!node.type.match(/; *mode=display/);
            const math = new doc.options.MathItem(
              node.textContent,
              doc.inputJax[0],
              display
            );
            const text = document.createTextNode('');
            node.parentNode.replaceChild(text, node);
            math.start = { node: text, delim: '', n: 0 };
            math.end = { node: text, delim: '', n: 0 };
            doc.math.push(math);
          }
        },
        '',
      ],
    },
  },
};
