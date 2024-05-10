/* eslint-disable import/no-unresolved */
import axios from 'axios';

const delay = (delayMs, resolveValue) => {
  return new Promise(((resolve) => {
    if (delayMs) {
      setTimeout(() => {
        resolve(resolveValue);
      }, delayMs);

      return;
    }

    resolve(resolveValue);
  }));
};

class PokemonsApi {
    getList = (params) => {
      const apiURL = `${process.env.REACT_APP_POKE_API_URL}pokemon${params}`;

      return new Promise((resolve, reject) => {
        axios.get(apiURL).then((response) => {
          const infos = response.data.results.map((result) => {
            return delay(0, this.getInfo(result.name));
          });

          Promise.all(infos).then((data) => {
            resolve({
              ...response.data,
              results: data,
            });
          });
        }).catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
          reject(error);
        });
      });
    }

    getInfo = (name) => {
      const apiURL = `${process.env.REACT_APP_POKE_API_URL}pokemon/${name}`;

      return new Promise((resolve, reject) => {
        axios.get(apiURL).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
          reject(error);
        });
      });
    }
}

const instance = new PokemonsApi();

export default instance;
