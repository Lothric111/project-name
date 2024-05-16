import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './src/uploads',
    filename: (req, file, cb) => {
      const name = file?.originalname?.split('.')[0];
      const fileExtName = file?.originalname?.split('.')[1];
      const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
      cb(null, `${name}-${randomName}.${fileExtName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file?.originalname?.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
};