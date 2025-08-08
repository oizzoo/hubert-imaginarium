document.addEventListener('DOMContentLoaded', () => {
  const btnPL = document.getElementById('btn-pl');
  const btnEN = document.getElementById('btn-en');

  if (!btnPL || !btnEN) return;

  // Mapowanie ścieżek dla zmiany języka
  const pathMap = {
    '/': '/en',
    '/en': '/',
    '/main': '/en-main',
    '/en-main': '/main',
    '/o-mnie': '/en-o-mnie',
    '/en-o-mnie': '/o-mnie',
    '/kontakt': '/en-kontakt',
    '/en-kontakt': '/kontakt',
    '/materialy/uniwersum-drugiej-ziemi': '/en-materialy/uniwersum-drugiej-ziemi',
    '/en-materialy/uniwersum-drugiej-ziemi': '/materialy/uniwersum-drugiej-ziemi',
    '/materialy/uniwersum-drugiej-ziemi/koncept-postaci': '/en-materialy/uniwersum-drugiej-ziemi/koncept-postaci',
    '/en-materialy/uniwersum-drugiej-ziemi/koncept-postaci': '/materialy/uniwersum-drugiej-ziemi/koncept-postaci',
    '/materialy/uniwersum-drugiej-ziemi/gdd': '/en-materialy/uniwersum-drugiej-ziemi/gdd',
  };

  btnPL.addEventListener('click', () => {
    const currentPath = window.location.pathname;
    const newPath = pathMap[currentPath] || '/'; // Domyślnie wraca do strony głównej PL
    window.location.pathname = newPath;
  });

  btnEN.addEventListener('click', () => {
    const currentPath = window.location.pathname;
    const newPath = pathMap[currentPath] || '/en'; // Domyślnie wraca do strony głównej EN
    window.location.pathname = newPath;
  });

  // Ustawienie disabled dla aktywnego języka
  const lang = document.documentElement.lang;
  if (lang === 'pl') btnPL.disabled = true;
  else if (lang === 'en') btnEN.disabled = true;
});