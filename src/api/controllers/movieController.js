const movieService = require('../service/movieService');

class MovieController {

  async create(req, res, next) {
    try {
      const { title, year, format, actors } = req.body;
      const movieData = await movieService.create(title, year, format, actors);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const { title, year, format, actors } = req.body;
      const id = req.params.id;
      const movieData = await movieService.update(id, title, year, format, actors);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async getMovie(req, res, next) {
    try {
      const id = req.params.id;
      const movieData = await movieService.getMovie(id);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async getAllMovies(req, res, next) {
    try {
      const movieData = await movieService.getAllMovies(req);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await movieService.delete(id);
      res.send('movie removed');
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new MovieController();