import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { logger, stream } from '@utils/logger';

export class AxiosClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // Timeout for requests (in milliseconds)
    });
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      logger.error('Error performing POST request:', error);
      throw error;
    }
  }

  public async get<T>(url = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      logger.error('Error performing POST request:', error);
      throw error;
    }
  }
}
