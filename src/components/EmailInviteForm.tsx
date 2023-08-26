import React, { useState } from "react";
import pdf2base64 from "pdf-to-base64";
import { sendParticipantEmailInvitation } from "../utils/api";
import axios from "axios";

interface IEmailInviteForm {
  title: string;
  document_id: string;
  fileUrl: string;
  token: string;
}

const EmailInviteForm: React.FC<IEmailInviteForm> = ({
  title,
  document_id,
  fileUrl,
  token,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pdfBase64str, setPdfBase64str] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log("fileUrl", fileUrl);

  pdf2base64(fileUrl)
    .then((resp: string) => {
      setPdfBase64str(`data:application/pdf;base64,${resp}`);
      console.log(typeof resp);
    })
    .catch((error: string) => {
      console.log(error);
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // You can perform further actions with the form data here
    console.log("Form submitted:", { firstName, lastName, phone, email });

    try {
      const response = await sendParticipantEmailInvitation(
        {
          message: title,
          files: [pdfBase64str],
          participants: [
            {
              document_id,
              first_name: firstName,
              last_name: lastName,
              phone,
              email,
              role: "Signer",
            },
          ],
        },
        { token, token_type: "bearer" }
      ).then((res) => res);

      if (response.status === 200) {
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPdfBase64str("");
        // @ts-ignore
        setSuccessMessage("Invitation was successfully sent.");
      }

      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err))
        setErrorMessage(
          `An error occured while attempting to sent invite: ${err.message}`
        );
      else if (err instanceof Error) setErrorMessage(err.message);
    }
  }

  return (
    <div className="flex mb-8">
      <div className="bg-white rounded w-100">
        <form onSubmit={handleSubmit}>
          <div className="flex mb-0">
            <div className="mr-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-40 border rounded px-3 py-1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mr-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-40 border rounded px-3 py-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mr-2">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full border rounded px-3 py-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mr-2">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded px-3 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="h-[34px] bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 text-sm"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </form>

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
    </div>
  );
};

export default EmailInviteForm;
