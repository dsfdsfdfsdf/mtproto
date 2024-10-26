const proxyUrls = [
  'https://raw.githubusercontent.com/ALIILAPRO/MTProtoProxy/main/mtproto.txt',  // فایل دوم
    'https://raw.githubusercontent.com/soroushmirzaei/telegram-proxies-collector/main/proxies'  // فایل اول
];

function fetchProxies(url) {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  return fetch(proxyUrl + encodeURIComponent(url))
    .then((response) => response.json())
    .then((data) => data.contents.split('\n').filter(Boolean));
}

Promise.all(proxyUrls.map(fetchProxies))
  .then((allProxies) => {
    const proxies = allProxies.flat();
    const table = document.getElementById('proxy-table');

    proxies.forEach((proxyLink, index) => {
      const row = table.insertRow();
      const countCell = row.insertCell();
      const actionCell = row.insertCell();

      countCell.innerText = index + 1;
      actionCell.innerHTML = `<button class="copy-btn" data-link="${proxyLink}">Copy & Open in Telegram</button>`;
    });

    document.querySelectorAll('.copy-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const linkToCopy = button.getAttribute('data-link');
        copyToClipboard(linkToCopy);
        window.open(linkToCopy, '_blank');  // باز کردن لینک در تلگرام
      });
    });

    function copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(`Copied to clipboard: ${text}`);
    }
  })
  .catch((error) => console.error(error));
