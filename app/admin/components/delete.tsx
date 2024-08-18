import React from "react";
import { S3 } from "aws-sdk";

interface DeleteFileProps {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
  fileKey: string;
  onDelete: (fileKey: string) => void;
}

const DeleteFile: React.FC<DeleteFileProps> = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
  fileKey,
  onDelete,
}) => {
  const handleDeleteFile = async () => {
    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
    });

    try {
      await s3.deleteObject({ Bucket: bucket, Key: fileKey }).promise();
      onDelete(fileKey);
      console.log("File deleted successfully");
    } catch (error: any) {
      console.error("Error deleting file: ", error.message);
    }
  };

  return (
    <button className="btn" onClick={handleDeleteFile}>
      Delete
    </button>
  );
};

export default DeleteFile;
