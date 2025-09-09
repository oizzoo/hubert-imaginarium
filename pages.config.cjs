// pages.config.js
module.exports = [
  // landing-page
  { template: 'landing-page.ejs', output: 'index.html', data: { lang: 'pl', title: 'Home' } },
  { template: 'landing-page.ejs', output: 'en/index.html', data: { lang: 'en', title: 'Home (EN)' } },

  // main / en-main (layout -> body: 'index')
  { template: 'layout.ejs', output: 'main/index.html', data: { lang: 'pl', title: 'Hubert Kniaź Imaginarium', body: 'index' } },
  { template: 'layout.ejs', output: 'en-main/index.html', data: { lang: 'en', title: 'Hubert Kniaź Imaginarium', body: 'index' } },

  // o-mnie
  { template: 'layout.ejs', output: 'o-mnie/index.html', data: { lang: 'pl', title: 'O mnie', body: 'o-mnie' } },
  { template: 'layout.ejs', output: 'en-o-mnie/index.html', data: { lang: 'en', title: 'About me', body: 'o-mnie' } },

  // kontakt
  { template: 'layout.ejs', output: 'kontakt/index.html', data: { lang: 'pl', title: 'Kontakt - Hubert Kniaź', body: 'kontakt', success: null, error: null, oldInput: {} } },
  { template: 'layout.ejs', output: 'en-kontakt/index.html', data: { lang: 'en', title: 'Contact - Hubert Kniaź', body: 'kontakt', success: null, error: null, oldInput: {} } },

  // materialy / uniwersum-drugiej-ziemi (main page)
  { template: 'layout.ejs', output: 'materialy/uniwersum-drugiej-ziemi/index.html', data: { lang: 'pl', title: 'Uniwersum drugiej ziemi', body: 'uniwersum-drugiej-ziemi' } },
  { template: 'layout.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/index.html', data: { lang: 'en', title: 'Uniwersum drugiej ziemi', body: 'uniwersum-drugiej-ziemi' } },

  // materialy -> koncept-postaci (layout-pdf)
  { template: 'layout-pdf.ejs', output: 'materialy/uniwersum-drugiej-ziemi/koncept-postaci/index.html', data: { lang: 'pl', title: 'Koncept postaci', body: 'koncept-postaci' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/koncept-postaci/index.html', data: { lang: 'en', title: 'Koncept postaci', body: 'koncept-postaci' } },

  // gdd
  { template: 'layout-pdf.ejs', output: 'materialy/uniwersum-drugiej-ziemi/gdd/index.html', data: { lang: 'pl', title: 'GDD', body: 'gdd' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/gdd/index.html', data: { lang: 'en', title: 'GDD', body: 'gdd' } },

  // quest
  { template: 'layout-pdf.ejs', output: 'materialy/uniwersum-drugiej-ziemi/quest/index.html', data: { lang: 'pl', title: 'Quest', body: 'quest' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/quest/index.html', data: { lang: 'en', title: 'Quest', body: 'quest' } },

  // opowiadanie
  { template: 'layout-pdf.ejs', output: 'materialy/opowiadanie/index.html', data: { lang: 'pl', title: 'Opowiadanie', body: 'opowiadanie' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/opowiadanie/index.html', data: { lang: 'en', title: 'Opowiadanie', body: 'opowiadanie' } },

  // intro-dialog-uml
  { template: 'layout-pdf.ejs', output: 'materialy/uniwersum-drugiej-ziemi/intro-dialog-uml/index.html', data: { lang: 'pl', title: 'Intro-dialog-uml', body: 'Intro-dialog-uml' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/intro-dialog-uml/index.html', data: { lang: 'en', title: 'Intro-dialog-uml', body: 'Intro-dialog-uml' } },

  // worldbuilding
  { template: 'layout-pdf.ejs', output: 'materialy/uniwersum-drugiej-ziemi/worldbuilding/index.html', data: { lang: 'pl', title: 'Worldbuilding', body: 'worldbuilding' } },
  { template: 'layout-pdf.ejs', output: 'en-materialy/uniwersum-drugiej-ziemi/worldbuilding/index.html', data: { lang: 'en', title: 'Worldbuilding', body: 'worldbuilding' } },

  // work-in-progress / 404 (opcjonalnie)
  { template: 'layout.ejs', output: '404/index.html', data: { lang: 'pl', title: 'Strona nie znaleziona', body: 'work-in-progress' } },
  { template: 'layout.ejs', output: 'en-404/index.html', data: { lang: 'en', title: 'Page not found', body: 'work-in-progress' } }
];
