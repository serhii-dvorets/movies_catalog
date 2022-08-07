const MovieModel = require('../models/movieModel');
const ApiError = require('../exeptions/apiError');

class MovieService {

  async create(title, year, format, actors) {
    const movieExists = await MovieModel.findOne({ where: { title } })
    if (movieExists) {
      throw ApiError.BadRequest(`movie with name ${title} is already exists`)
    }

    const movie = await MovieModel.create({
      title,
      year,
      format,
      actors,
    })

    return { movie }
  }

  async update(id, title, year, format, actors) {

    const movieToUpdate = await MovieModel.findOne({ where: { id } })
    if (!movieToUpdate) {
      throw ApiError.BadRequest(`The movie with id ${id} doesn\'t exist`)
    }
    
    movieToUpdate.title = title,
    movieToUpdate.year = year,
    movieToUpdate.format = format,
    movieToUpdate.actors = actors,

    await movieToUpdate.save();
    return movieToUpdate;
  }

  async getMovie(id) {
    const movieData = await MovieModel.findOne({ where: { id } })
    if (!movieData) {
      throw ApiError.BadRequest(`The movie with id ${id} doesn\'t exist`)
    }

    return movieData;
  }

  async getAllMovies(req) {
    console.log(req.query.sort);
    const movieData = await MovieModel.findAll();
    if (!movieData) {
      throw ApiError.BadRequest('Movies downloading failed');
    }

    return movieData;
  }

  async delete(id) {
    await MovieModel.destroy({ where: { id } })
  }

}

module.exports = new MovieService();