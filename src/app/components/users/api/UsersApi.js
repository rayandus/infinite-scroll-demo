/* eslint-disable import/no-unresolved */
import axios from 'axios';

class UsersApi {
    getUsers = (params) => {
      const apiURL = `${process.env.REACT_APP_USERS_API_URL}api/users${params}`;

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

const instance = new UsersApi();

export default instance;
