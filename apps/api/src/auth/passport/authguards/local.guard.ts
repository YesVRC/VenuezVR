import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import e from 'express';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const tokens = await this.authService.genTokens(request.user.id);
    context
      .switchToHttp()
      .getResponse<e.Response>()
      .json({ at: tokens.at, rt: tokens.rt });
    return Promise.resolve(activate);
  }
}
