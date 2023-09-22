import React, { useState } from "react"
import { pdfjs, Document, Page } from "react-pdf"
import pdfFile from '../assets/sample.pdf'
import './Resume.css'



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
}

function Resume() {
  const [file, setFile] = useState(pdfFile)
  const [numPages, setNumPages] = useState()


  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  return (

    <div className="pdf">
      <header>
        <h1>Resume.pdf</h1>
      </header>
      <div className="pdf-container">
        <div className="pdf-container-document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>

              <Page pageNumber={1} />

          </Document>
        </div>
      </div>
    </div>

  )
}

export default Resume;
