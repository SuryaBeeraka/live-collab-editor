import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

export const exportToPDF = (content) => {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 10);
  doc.save('document.pdf');
};

export const exportToMarkdown = (content) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, 'document.md');
};