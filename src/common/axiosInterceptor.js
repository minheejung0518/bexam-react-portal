import axios from 'axios';
import Swal from 'sweetalert2';
import TokenService from '../services/TokenService';

const setupAxiosInterceptors = () => {
  try {
    const onResponseSuccess = response => {
      return Promise.resolve(response);
    };

    const onResponseError = error => {
      console.log('onResponseError', error);

      const status = error.status || (error.response ? error.response.status : 0);

      if (status === 401) {
        TokenService.remove();
        window.location.href = '/login';
      } else {
        Swal.fire({
          icon: 'error',
          type: 'error',
          text: `${error?.response.data?.message}`,
        });
      }

      return Promise.reject(error);
    };
    //axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
  } catch (error) {
    console.log(error);
  }
};

export default setupAxiosInterceptors;
