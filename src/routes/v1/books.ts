import { Router } from 'express';

import { authenticateToken } from 'controllers/auth/tokens';
import { getBooks, saveBook } from 'controllers/books';

const router = Router();

router.get('/', getBooks);
router.post('/createbook', saveBook);

export default router;
