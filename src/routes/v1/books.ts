import { Router } from 'express';
import multer from 'multer';

import { authenticateToken } from 'controllers/auth/tokens';
import { getBooks, saveBook, getBookById, updateBook, deleteBook, uploadImage } from 'controllers/books';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', authenticateToken, getBooks);
router.get('/:id', authenticateToken, getBookById);
router.post('/createbook', authenticateToken, saveBook);
router.patch('/updatebook/:id', authenticateToken, updateBook);
router.delete('/deletebook/:id', authenticateToken, deleteBook);
router.post('/upload-image', upload.single('files'), uploadImage);

export default router;
