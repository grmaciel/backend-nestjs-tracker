import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        call$: Observable<T>,
    ): Observable<Response<T>> {
        return call$.pipe(map(data => ({ data }),
        tap(data => 'data on network: ' + JSON.stringify(data))));
    }
}