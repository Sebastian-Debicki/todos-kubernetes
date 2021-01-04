import { AuthService } from './AuthService';
import { HttpService } from './HttpService';

const httpService = new HttpService();

export const authService = new AuthService(httpService);
