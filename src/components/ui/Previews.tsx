import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#374151",
  color: "#fafafafa",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  height: "100%",

};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: "50%",
  height: "50%",
  padding: 4,
  boxSizing: "border-box",
  marginRight: "auto",
  marginLeft: "auto",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  height: "40%",
  width: "100%",
};

const img = {
  display: "block",
  height: "100%",
  width: "100%",
};

export default function Previews(props: any) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },

      onDrop: (acceptedFiles) => {
        props.setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = props.files.map((file:any) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => props.files.forEach((file:any) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="w-full h-full">
      {props.files.length > 0 ? (
        <aside style={thumbsContainer}>{thumbs}</aside>
      ) : (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Bazı dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için tıklayın.</p>
        </div>
      )}
    </section>
  );
}

<Previews />;
