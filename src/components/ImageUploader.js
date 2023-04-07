import React, { useMemo, useState } from 'react';
import { BASE_URL, useUploadImageMutation } from '../store/api';
import { useDropzone } from 'react-dropzone';
import { Image } from './Image/Image';
import { Avatar, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dnd from './Dnd';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const avatarStyle = {
  cursor: 'pointer',
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ImageOnDnd = ({ image, onDelete }) =>
  <Box sx={{ width: '100px', mr: '20px', position: 'relative' }} key={image._id}>
    <Box
      onClick={() => onDelete(image)}
      sx={{ position: 'absolute', right: '-12px', top: '-6px', cursor: 'pointer' }}
    >
      <HighlightOffIcon sx={{ color: '#1976d2' }} />
    </Box>
    <Image url={image?.url} />
  </Box>

function ImageUploader({ previousImages, onChange, isAvatar }) {
  const [images, setImages] = useState(previousImages || []);
  const [uploadImage, result] = useUploadImageMutation();

  const updateImages = images => {
    setImages(images);
    if (onChange) {
      onChange(images);
    }
  }

  const onDrop = acceptedFiles => {
    filesUpload(acceptedFiles).then(imagesResponse => {
      console.log(imagesResponse);
      updateImages(isAvatar ? imagesResponse : images.concat(imagesResponse));
    });
  }
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: { 'image/*': [] }, onDrop, maxFiles: !!isAvatar });

  const style = useMemo(() => ({
    ...(isAvatar ? avatarStyle : baseStyle),
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);



  const fileUpload = (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return uploadImage(formData).then(response => {
      return Promise.resolve(response.data);
    });
  }

  const filesUpload = (files) => {
    return Promise.all(files.map(fileUpload));
  }
  const deleteImage = image => updateImages(images.filter(i => i != image));

  const localImage = ({ image }) => <ImageOnDnd image={image} onDelete={imgToDelete => deleteImage(imgToDelete)} />

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isAvatar ? <Avatar sx={{ width: '250px', height: '250px' }} src={images[0] ? (BASE_URL + '/' + images[0]?.url) : ''} /> :
          <>
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </>
        }
      </div>
      {!isAvatar && <Box sx={{ display: 'flex', m: '20px auto 0' }}>
        <Dnd items={images} render={localImage} onChange={images => updateImages(images)} itemProp="image" keyField="_id" horizontal />
      </Box>}
    </>
  )
}

export default ImageUploader;