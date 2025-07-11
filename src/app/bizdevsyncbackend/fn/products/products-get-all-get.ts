/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Product } from '../../models/product';

export interface ProductsGetAllGet$Params {
  page?: number;
  limit?: number;
}

export function productsGetAllGet(http: HttpClient, rootUrl: string, params?: ProductsGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'count'?: number;
'rows'?: Array<Product>;
}>> {
  const rb = new RequestBuilder(rootUrl, productsGetAllGet.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'count'?: number;
      'rows'?: Array<Product>;
      }>;
    })
  );
}

productsGetAllGet.PATH = '/products/get-all';
