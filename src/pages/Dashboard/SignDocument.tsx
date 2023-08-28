import { useEffect, useState } from "react";

import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { createSnapModifier, snapCenterToCursor } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { getDocument } from "../../utils/api";
import { useParams } from "react-router-dom";

const gridSize = 20; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

export function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-[600px] border">
      {props.children}
    </div>
  );
}

function Draggable(props: { id: string; children: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border"
    >
      {props.children}
    </button>
  );
}

// note: `buffer` arg can be an ArrayBuffer or a Uint8Array
async function bufferToBase64(buffer: ArrayBuffer | Uint8Array) {
  // use a FileReader to generate a base64 data URI:
  const base64url: string = await new Promise((r) => {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([buffer]));
  });
  // remove the `data:...;base64,` part from the start
  return base64url.slice(base64url.indexOf(",") + 1);
}

function DragAndDrop() {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Text</Draggable>;

  async function modifyPdf() {
    const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    // @ts-ignore
    const { width, height } = firstPage.getSize();
    firstPage.drawText("Text", {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();

    // example use:
    console.log(await bufferToBase64(pdfBytes));
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[snapToGridModifier, snapCenterToCursor]}
    >
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
    </DndContext>
  );

  // @ts-ignore
  function handleDragEnd(event) {
    // @ts-ignore
    const { active, over } = event;

    setParent(over ? over.id : null);

    console.log(event);

    modifyPdf();

    // if (active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id);
    //     const newIndex = items.indexOf(over.id);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
    // }
  }
}

export default function SignDocument() {
  const { id } = useParams();

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState<DocumentType>();

  useEffect(() => {
    const token = localStorage.getItem("to-note") as string;

    getDocument(id as string, {
      token,
      token_type: "bearer",
    }).then((res) => {
      console.log(res);
      setDocument(res.data.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <div className="min-w-[800px] w-[90%] flex flex-col ml-8">
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Sign Your Document</h2>
        {/* <PDFEditor /> */}
        <DragAndDrop />

        {isLoading ? (
          <Skeleton count={20} className="w-[70%]" />
        ) : (
          <Worker workerUrl="../../../pdf.worker.min.js">
            <>
              <Viewer
                fileUrl={
                  // @ts-ignore
                  document?.documentUploads?.length > 0
                    ? // @ts-ignore
                      document?.documentUploads[0].file_url
                    : "https://tonote-storage.s3.eu-west-3.amazonaws.com/test-uploads/document/99fb4bda-bb38-482a-8590-8082a35d053e/64e9d47cd45c1.pdf"
                }
                plugins={[defaultLayoutPluginInstance]}
              />
            </>
            {/* {!viewPdf && <>No PDF</>} */}
          </Worker>
        )}
      </div>
    </div>
  );
}
