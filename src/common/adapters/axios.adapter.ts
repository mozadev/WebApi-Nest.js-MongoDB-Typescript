import axios, { AxiosInstance } from 'axios';
import { HttAdapter } from '../interfaces/http-adapter.interface';

export class AxiosAdapter implements HttAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    // throw new Error("Method not implemented.");
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error from AxiosAdapter - Check logs');
    }
  }
}
