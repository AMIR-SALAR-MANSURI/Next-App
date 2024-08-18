import React, { useState, useEffect } from "react";
import { S3 } from "aws-sdk";

interface ListFilesProps {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
}

interface S3File {
  Key?: string;
}

const ListFiles: React.FC<ListFilesProps> = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
}) => {
  const [allFiles, setAllFiles] = useState<S3File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
    });

    try {
      const response = await s3.listObjectsV2({ Bucket: bucket }).promise();
      setAllFiles(response.Contents || []);
    } catch (error: any) {
      setError("Error fetching files: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  const handleDeleteFile = async (file: S3File) => {
    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
    });

    if (!file.Key) return;

    try {
      await s3.deleteObject({ Bucket: bucket, Key: file.Key }).promise();
      setAllFiles((prevFiles) => prevFiles.filter((f) => f.Key !== file.Key));
      console.log("File deleted successfully");
    } catch (error: any) {
      setError("Error deleting file: " + error.message);
    }
  };

  return (
    <div>
      <h2>All Files:</h2>
      {error && <p>{error}</p>}
      {allFiles.length > 0 && (
        <ul>
          {allFiles.map((file) => {
            const s3 = new S3({
              accessKeyId,
              secretAccessKey,
              endpoint,
            });

            return (
              <li key={file.Key}>
                {file.Key}{" "}
                <a
                  href={s3.getSignedUrl("getObject", {
                    Bucket: bucket,
                    Key: file.Key!,
                    Expires: 3600,
                  })}
                  download
                >
                  Download
                </a>{" "}
                <button className="btn" onClick={() => handleDeleteFile(file)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListFiles;
