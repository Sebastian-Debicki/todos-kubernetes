import axios from 'axios';

export class HttpService {
  GET<R>(url: string): Promise<R> {
    return axios.get(url);
  }

  POST<T, R>(url: string, body: T): Promise<R> {
    return axios.post(url, body);
  }

  DELETE<R>(url: string): Promise<R> {
    return axios.delete(url);
  }
}
