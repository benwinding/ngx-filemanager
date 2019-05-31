import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
export class FileSystemRequestBuilder {
  private options = {
    headers: {}
  };
  private body: {};
  constructor(
    private http: HttpClient,
    private url: string,
    private requestsMap: ActiveRequestsMap
  ) {}
  AddBody(body) {
    this.body = {
      ...this.body,
      ...body
    };
    return this;
  }
  PatchBody<T>(body: Partial<T>) {
    const partBody = body as any;
    this.body = {
      ...this.body,
      ...partBody
    };
    return this;
  }
  PatchHeaders(headers: {}) {
    this.options.headers = {
      ...this.options.headers,
      ...headers
    };
    return this;
  }
  MakeJson() {
    this.options['responseType'] = 'json';
    this.options.headers['Content-Type'] = 'application/json';
  }
  private makeRequestKey() {
    const key = this.url + JSON.stringify(this.body || {});
    return key;
  }

  async POST() {
    const key = this.makeRequestKey();
    try {
      this.requestsMap[key] = { status: 'Request Initiated' };
      const response = await this.http
        .post(this.url, this.body, this.options)
        .pipe(take(1))
        .toPromise();
      this.requestsMap[key] = { status: 'Request Completed' };
      return response as any;
    } catch (apiErrorResponse) {
      this.requestsMap[key] = { status: 'API Post Error', error: apiErrorResponse };
      console.error('API Post Error', { apiErrorResponse });
      if (apiErrorResponse.error && apiErrorResponse.error.errorDetail) {
        const detail = apiErrorResponse.error.errorDetail;
        throw new Error('API Response: ' + detail);
      }
      throw new Error(
        'API request failed, status:' + apiErrorResponse.statusText
      );
    }
  }
}

export interface ActiveRequestsMap {
  [action: string]: {
    status: string;
    error?: string;
  };
}
