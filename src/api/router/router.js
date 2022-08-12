const Router = require('express').Router;
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();

router.post('/users', userController.registration);
router.post('/sessions', userController.login);

router.post('/movies', authMiddleware, movieController.createMovie);
router.delete('/movies/:id', authMiddleware, movieController.deleteMovie);
router.get('/movies/:id', authMiddleware, movieController.getMovie);
router.put('/movies/:id', authMiddleware, movieController.updateMovie);
router.get('/movies', authMiddleware, movieController.getAllMovies);
router.get('/count', authMiddleware, movieController.countMovies);

module.exports = router;