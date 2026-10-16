import React from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImageView = ({ images, width, height }) => {
  return (
    <PhotoProvider>
      <div className="foo">
        {images.customer_support_attachment?.length > 0 &&
          images.customer_support_attachment?.map((attachment, index) => (
            <PhotoView key={`attachment-${index}`} src={attachment.file}>
              <Image
                src={attachment.file}
                alt={`customer-support-file-${index}`}
                width={width}
                height={height}
              />
            </PhotoView>
          ))}
      </div>
    </PhotoProvider>
  );
};

export default ImageView;
