import axios from "axios"; // Make sure you have axios installed
import { useState } from "react";
import AlertMessage from "./AlertMessage";
import { uploadDocument } from "../utils/api";

const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = event.target.files[0];
    setSelectedFile(file);
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }

    if (selectedFile.size > 1024 * 1024 * 10) {
      setErrorMessage("File size should be less than 10MB.");
      return;
    }

    // console.log(selectedFile.name);

    // const formData = new FormData();
    // formData.append("files", selectedFile);

    // console.log(formData);
    // console.log(selectedFile);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const response = await uploadDocument({
        title: selectedFile.name.split(".")[0],
        files: [selectedFile],
      }).then((res) => res.data);

      console.log(response);

      // setSubmitting(false);
      // navigate("/profile", { state: { token } });
    } catch (err) {
      if (axios.isAxiosError(err))
        setErrorMessage(
          `An error occured while attempting to upload: ${err.message}`
        );
      else if (err instanceof Error) setErrorMessage(err.message);
    }

    // try {
    //   const response = await axios.post(
    //     "https://dev-api.gettonote.com/api/v1/document-upload-convert",
    //     formData
    //   );

    //   // Assuming the API returns a success message
    //   setSuccessMessage(response.data.message);
    // } catch (error) {
    //   setErrorMessage("An error occurred while uploading the document.");
    // }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload a Document</h2>
      {errorMessage && <AlertMessage type="error" message={errorMessage} />}

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
      {successMessage && (
        <p className="text-green-500 mb-2">{successMessage}</p>
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Upload Document
      </button>
    </div>
  );
};

export default DocumentUploadForm;
