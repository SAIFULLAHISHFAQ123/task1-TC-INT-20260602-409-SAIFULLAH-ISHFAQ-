import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportDashboardToPdf = async (
  elementId: string, 
  filename: string,
  isDarkTheme: boolean
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  // Pre-configured canvas settings
  const canvas = await html2canvas(element, {
    scale: 2, // Double DPI resolution for crisp charts
    useCORS: true,
    logging: false,
    backgroundColor: isDarkTheme ? '#0b1329' : '#f8fafc',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    ignoreElements: (el) => {
      // Ignore interactive buttons, filters, header bars during snapshot
      return el.classList.contains('pdf-exclude');
    }
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // A4 width: 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height: 297mm
  
  // Calculate height in mm corresponding to canvas scale
  const imgWidth = pageWidth - 10; // 5mm margin on left and right
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 5; // 5mm top padding

  pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
  heightLeft -= (pageHeight - 10);

  // Loop if page spans multiple pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 5;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - 10);
  }

  pdf.save(filename);
};
