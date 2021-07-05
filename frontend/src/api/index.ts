import ky from 'ky';
import jwt_decode from 'jwt-decode';
import { JWTInterface, PaginatedUsers, UserInterface } from '../interfaces';
import { BASE_URL } from '../config';

class Api {
  JWT: string;

  userId: string;

  client: typeof ky;

  constructor(JWT: string) {
    this.JWT = JWT;
    this.userId = jwt_decode<JWTInterface>(JWT).id;
    this.client = ky.extend({
      prefixUrl: BASE_URL,
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set('Authorization', this.JWT);
          },
        ],
      },
    });
  }

  async getProfile(): Promise<UserInterface> {
    return this.client.get(`api/user/${this.userId}`).json<UserInterface>();
  }

  async getUsers(): Promise<PaginatedUsers> {
    return this.client.get('api/user').json<PaginatedUsers>();
  }
}

export default Api;
