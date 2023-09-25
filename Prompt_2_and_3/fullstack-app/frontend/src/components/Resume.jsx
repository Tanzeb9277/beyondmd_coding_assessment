import React, { useState } from "react"
import { pdfjs, Document, Page } from "react-pdf"
import pdfFile from '../assets/resume.pdf'
import './Resume.css'


// Set the worker source for the PDF library.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

// Define the options for the PDF document.
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
}

function Resume() {
   // Use the useState hook to store the PDF file and the number of pages in the document.
  const [file, setFile] = useState(pdfFile)
  const [numPages, setNumPages] = useState()

 // Define a function to handle the document load success event.
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    // Set the number of pages in the document.
    setNumPages(nextNumPages)
  }

// Render the Resume component.
  return (
    <div className="pdf">
      <header>
        <h1>Resume.pdf</h1>
      </header>
      <div className="pdf-container">
        <div className="pdf-container-document">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>

  )
}

// Export the Resume component.
export default Resume;
