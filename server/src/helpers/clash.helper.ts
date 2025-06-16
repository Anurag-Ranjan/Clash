import { UploadedFile } from "express-fileupload";
import { v4 as uuid4 } from "uuid";

export const uploadFile = async (image: UploadedFile) => {
  const imgExt = image?.name.split(".")[1];
  const imageName = uuid4() + "." + imgExt;
  const uploadPath = process.cwd() + "/public/images/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return imageName;
};
