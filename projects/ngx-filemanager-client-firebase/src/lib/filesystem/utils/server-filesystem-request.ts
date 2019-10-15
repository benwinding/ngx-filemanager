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
      const response = await this.http
        .post(this.url, this.body, this.options)
        .pipe(take(1))
        .toPromise();
      return response as any;
    } catch (apiErrorResponse) {
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
