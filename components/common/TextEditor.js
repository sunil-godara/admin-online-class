import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const TextEditor = ({
  handleInputChange,
  config = undefined,
  value,
  disabled = false,
  id = undefined,
  name = "",
  height = 200
}) => {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const onInit = editor => {
    editorRef.current = editor;
    editor.editing.view.change(writer => {
      writer.setStyle(
        "height",
        `${height}px`,
        editor.editing.view.document.getRoot()
      );
    });
  };

  const onChange = (event, editor) => {
    const value = editor.getData();

    handleInputChange({
      target: {
        event,
        editor,
        value,
        name: name,
        type: "editor"
      }
    });
  };

  useEffect(() => {
    setEditorLoaded(true);

    return () => {
      // Clean up the editor instance if it's initialized
      if (editorRef.current) {
        editorRef.current.destroy().catch(err => {
          console.error("Error during CKEditor cleanup", err);
        });
      }
    };
  }, []);

  return (
    <>
      {editorLoaded && (
        <CKEditor
          config={config}
          data={value}
          disabled={disabled}
          editor={Editor}
          id={id}
          ref={editorRef}
          onChange={onChange}
          onError={error => console.log("error", error)}
          onReady={onInit}
        />
      )}
    </>
  );
};

export default TextEditor;
