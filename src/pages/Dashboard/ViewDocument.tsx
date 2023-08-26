import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Cookies from "universal-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  addSelfAsParticipant,
  getDocument,
  getDocumentParticipants,
} from "../../utils/api";

// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { DocumentType } from "../../utils/types";
import EmailInviteForm from "../../components/EmailInviteForm";
import Navbar from "../../components/Navbar";

export default function ViewDocument() {
  const { id } = useParams();
  const [document, setDocument] = useState<DocumentType>();
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [token, setToken] = useState("");
  const [hasAddedSelf, setHasAddedSelf] = useState(false);

  const [showEmailInviteForm, setShowEmailInviteForm] = useState(false);

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const token = cookies.get("to-note-token");
    setToken(token);

    getDocument("99fbeec9-425f-4a78-840c-120557e7d11c", {
      token,
      token_type: "bearer",
    }).then((res) => {
      console.log(res);
      setDocument(res.data.data);
      setIsLoading(false);
    });

    getDocumentParticipants({ token, token_type: "bearer" }).then((res) => {
      console.log("document Participants", res.data);
      setDocument(res.data.data);
    });

    // console.log(document);
  }, [hasAddedSelf]);

  const handleAddMeAsParticipant = async () => {
    try {
      const response = await addSelfAsParticipant(id as string, {
        token,
        token_type: "bearer",
      }).then((res) => res);

      console.log(response);

      setHasAddedSelf(true);

      // setSubmitting(false);
      // navigate("/profile", { state: { token } });
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      if (axios.isAxiosError(err)) {
        // setErrorMessage(
        //   `An error occured while attempting to upload: ${err.message}`
        // );
      }
      //   else if (err instanceof Error) setErrorMessage(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-w-[800px] w-[100%] flex flex-col mt-12 ml-8">
        <h2 className="text-xl font-semibold mb-4">View a Document</h2>

        {
          // @ts-ignore
          document?.participants.length > 0 && (
            <div className="mb-4">
              <span className="font-bold float-left">Participants: </span>
              {
                // @ts-ignore
                document?.participants.map((p, idx) => (
                  <div
                    className="float-left"
                    key={
                      // @ts-ignore
                      `${p.user.first_name}${p.user.last_name}${idx}`
                    }
                  >
                    <span className="ml-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-gray-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-gray-700">
                      {
                        // @ts-ignore
                        p.user.first_name
                      }
                      &nbsp;
                      {
                        // @ts-ignore
                        p.user.last_name
                      }
                    </span>
                    {
                      // @ts-ignore
                      idx !== document?.participants?.length - 1 && (
                        <span>,</span>
                      )
                    }
                  </div>
                ))
              }
            </div>
          )
        }
        <div className="flex">
          <div>
            <button
              onClick={handleAddMeAsParticipant}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-4 py-1 px-4 rounded"
            >
              Add Me as Participant
            </button>
          </div>

          <div className="mt-1 ml-4 mb-2">
            {
              // @ts-ignore
              document?.documentUploads?.length > 0 && (
                <button
                  onClick={() =>
                    setShowEmailInviteForm(
                      (showEmailInviteForm) => !showEmailInviteForm
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-sm text-white mb-4 py-1 px-4 rounded"
                >
                  {!showEmailInviteForm
                    ? "Send an Email Invite"
                    : "Hide Email Invite"}
                </button>
              )
            }
          </div>
        </div>

        <div>
          {showEmailInviteForm &&
            // @ts-ignore
            document?.documentUploads?.length > 0 && (
              <EmailInviteForm
                title={document?.title as string}
                document_id={id as string}
                token={token}
                fileUrl={
                  // @ts-ignore
                  document?.documentUploads[0].file_url
                }
              />
            )}
        </div>
        {isLoading ? (
          <Skeleton count={20} className="w-[70%]" />
        ) : (
          <Worker workerUrl="../../../pdf.worker.min.js">
            <>
              <Viewer
                fileUrl={
                  "https://tonote-storage.s3.eu-west-3.amazonaws.com/test-uploads/document/99fb4bda-bb38-482a-8590-8082a35d053e/64e9d47cd45c1.pdf"
                }
                plugins={[defaultLayoutPluginInstance]}
              />
            </>
            {/* {!viewPdf && <>No PDF</>} */}
          </Worker>
        )}
      </div>
    </>
  );
}