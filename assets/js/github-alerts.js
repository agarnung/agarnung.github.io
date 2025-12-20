// GitHub-style alert blocks processor
// Converts markdown alert blocks (> [!NOTE], > [!WARNING], etc.) to styled blocks

document.addEventListener('DOMContentLoaded', function() {
  const markdownBody = document.querySelector('.markdown-body');
  if (!markdownBody) return;
  
  const blockquotes = markdownBody.querySelectorAll('blockquote');
  
  blockquotes.forEach(function(blockquote) {
    const firstP = blockquote.querySelector('p:first-child');
    if (!firstP) return;
    
    // Get text content, handling both plain text and nested elements
    let text = firstP.textContent.trim();
    const innerHTML = firstP.innerHTML.trim();
    
    // Check for alert markers in text or HTML
    let alertType = null;
    let alertText = '';
    
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
    }
    
    if (alertType) {
      blockquote.classList.add('markdown-alert-' + alertType);
      // Remove the alert marker from the first paragraph
      // Try to preserve HTML structure if possible
      if (firstP.querySelector('strong') && firstP.querySelector('strong').textContent.includes('[!' + alertType.toUpperCase() + ']')) {
        const strong = firstP.querySelector('strong');
        strong.textContent = strong.textContent.replace(/\[![A-Z]+\]\s*/i, '').trim();
        if (!strong.textContent.trim()) {
          strong.remove();
        }
      } else {
        firstP.textContent = alertText;
      }
    }
  });
});

