/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Competitor } from '../../models/competitor';

export interface CompetitorsCreatePost$Params {
      body: {
'name'?: string;
'sector'?: string;
'headquater_location'?: string;
'reference_clients'?: string;
'product_line'?: string;
'website'?: string | null;
'notes'?: string | null;
}
}

export function competitorsCreatePost(http: HttpClient, rootUrl: string, params: CompetitorsCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Competitor>> {
  const rb = new RequestBuilder(rootUrl, competitorsCreatePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Competitor>;
    })
  );
}

competitorsCreatePost.PATH = '/competitors/create';
