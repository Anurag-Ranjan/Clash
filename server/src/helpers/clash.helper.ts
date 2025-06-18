import { UploadedFile } from "express-fileupload";
import { v4 as uuid4 } from "uuid";
import fs from "fs";

export const uploadFile = async (image: UploadedFile) => {
  const imgExt = image?.name.split(".")[1];
  const imageName = uuid4() + "." + imgExt;
  const uploadPath = process.cwd() + "/public/images/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return imageName;
};

export const removeImage = async (imageName: string) => {
  const path = process.cwd() + "/public/images/" + imageName;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
