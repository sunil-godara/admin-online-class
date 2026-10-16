import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { Store } from "@/utils/store";
import {
  getSectionSubHeaders,
  getContentFiles,
  editContent,
  addContent,
  deleteContentFile,
  uploadChunks
} from "@/utils/api/content";
import CommonDatePicker from "./CommonDatePicker";
import FilePreview from "./FilePreview";
import FileUpload from "./FileUpload";

export default function ContentLibrary({
  setOpen,
  sectionHeaders,
  values,
  name,
  handleInput
}) {
  const store = Store();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    section_header_id: "",
    sub_header_id: "",
    year: "",
    description: ""
  });
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [subHeaderList, setSubHeaderList] = useState([]);
  const [contentId, setContentId] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");

  const handleInputChange = async ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    switch (target.name) {
      case "section_header_id": {
        setLoading(true);
        const response = await getSectionSubHeaders({
          filter_by: target.value
        });

        if (response.status) {
          setSubHeaderList(response.data);
        }
        setLoading(false);
        break;
      }
    }
  };

  const handleDelete = async id => {
    try {
      // let currentImages = [...images];
      // const indexOfDeletedImage = images.findIndex(image => image.id === id);

      const response = await deleteContentFile({
        id,
        contentId
      });

      if (response.status) {
        // currentImages.splice(indexOfDeletedImage, 1);

        setImages(response.data[0].content_attachment);

        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "success",
          vertical: "top",
          horizontal: "right"
        });
      } else {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      }
    } catch (error) {
      console.error(error);
      store.setSnackbarDetails({
        status: true,
        message: "Something went wrong, Please try again.",
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    }
  };

  const handleSubmit = () => {
    handleInput({
      target: {
        name: name,
        value: selectedImages
      }
    });

    setOpen(false);
  };

  const handleSelection = ({ target }, id) => {
    let currentSelectedImages = [...selectedImageIds];

    if (target.checked) {
      currentSelectedImages.push(id);
    } else {
      const index = currentSelectedImages.indexOf(id);
      currentSelectedImages.splice(index, 1);
    }

    let currentImages = images.filter(image =>
      currentSelectedImages.includes(image.id)
    );

    currentImages = currentImages.map(image => ({
      ...image,
      content_attachment_id: image.id
    }));

    setSelectedImages(currentImages);
    setSelectedImageIds(currentSelectedImages);
  };

  const CHUNK_SIZE = 1024 * 1024;

  const uploadFileInChunks = async (file, uniqueId) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let finalResponse = null;

    // Loop over each chunk and send it to your backend endpoint.
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("fileName", file.name);
      formData.append("chunkIndex", chunkIndex);
      formData.append("totalChunks", totalChunks);
      formData.append("fileId", uniqueId);

      const res = await uploadChunks(formData);

      finalResponse = res;
    }

    return finalResponse;
  };

  const handleFileChange = async ({ target }) => {
    const files = target.files;

    let currentFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const sizeInMB = parseInt(file.size) / (1024 * 1024);

      // let currentFileErrors = errors[target.name];

      if (sizeInMB > 10) {
        setErrors("File size must not be more than 5mb");

        return;
      } else {
        setErrors("");
      }

      const uniqueId = `${file.name}-${Date.now()}-${i}`;

      const newAttachment = {
        id: uniqueId,
        fileName: file.name,
        extension: file.type.split("/")[1],
        fileUrl: null,
        uploading: true
      };

      currentFiles.push(newAttachment);

      try {
        const response = await uploadFileInChunks(file, uniqueId);

        currentFiles = currentFiles.map(att =>
          att.fileName === file.name && att.uploading
            ? {
                ...att,
                id: response.id, // mark as uploaded
                fileUrl: response.fileUrl,
                content_file_path: response.content_file_path,
                uploading: false,
                is_chunked: true
              }
            : att
        );
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          [file.name]: "Failed to upload file"
        }));

        currentFiles = currentFiles.map(att =>
          att.fileName === file.name ? { ...att, uploading: false } : att
        );
      }
    }

    try {
      let body = {
        ...inputs,
        content_attachment: [...images, ...currentFiles]
      };

      if (contentId) {
        body = {
          ...body,
          id: contentId
        };
      }
      const response = contentId
        ? await editContent(body)
        : await addContent(body);

      if (response.status === true) {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "success",
          vertical: "top",
          horizontal: "right"
        });

        setImages(response.data.content_attachment);
      } else {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "error",
          vertical: "top",
          horizontal: "right"
        });

        if (response.data) {
          setErrors(response.data);
        }
      }
    } catch (error) {
      store.setSnackbarDetails({
        status: true,
        message: "Something went wrong, Please try again.",
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    }
  };

  useEffect(() => {
    if (values && values.length > 0) {
      setSelectedImages(values);
      setSelectedImageIds(values.map(value => value.id));
    }
  }, [values]);

  useEffect(() => {
    (async () => {
      if (inputs.section_header_id && inputs.sub_header_id && inputs.year) {
        setLoading(true);
        const response = await getContentFiles({
          section_header_id: inputs.section_header_id,
          sub_header_id: inputs.sub_header_id,
          year: inputs.year
        });

        if (response.status) {
          setImages(response.data.content_attachment);
          setContentId(response.data.id);
          setInputs(prev => ({
            ...prev,
            description: response.data.description
          }));
        } else {
          setImages([]);
        }
        setLoading(false);
      }
    })();
  }, [inputs.section_header_id, inputs.sub_header_id, inputs.year]);

  return (
    <Wrapper>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems={"flex-end"}
      >
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FormLabel>Section Header</FormLabel>
            <TextField
              id="section_header_id"
              name="section_header_id"
              select
              value={inputs.section_header_id}
              onChange={handleInputChange}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {sectionHeaders &&
                sectionHeaders.map(({ section_header_name, id }) => (
                  <MenuItem key={id} value={id}>
                    {section_header_name}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FormLabel>Sub Header</FormLabel>
            <TextField
              id="sub_header_id"
              name="sub_header_id"
              select
              value={inputs.sub_header_id}
              onChange={handleInputChange}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {subHeaderList.length > 0 &&
                subHeaderList.map(({ sub_header_name, id }) => (
                  <MenuItem key={`sub-header_${id}`} value={id}>
                    {sub_header_name}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FormLabel>Year</FormLabel>
            <CommonDatePicker
              value={inputs.year}
              views={["year"]}
              dateFormat="yyyy"
              name="year"
              handleInputChange={handleInputChange}
              showYearPicker={true}
              placeholderText="Select Year"
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Description</FormLabel>
            <TextField
              placeholderText="Enter text"
              id="description"
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid> */}
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FileUpload
              handleUpload={handleFileChange}
              label="Choose File"
              Icon={false}
              name="content_attachment"
              variant="outline"
              color="primary"
              size="small"
              multiple={true}
              helperText={errors}
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent={loading ? "center" : "flex-start"}
        >
          {!loading && (
            <>
              {images && images.length > 0 ? (
                <DocumentActionContainer className="manual-upload">
                  {images.map((attachment, index) => (
                    <FilePreview
                      attachment={{ ...attachment }}
                      handleDelete={() => handleDelete(attachment.id)}
                      key={`file-preview-${index}`}
                      canDelete
                      canSelect
                      handleSelection={handleSelection}
                      values={selectedImageIds}
                    />
                  ))}
                </DocumentActionContainer>
              ) : (
                <NoRecords>
                  <Typography variant="h2">No Records Found</Typography>
                </NoRecords>
              )}
            </>
          )}
          {loading && (
            <NoRecords>
              <CircularProgress />
            </NoRecords>
          )}
        </Grid>
      </Grid>
      <ActionContainer>
        <Button variant="containedSecondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Save
        </Button>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
  }
`}
`;

const ActionContainer = styled.div`
  ${({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing(1)};
`}
`;

const DocumentActionContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.spacing(1)};
    background: transparent;
    padding: 4px;
    box-shadow: 7px;
    min-height: 150px;

    span {
      word-break: break-all
    }

    .MuiSvgIcon-root {
      cursor: pointer;
    }

    &.manual-upload {
      column-gap: 8px;
      row-gap: 68px;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      overflow-y: auto;
    }
`}
`;

const NoRecords = styled.div`
  ${() => `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
  `}
`;
