import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";

const TicketAttachments = ({
  ticketNumber,
  uploadComplete,
  setUploadComplete,
}) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        // Create a reference to the TicketAttachments folder for the specific ticket
        const storageRef = ref(storage, `TicketAttachments/${ticketNumber}`);

        // Get a list of all files in the folder
        const filesList = await listAll(storageRef);

        // Retrieve download URLs for each file
        const urlsPromises = filesList.items.map(async (fileRef) => {
          const downloadURL = await getDownloadURL(fileRef);
          return { name: fileRef.name, downloadURL };
        });

        // Wait for all download URLs to be fetched
        const attachmentsData = await Promise.all(urlsPromises);

        // Set the attachments state with the data
        setAttachments(attachmentsData);
      } catch (error) {
        console.error("Error fetching attachments:", error.message);
      }
    };

    // Fetch attachments when the component mounts
    setUploadComplete(false);
    fetchAttachments();
  }, [uploadComplete, ticketNumber]);

  if (!attachments.length) return null;

  return (
    <div className="text-sm mt-10">
      <div className="border-b-2 border-blue-700 pb-1">
        <h3>Attachments:</h3>
      </div>

      <ul className="mt-2">
        {attachments.map((attachment, index) => (
          <li key={index} className="mt-[2px]">
            <a
              href={attachment.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {attachment.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketAttachments;
