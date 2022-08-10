const movieService = require('../service/movieService');
const multer = require('multer');
const fs = require('fs');
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline);

const upload = multer();

class MovieController {

  async create(req, res, next) {
    try {
      const { title, year, format, actor } = req.body;
      const movieData = await movieService.create(title, year, format, actor);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async getMovie(req, res, next) {
    try {
      const id = req.params.id;
      const movieData = await movieService.getMovieByID(id);
      return res.json(movieData);
    } catch (e) {
      next(e)
    }
  }

  async getAllMovies(req, res, next) {
    if (req.query.title) {
      try {
        const movieData = await movieService.getMovieByTitle(req.query.title);
        return res.json(movieData);
      } catch (e) {
        next(e)
      }
    }

    if (req.query.actor) {
      try {
        const movieData = await movieService.getMovieByActor(req.query.actor);
        return res.json(movieData);
      } catch (e) {
        next(e)
      }
    }

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

  async import(req, res, next) {
    console.log(req);
  }
}

module.exports = new MovieController();