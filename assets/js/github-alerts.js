// GitHub-style alert blocks + optional margin sidenotes
// Converts markdown alert blocks (> [!NOTE], > [!ASIDE], etc.) to styled blocks

document.addEventListener('DOMContentLoaded', function() {
  const markdownBody = document.querySelector('.markdown-body');
  if (!markdownBody) return;

  const blockquotes = markdownBody.querySelectorAll('blockquote');

  blockquotes.forEach(function(blockquote) {
    const firstP = blockquote.querySelector('p:first-child');
    if (!firstP) return;

    let text = firstP.textContent.trim();
    const innerHTML = firstP.innerHTML.trim();

    let alertType = null;
    let alertText = '';
    let isSidenote = false;

    if (text.includes('[!NOTE]') || innerHTML.includes('[!NOTE]')) {
      alertType = 'note';
      alertText = text.replace(/\[!NOTE\]\s*/i, '').trim();
    } else if (text.includes('[!WARNING]') || innerHTML.includes('[!WARNING]')) {
      alertType = 'warning';
      alertText = text.replace(/\[!WARNING\]\s*/i, '').trim();
    } else if (text.includes('[!TIP]') || innerHTML.includes('[!TIP]')) {
      alertType = 'tip';
      alertText = text.replace(/\[!TIP\]\s*/i, '').trim();
    } else if (text.includes('[!IMPORTANT]') || innerHTML.includes('[!IMPORTANT]')) {
      alertType = 'important';
      alertText = text.replace(/\[!IMPORTANT\]\s*/i, '').trim();
    } else if (
      text.includes('[!ASIDE]') || innerHTML.includes('[!ASIDE]') ||
      text.includes('[!SIDE]') || innerHTML.includes('[!SIDE]') ||
      text.includes('[!MARGIN]') || innerHTML.includes('[!MARGIN]')
    ) {
      alertType = 'aside';
      isSidenote = true;
      alertText = text
        .replace(/\[!(?:ASIDE|SIDE|MARGIN)\]\s*/i, '')
        .trim();
    }

    if (!alertType) return;

    // Strip marker from first paragraph (preserve nested HTML when present)
    const markerRe = /\[!(?:NOTE|WARNING|TIP|IMPORTANT|ASIDE|SIDE|MARGIN)\]\s*/i;
    if (firstP.querySelector('strong') && markerRe.test(firstP.querySelector('strong').textContent)) {
      const strong = firstP.querySelector('strong');
      strong.textContent = strong.textContent.replace(markerRe, '').trim();
      if (!strong.textContent.trim()) strong.remove();
    } else if (firstP.innerHTML !== firstP.textContent) {
      firstP.innerHTML = innerHTML.replace(markerRe, '').trim();
    } else {
      firstP.textContent = alertText;
    }

    if (isSidenote) {
      const aside = document.createElement('aside');
      aside.className = 'markdown-sidenote';
      aside.setAttribute('role', 'note');
      while (blockquote.firstChild) {
        aside.appendChild(blockquote.firstChild);
      }
      blockquote.parentNode.replaceChild(aside, blockquote);
      return;
    }

    blockquote.classList.add('markdown-alert-' + alertType);
  });
});
