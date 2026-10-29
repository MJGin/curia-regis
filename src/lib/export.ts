import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak, Footer, PageNumber, AlignmentType } from "docx";
import { jsPDF } from "jspdf";
import type { MemorialDoc } from "../types";

function runs(text: string, bold = false, italics = false, size = 22): TextRun[] {
  return [new TextRun({ text, bold, italics, size, font: "Times New Roman" })];
}

export async function exportDocx(memorial: MemorialDoc): Promise<Blob> {
  const children: Paragraph[] = [];
  for (const s of memorial.sections) {
    if (s.id === "title") {
      for (const b of s.blocks) {
        if (b.kind === "title")
          children.push(new Paragraph({ children: runs(b.text, true, false, 30), alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
        else if (b.kind === "subtitle")
          children.push(new Paragraph({ children: runs(b.text, false, true, 22), alignment: AlignmentType.CENTER, spacing: { after: 120 } }));
        else if (b.kind === "h1")
          children.push(new Paragraph({ children: runs(b.text, true, false, 26), alignment: AlignmentType.CENTER, spacing: { before: 240, after: 120 } }));
        else if (b.kind === "meta")
          children.push(new Paragraph({ children: runs(b.text, false, false, 20), alignment: AlignmentType.CENTER, spacing: { after: 60 } }));
      }
      children.push(new Paragraph({ children: [new PageBreak()] }));
      continue;
    }
    for (const b of s.blocks) {
      if (b.kind === "h1")
        children.push(new Paragraph({ children: runs(b.text, true, false, 24), spacing: { before: 320, after: 120 } }));
      else if (b.kind === "h2")
        children.push(new Paragraph({ children: runs(b.text, true, false, 22), spacing: { before: 200, after: 80 } }));
      else if (b.kind === "h3")
        children.push(new Paragraph({ children: runs(b.text, true, false, 21), spacing: { before: 160, after: 60 } }));
      else if (b.kind === "para")
        children.push(
          new Paragraph({
            children: runs(b.text, false, false, 22),
            spacing: { after: 120, line: 360 },
            alignment: AlignmentType.JUSTIFIED,
          }),
        );
      else if (b.kind === "quote")
        children.push(
          new Paragraph({
            children: runs(b.text, false, true, 21),
            spacing: { after: 120, line: 360 },
            indent: { left: 720 },
            alignment: AlignmentType.JUSTIFIED,
          }),
        );
    }
    children.push(new Paragraph({ children: [new PageBreak()] }));
  }

  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Times New Roman" })],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
  return await Packer.toBlob(doc);
}

export function exportPdf(memorial: MemorialDoc): void {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 72;
  const usable = pageW - margin * 2;
  let y = margin;

  function newPage() {
    pdf.addPage();
    y = margin;
  }
  function ensure(h: number) {
    if (y + h > pageH - margin) newPage();
  }
  function para(text: string, size = 11, bold = false, italics = false, spaceAfter = 8, align: "left" | "center" | "justify" = "justify") {
    pdf.setFont("Times", bold ? "Bold" : italics ? "Italic" : "Normal");
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(text, usable);
    const lh = size * 1.35;
    for (const ln of lines) {
      ensure(lh);
      if (align === "center") pdf.text(ln, pageW / 2, y, { align: "center" });
      else pdf.text(ln, margin, y);
      y += lh;
    }
    y += spaceAfter;
  }

  for (const s of memorial.sections) {
    if (s.id === "title") {
      for (const b of s.blocks) {
        if (b.kind === "title") para(b.text, 16, true, false, 4, "center");
        else if (b.kind === "subtitle") para(b.text, 11, false, true, 4, "center");
        else if (b.kind === "h1") para(b.text, 13, true, false, 6, "center");
        else if (b.kind === "meta") para(b.text, 10, false, false, 2, "center");
      }
      newPage();
      continue;
    }
    for (const b of s.blocks) {
      if (b.kind === "h1") para(b.text, 13, true, false, 6, "left");
      else if (b.kind === "h2") para(b.text, 11.5, true, false, 4, "left");
      else if (b.kind === "h3") para(b.text, 11, true, false, 4, "left");
      else if (b.kind === "para") para(b.text, 11, false, false, 6, "justify");
      else if (b.kind === "quote") para(b.text, 10.5, false, true, 6, "justify");
    }
    // page break between sections
    if (s.id !== memorial.sections[memorial.sections.length - 1].id) newPage();
  }

  // page numbers
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setFont("Times", "Normal");
    pdf.setFontSize(9);
    pdf.text(String(i), pageW / 2, pageH - 36, { align: "center" });
  }
  pdf.save(`${memorial.title.replace(/[^a-z0-9]+/gi, "_")}_memorial.pdf`);
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
