/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ActivitiesBusinessesBusinessIdGet$Params {
  businessId: number;
  page?: number;
  limit?: number;
}

export function activitiesBusinessesBusinessIdGet(http: HttpClient, rootUrl: string, params: ActivitiesBusinessesBusinessIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, activitiesBusinessesBusinessIdGet.PATH, 'get');
  if (params) {
    rb.path('businessId', params.businessId, {});
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

activitiesBusinessesBusinessIdGet.PATH = '/activities/businesses/{businessId}';
