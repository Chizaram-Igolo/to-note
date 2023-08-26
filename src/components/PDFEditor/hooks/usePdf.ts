import { useState, useCallback } from "react";
import { save } from "../utils/pdf";

export interface Pdf {
  name: string;
  file: File;
  pages: Promise<any>[];
}

export const usePdf = () => {
  const [name, setName] = useState("");
  const [pageIndex, setPageIndex] = useState(-1);
  const [dimensions, setDimensions] = useState<Dimensions>();
  const [file, setFile] = useState<File>();
  const [pages, setPages] = useState<any>([]);
  const [isMultiPage, setIsMultiPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const currentPage = pages[pageIndex];

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions]);

  const nextPage = () => {
    const newPageIndex = pageIndex + 1;
    setPageIndex(pageIndex + 1);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const previousPage = () => {
    const newPageIndex = pageIndex - 1;
    setPageIndex(newPageIndex);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const initialize = (pdfObj: Pdf) => {
    // { name, file, pages: _pages }
    // const multi = pdfObj._pages.length > 1;

    const multi = pdfObj?.pages.length > 1 ? true : false;
    setName(pdfObj?.name ? pdfObj?.name : "");
    setFile(file);
    setPages(pdfObj?.pages ? pdfObj?.pages : []);
    setPageIndex(0);
    setIsMultiPage(multi);
    setIsFirstPage(true);
    setIsLastPage(pdfObj?.pages.length === 1);
  };

  const savePdf = async (attachments: Attachments[]) => {
    if (isSaving || !file) return;

    setIsSaving(true);

    try {
      await save(file, attachments, name);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentPage,
    dimensions,
    setDimensions: setDimensionsHandler,
    name,
    setName,
    pageIndex,
    setPageIndex,
    file,
    setFile,
    nextPage,
    pages,
    savePdf,
    initialize,
    isMultiPage,
    previousPage,
    isFirstPage,
    isLastPage,
    isSaving,
  };
};
