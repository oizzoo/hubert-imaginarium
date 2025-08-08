document.addEventListener('DOMContentLoaded', () => {
  const url = '/pdf/Cara.pdf'; 
  const canvas = document.getElementById('id-render');
  const context = canvas.getContext('2d');

  // Pobierz obiekt pdfjsLib z globalnego scope
  const pdfjsLib = window['pdfjs-dist/build/pdf'];

  // Ustaw worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

  // Załaduj dokument PDF
  pdfjsLib.getDocument(url).promise.then(pdfDoc => {
    // Pobierz pierwszą stronę
    pdfDoc.getPage(1).then(page => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Ustaw wielkość canvasa zgodnie z rozmiarem strony PDF
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Renderuj stronę na canvasie
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  }).catch(error => {
    console.error('Błąd ładowania lub renderowania PDF:', error);
  });
});
