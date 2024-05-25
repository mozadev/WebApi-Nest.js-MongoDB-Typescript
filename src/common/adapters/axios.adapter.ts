import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

// This adaptaer patron is a nivel of module, so I have export this class to use it in another module
// if I want use other adapter I have to implement HttpAdapter interface
@Injectable()
export class AxiosAdapter implements HttpAdapter {
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
