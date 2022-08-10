const multer = require('multer');
const upload = multer();

const Router = require('express').Router;
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();

router.post('/users', userController.registration);
router.post('/sessions', userController.login);

router.post('/movies', authMiddleware, movieController.create);
router.delete('/movies/:id', authMiddleware, movieController.delete);
router.get('/movies/:id', authMiddleware, movieController.getMovie);
router.get('/movies', authMiddleware, movieController.getAllMovies);
router.post('/movies/import', upload.single("movies"), movieController.import);

module.exports = router;