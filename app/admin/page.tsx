"use client";
import React, { useState } from "react";

import { S3 } from "aws-sdk";
import UploadFile from "./components/upload-file";
import ListFiles from "./components/name-file";
import DeleteFile from "./components/delete";

interface UploadedFile {
  Key: string;
  [key: string]: any; // In case there are other properties you want to handle
}

const Page = () => {
  const ACCESSKEY = "vcth80uhiopv119d"; //process.env.LIARA_SECRET_KEY;
  const SECRETKEY = "807384cf-b94d-4c28-acc2-9d0110974498"; //process.env.LIARA_ACCESS_KEY;
  const ENDPOINT = "https://storage.c2.liara.space"; //process.env.LIARA_ENDPOINT;
  const BUCKET = "next-app"; //process.env.LIARA_BUCKET_NAME;

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (file: S3.ManagedUpload.SendData) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleDelete = (fileKey: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.Key !== fileKey)
    );
  };

  return (
    <div>
      <UploadFile
        accessKeyId={ACCESSKEY}
        secretAccessKey={SECRETKEY}
        endpoint={ENDPOINT}
        bucket={BUCKET}
        onUpload={handleUpload}
      />
      <ListFiles
        accessKeyId={ACCESSKEY}
        secretAccessKey={SECRETKEY}
        endpoint={ENDPOINT}
        bucket={BUCKET}
      />
      <div>
        <h2>Uploaded Files:</h2>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.Key}>
              {file.Key}{" "}
              <DeleteFile
                accessKeyId={ACCESSKEY}
                secretAccessKey={SECRETKEY}
                endpoint={ENDPOINT}
                bucket={BUCKET}
                fileKey={file.Key}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
