import ky from 'ky';
import jwt_decode from 'jwt-decode';
import {
  JWTInterface,
  AdminPaginatedUsers,
  PinInterface,
  UserInterface,
  RedeemTokenInterface,
  UserPaginatedUsers,
  VodkaData,
} from '../interfaces';
import { BASE_URL } from '../config';

export interface GlobalContextInterface {
  JWT?: string;
  user?: UserInterface;
  addNotification: (title: string, children: React.ReactNode) => void;
  apiClient?: Api;
}

class Api {
  JWT: string;

  user: Pick<
    UserInterface,
    '_id' | 'username' | 'firstName' | 'lastName' | 'lastName' | 'role'
  >;

  client: typeof ky;

  constructor(JWT: string) {
    const decodedJWT = jwt_decode<JWTInterface>(JWT);
    this.JWT = JWT;
    this.user = {
      _id: decodedJWT.id,
      username: decodedJWT.username,
      firstName: decodedJWT.firstName,
      lastName: decodedJWT.lastName,
      role: decodedJWT.role,
    };
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
    return this.client.get(`api/user/${this.user._id}`).json<UserInterface>();
  }

  async getUsers(): Promise<AdminPaginatedUsers | UserPaginatedUsers> {
    return this.client
      .get('api/user')
      .json<AdminPaginatedUsers | UserPaginatedUsers>();
  }

  async getInviteLink(userId: string): Promise<string> {
    return (
      await this.client
        .post('api/redeemToken', { json: { userId } })
        .json<RedeemTokenInterface>()
    ).token;
  }

  getVideoLink(userId?: string): string {
    return `${BASE_URL}/api/video/${userId || this.user._id}`;
  }

  getAvatarUrl(username?: string): string {
    return `${BASE_URL}/api/avatar/${username || this.user.username}`;
  }

  async getJWT(pin: number): Promise<PinInterface> {
    return this.client.post('api/pin', { json: { pin } }).json<PinInterface>();
  }

  async checkForVideo(): Promise<boolean> {
    try {
      await this.client.head(`api/video/${this.user._id}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  async postUser(formData: FormData): Promise<boolean> {
    return this.client
      .post('api/user', { body: formData, timeout: 2147483647 })
      .json();
  }

  async updateUser(formData: FormData, userId?: string): Promise<boolean> {
    try {
      await this.client.patch(`api/user/${userId || this.user._id}`, {
        body: formData,
        timeout: 2147483647,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await this.client.delete(`api/user/${userId}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getPoll(): Promise<Record<any, any>> {
    return this.client.get('api/poll').json<Record<any, any>>();
  }

  static async sendSurvey(PostId: string, survey: any) {
    try {
      await ky.post(`https://api.surveyjs.io/public/Survey/post`, {
        json: {
          PostId,
          SurveyResult: JSON.stringify(survey),
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getVodkaPoll() {
    return this.client.get('api/vodka-poll').json<VodkaData>();
  }
}

export default Api;
