import request from 'supertest';

import { HeadersType } from './posts.api';

export class CRUDHelper {
  static get(URL: string, endPoints: string, headers: HeadersType, parameters?: string): Promise<any> {
    return request(URL)
      .get(endPoints)
      .set(headers)
      .query(parameters as string);
  }

  static post(URL: string, endPoints: string, headers: HeadersType, body: string): Promise<any> {
    return request(URL).post(endPoints).set(headers).send(body);
  }

  static put(URL: string, endPoints: string, headers: HeadersType, body: string): Promise<any> {
    return request(URL).put(endPoints).set(headers).send(body);
  }

  static delete(URL: string, endPoints: string, headers: HeadersType, parameters?: string): Promise<any> {
    return request(URL)
      .get(endPoints)
      .set(headers)
      .query(parameters as string);
  }
}
