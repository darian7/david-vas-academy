import { apiUrl, apiFex } from '../config/Environments';
import { Token } from '../Storage/Token';
import { store } from '../../index'
import { auth } from '../../services/Auth/AuthActions';
export class Api {

  post(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: (formData ? {
        'Authorization': `Bearer ${Token.getToken()}`
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Token.getToken()}`
        }),
      body: dataBody
    }).then(async response => {
      if (response.status === 401) {
        store.dispatch(auth.logout());
        return response;
      }
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  put(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'PUT',
      headers: (formData ? {
        'Authorization': `Bearer ${Token.getToken()}`
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Token.getToken()}`
        }),
      body: dataBody
    }).then(async response => {
      if (response.status === 401) {
        store.dispatch(auth.logout());
        return response;
      }
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  delete(url) {
    return fetch(`${apiUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Token.getToken()}`
      }
    }).then(async response => {
      if (response.status === 401) {
        store.dispatch(auth.logout());
        return response;
      }
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  get(url, params, fex) {
    const api = fex ? apiFex : apiUrl
    url = new URL(`${api}${url}`);
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Token.getToken()}`
      }
    }).then(async response => {
      if (response.status === 401) {
        store.dispatch(auth.logout());
        return response;
      }
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }
}

export default new Api();