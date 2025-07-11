/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface UserRegisterPost$Params {
      body: {
'first_name': string;
'last_name': string;
'linkedIn'?: string;
'email': string;
'password': string;
'role': 'solo_business_developer' | 'enterprise_admin';
}
}

export function userRegisterPost(http: HttpClient, rootUrl: string, params: UserRegisterPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userRegisterPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

userRegisterPost.PATH = '/user/register';
