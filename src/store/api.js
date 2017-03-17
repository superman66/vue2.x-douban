/**
 * Created by superman on 2016/12/2.
 */
import axios from 'axios';

// 使用代理
const HOST =process.env.NODE_ENV === 'production' ? 'https://node-douban-api.herokuapp.com' : 'http://localhost:8081';

export const API_TYPE = {
  movie: {
    in_theaters: 'in_theaters',
    coming_soon: 'coming_soon',
  }
};

export function fetch(url) {

  return new Promise((resolve, reject)=> {
    axios.get(HOST + url)
        .then(response => {
          resolve(response.data);
        })
  })
}

export function fetchItemByType(type) {
  return fetch(`${type}`);
}


export function fetchMoviesByType(type, start = 0, count = 20) {
  return fetchItemByType(`/movie/${type}?start=${start}&count=${count}`)
}

export function fetchMovieById(id) {
  return fetch(`/movie/subject/${id}`);
}

export function fetchSearchMovies(query, start = 0) {
  let url = encodeURI(`/movie/search?q=${query}&start=${start}`);
  return fetch(url);
}