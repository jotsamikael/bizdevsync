/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Followup } from '../../models/followup';

export interface FollowupsDeleteIdDelete$Params {
  id: number;
}

export function followupsDeleteIdDelete(http: HttpClient, rootUrl: string, params: FollowupsDeleteIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Followup>> {
  const rb = new RequestBuilder(rootUrl, followupsDeleteIdDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Followup>;
    })
  );
}

followupsDeleteIdDelete.PATH = '/followups/delete/{id}';
