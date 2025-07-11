/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Lead } from '../../models/lead';

export interface LeadsCreatePost$Params {
      body: {
'name'?: string;
'description'?: string;
'country'?: number;
'activitySector'?: string;
'assigned_to_user_id'?: number;
'website'?: string;
'status'?: string;
'email'?: string;
'telephone'?: string;
'address'?: string;
'town'?: string;
'tags'?: string;
'is_private'?: boolean;
'source'?: number;
'lead_value'?: number;
}
}

export function leadsCreatePost(http: HttpClient, rootUrl: string, params: LeadsCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Lead>> {
  const rb = new RequestBuilder(rootUrl, leadsCreatePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Lead>;
    })
  );
}

leadsCreatePost.PATH = '/leads/create';
