import { Router } from 'express';

import { getBooks, saveBook } from 'controllers/books';

const router = Router();

router.get('/', getBooks);
router.post('/createbook', saveBook);

export default router;
