import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadFile = ({ ticketNumber, setUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      // Update the storage reference to point to the "TicketAttachments" folder
      const storageRef = ref(
        storage,
        `TicketAttachments/${ticketNumber}/${file.name}`
      );

      try {
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        setUploadComplete(true);
        console.log("File uploaded successfully. Download URL:", downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };

  useEffect(() => {}, [selectedFile]);

  return (
    <div className="flex text-sm mt-7">
      <p className="whitespace-nowrap mt-[3px] mr-2 border-b-2 border-blue-700 pb-1">
        Upload Attachment
      </p>
      <input
        className="w-[180px]"
        type="file"
        onChange={handleFileChange}
      ></input>
    </div>
  );
};

export default UploadFile;
