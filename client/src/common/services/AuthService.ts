import { HttpService } from './HttpService';

import { User, Credentials } from './../models';

export class AuthService {
  constructor(private httpService: HttpService) {}

  public login(credentials: Credentials, isLoginForm: boolean): Promise<User> {
    return this.httpService.POST(
      isLoginForm ? `restApiRoutes.signin` : `restApiRoutes.signup`,
      credentials
    );
  }
}
