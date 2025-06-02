import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

const cloudinaryImageHandler = async (method: 'UPLOAD' | 'UPDATE', file: Blob, fileName?: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  const dataUri = `data:${file?.type};base64,${base64}`;

  const options: UploadApiOptions = {
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
    use_filename: false,
    unique_filename: !fileName,
    folder: 'catmoggy-website',
  };

  if (fileName) {
    options.public_id = fileName;
  }

  const res = await cloudinary.uploader.upload(dataUri, options);

  return res;
};

export default cloudinaryImageHandler;
