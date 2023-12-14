import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserSerializationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log('Interceptor logging handler: ', context.getHandler());
        if (Array.isArray(data)) {
          return data.map((item) => this.removeSensitiveData(item));
        } else {
          return this.removeSensitiveData(data);
        }
      }),
    );
  }

  private removeSensitiveData(data: any): any {
    return {
      _id: data._id,
      name: data.name,
      username: data.username,
    };
  }
}
