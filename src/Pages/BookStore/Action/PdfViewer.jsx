import React, { useEffect, useRef } from 'react';
import pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

const FlipbookViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      const pdf = await pdfjs.getDocument(pdfUrl);
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext);
    };

    renderPDF();
  }, [pdfUrl]);

  return <canvas ref={canvasRef} />;
};

export default FlipbookViewer;
