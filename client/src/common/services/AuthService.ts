import { CurrentUser } from './../models/User';
import { HttpService } from './HttpService';

import { UserResponse, Credentials } from './../models';
import { restApiRoutes } from 'core';
import { AxiosPromise } from 'axios';

export class AuthService {
  constructor(private httpService: HttpService) {}

  public login(
    credentials: Credentials,
    isLoginForm: boolean
  ): AxiosPromise<UserResponse> {
    return this.httpService.POST(
      isLoginForm ? `${restApiRoutes.signin}` : `${restApiRoutes.signup}`,
      credentials
    );
  }

  public getCurrentUser(): AxiosPromise<CurrentUser> {
    return this.httpService.GET(restApiRoutes.currentUser);
  }

  public logout(): AxiosPromise<void> {
    return this.httpService.POST(restApiRoutes.logout, {});
  }
}
