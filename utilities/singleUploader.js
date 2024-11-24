const createHttpError = require("http-errors");

const uploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_message
) => {
  // upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;
  //   define upload storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const fileName = file.originalname
        .replace(`.${fileExt}`, "")
        .toLowerCase()
        .split(" ")
        .join("-");
      cb(null, `${fileName}-${Date.now()}.${fileExt}`);
    },
  });
  //   define upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createHttpError(error_message));
      }
    },
  });
  return upload;
};

module.exports = uploader;
