import { useEffect, useState } from "react";
import axios from "axios";
import { uploadDocument } from "../../utils/api";
import Cookies from "universal-cookie";
import Navbar from "../../components/Navbar";

export default function UploadDocument() {
  const cookies = new Cookies();
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");
  const [evtObj, setEvtObj] = useState(null);

  useEffect(() => {
    const token = cookies.get("to-note-token");
    setToken(token);
  }, []);

  type FileChangeEventType = React.FormEvent<HTMLInputElement>;

  function handleFileChange(event: FileChangeEventType) {
    // @ts-ignore
    const file = event.target.files[0];

    // @ts-ignore
    setEvtObj(event);

    console.log(file);

    if (file.size > 1024 * 1024 * 1) {
      setErrorMessage("File size should be less than 10MB.");
      return;
    }

    // FileReader function for read the file.
    let fileReader = new FileReader();
    // Onload of file read the file content
    fileReader.onload = function (fileLoadedEvent) {
      // @ts-ignore
      const base64str = fileLoadedEvent.target.result;
      setSelectedFile(base64str);
      console.log(base64str);
    };
    // Convert data to base64

    fileReader.readAsDataURL(file);

    setSelectedFile(file);
    setErrorMessage("");
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }

    const filesArr = [selectedFile] as string[] | ArrayBuffer[];
    try {
      const response = await uploadDocument(
        {
          title: "File",
          files: filesArr,
        },
        { token, token_type: "bearer" }
      ).then((res) => res);

      if (response.status === 200) {
        console.log(response.data);
        setSelectedFile("");
        // @ts-ignore
        evtObj.target.value = null;
        setEvtObj(null);
        setSuccessMessage("File was successfully uploaded.");
      }

      // setSubmitting(false);
      // navigate("/profile", { state: { token } });
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      if (axios.isAxiosError(err))
        setErrorMessage(
          `An error occured while attempting to upload: ${err.message}`
        );
      else if (err instanceof Error) setErrorMessage(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-w-[800px] w-[90%] flex flex-col mt-12 ml-8">
        <h2 className="text-xl font-semibold mb-4">Upload a Document</h2>
        <div className="w-[50%]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PDF (Max. 10MB).
          </p>

          {errorMessage && (
            <p className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="inline-block whitespace-nowrap rounded-[0.27rem] bg-green-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-green-700">
              {successMessage}
            </p>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={handleUpload}
            className={`bg-blue-500 ${
              !selectedFile
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded`}
            disabled={!selectedFile ? true : false}
          >
            Upload Document
          </button>
        </div>
      </div>
    </>
  );
}
