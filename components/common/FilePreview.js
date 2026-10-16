import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Delete } from "@mui/icons-material";
import { Checkbox, TextField } from "@mui/material";

const ImageContainer = styled("div")(() => ({
  width: "100%",
  maxWidth: "350px",
  position: "relative",

  ".action-container": {
    position: "absolute",

    ".MuiButtonBase-root": {
      color: " #ffffff",
      zIndex: 9,

      ".MuiSvgIcon-root": {
        width: "35px",
        height: "35px"
      }
    }
  }
}));

const ImageUploadCard = styled("div")(() => ({
  height: "150px",
  width: "100%",
  maxWidth: "350px",
  border: "1px solid #afafaf",
  position: "relative",
  marginBottom: "10px",

  "&.can-select": {
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1
    }
  },

  img: {
    height: "100%",
    width: "100%",
    padding: "8px 0",
    objectFit: "cover"
  },

  ".pdf-view": {
    height: "100%"
  }
}));

const DescriptionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#022259",
  padding: theme.spacing(1),

  span: {
    margin: 0,
    color: "#FFFFFF",
    width: "100%",

    ".MuiFormControl-root": {
      width: `100%`,
      ".MuiInputBase-root": {
        color: "#FFFFFF",

        input: {
          height: "8px"
        }
      }
    }
  }
}));

const ActionContainer = styled("div")(() => ({
  ".MuiSvgIcon-root": {
    color: "#FFFFFF",
    cursor: "pointer"
  }
}));

const imageTypes = ["png", "jpg", "jpeg", "svg", "ico"];
const videoExtensions = ["mp4", "mov", "webm", "mpeg", "3gp"];

const FilePreview = ({
  attachment,
  handleDelete,
  handleSelection,
  values,
  canDelete = false,
  canSelect = false,
  handleFileName
}) => {
  const [filePath, setFilePath] = useState("");
  const [mimeType, setMimeType] = useState("");

  const renderFilePreview = () => {
    if (mimeType && imageTypes.includes(mimeType.toLowerCase())) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={filePath} alt={attachment.file_name} aria-label="heroImage" />
      );
    }

    if (mimeType && videoExtensions.includes(mimeType.toLowerCase())) {
      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video width="400" height="400" controls autoPlay>
          <source src={filePath} type={`video/${mimeType}`} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (mimeType === "pdf") {
      return (
        <object
          data={filePath}
          className="pdf-view"
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <p>
            Your browser does not support PDFs. You can download the PDF
            instead:
            <a href={filePath} download={attachment.file_name}>
              Download PDF
            </a>
            .
          </p>
        </object>
      );
    }

    return (
      <p>
        Preview not available for {attachment.file_name}. You can download the
        file:
        <a href={filePath} download={attachment.file_name}>
          Download
        </a>
        .
      </p>
    );
  };

  useEffect(() => {
    let base64String = attachment.content_file_path;
    let mime = attachment.extension;
    setMimeType(mime);
    setFilePath(base64String);
  }, [attachment]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ImageContainer className="container">
      {canSelect && (
        <div className="action-container">
          <Checkbox
            id={`checkbox-${attachment.id}`}
            name="check"
            label=""
            checked={values.includes(attachment.id)}
            onChange={event => handleSelection(event, attachment.id)}
          />
        </div>
      )}
      <ImageUploadCard
        className={`image-container ${canSelect ? "can-select" : ""}`}
      >
        {" "}
        {renderFilePreview()}{" "}
      </ImageUploadCard>
      <DescriptionContainer>
        <span>
          {!attachment.id || attachment.is_chunked ? (
            <TextField
              placeholder="Custom File Name"
              value={attachment.file_name || attachment.fileName}
              sx={{ mr: 2 }}
              onChange={handleFileName}
            />
          ) : (
            <span>{attachment.file_name || attachment.fileName}</span>
          )}
        </span>

        {canDelete && (
          <ActionContainer>
            <Delete onClick={handleDelete} />
          </ActionContainer>
        )}
      </DescriptionContainer>
    </ImageContainer>
  );
};

export default FilePreview;
