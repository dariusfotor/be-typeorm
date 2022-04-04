import { Router } from 'express';

import { login, register, changePassword } from 'controllers/auth';
import { logout } from 'controllers/auth/logout';
import { refreshToken } from 'controllers/auth/tokens';
import { checkJwt } from 'middleware/checkJwt';
import { validatorLogin, validatorRegister, validatorChangePassword } from 'middleware/validation/auth';

const router = Router();

router.post('/login', [validatorLogin], login);
router.post('/register', [validatorRegister], register);
router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;
