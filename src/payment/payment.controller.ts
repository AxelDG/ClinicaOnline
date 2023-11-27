import { Controller, Get, Post, Req, Res} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response, Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  async createOrder(@Req() req: Request, @Res() res: Response) {
    return await this.paymentService.createOrder(req, res);
  }

  @Post('capture-order')
  async captureOrder(@Req() req: Request, @Res() res: Response) {
    return await this.paymentService.captureOrder(req, res);
  }

  @Get('cancel-order')
  async cancelPayment(@Req() req: Request, @Res() res: Response) {
    return await this.paymentService.cancelPayment(req, res);
  }
}
