export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][]
}
  & {
    [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (val: DataEntityMap[K]) => DataEntityMap[K]
  }
  & {
    [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void
  }

export class DataStore implements DataStoreMethods {

  // songs: Song[] = []
  // movies: Movie[] = []
  // Instead of the above, get fancy
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {}
  }
  // getAllSongs = () => this.songs
  getAllSongs = () => {
    return Object.keys(this.#data.song).map(songKey => this.#data.song[songKey]!)
  }
  // getAllMovies = () => this.movies
  getAllMovies = () => {
    return Object.keys(this.#data.movie).map(movieKey => this.#data.movie[movieKey]!)
  }
  // // clearSongs = () => {
  //   this.songs = []
  // }
  clearSongs = () => {
    this.#data.song = {}
  }
  // clearMovies = () => {
  //   this.movies = []
  // }
  clearMovies = () => {
    this.#data.movie = {}
  }

  // addSong = (song: Song) => {
  //   this.songs.push(song)
  //   return song
  // }

  addSong = (song: Song) => {
    this.#data.song[song.id] = song
    return song
  }

  // addMovie = (movie: Movie) => {
  //   this.movies.push(movie)
  //   return movie
  // }
  addMovie = (movie: Movie) => {
    this.#data.movie[movie.id] = movie
    return movie
  }
}
