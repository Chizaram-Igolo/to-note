import Navbar from "../../components/Navbar";
import PDFEditor from "../../components/PDFEditor/PDFEditor";

export default function SignDocument() {
  return (
    <>
      <Navbar />
      <div className="min-w-[800px] w-[90%] flex flex-col mt-12 ml-8">
        <h2 className="text-xl font-semibold mb-4">Sign Your Document</h2>
        <PDFEditor />
      </div>
    </>
  );
}
