const MovieModel = require('../models/movieModel');
const ApiError = require('../exeptions/apiError');

class MovieService {

  async create(title, year, format, actor) {

    const movieExists = await MovieModel.findOne({ where: { title } })
    if (movieExists) {
      throw ApiError.BadRequest(`movie with name ${title} is already exists`)
    }

    const movie = await MovieModel.create({
      title,
      year,
      format,
      actors: actor
    })

    return { movie }
  }

  async update(id, title, year, format, actor) {

    const movie = await MovieModel.update({
      title,
      year,
      format,
      actors: actor
    }, { where: { id } })

    return { movie }
  }

  async getMovieByID(id) {
    const movieData = await MovieModel.findOne({ where: { id } })
    if (!movieData) {
      throw ApiError.BadRequest(`The movie with id ${id} doesn\'t exist`)
    }

    return movieData;
  }

  async getMovieByTitle(title) {
    const movieData = await MovieModel.findAll()
    if (!movieData) {
      throw ApiError.BadRequest(`The movie with title ${title} doesn\'t exist`)
    }

    return movieData.filter(movie => movie.title.split(' ').includes(title));
  }

  async getMovieByActor(actor) {
    const movieData = await MovieModel.findAll()
    if (!movieData) {
      throw ApiError.BadRequest(`The movie with id ${id} doesn\'t exist`)
    }

    return movieData.filter(movie => movie.actors.includes(actor));
  }

  async getAllMovies(req) {
    let movieData;
    if (req.query.sort) {
      movieData = await MovieModel.findAll({
        order: [req.query.sort]
      });
      return movieData;
    }
    movieData = await MovieModel.findAll();

    if (!movieData) {
      throw ApiError.BadRequest('Movies downloading failed');
    }

    return movieData;
  }

  async delete(id) {
    await MovieModel.destroy({ where: { id } })
  }

  async count() {
    const number = await MovieModel.count();
    return number;
  }

}

module.exports = new MovieService();