import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags, ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
import { Response } from 'express';
import Stripe from 'stripe';
import { Student } from 'src/students/entities/student.entity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
});

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  async create(@Body() createPaymentDto: CreatePaymentDto, @Res() res: Response) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(String(createPaymentDto.amount), 10), 
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const payment = await this.paymentsService.create({
        ...createPaymentDto,
        paymentIntentId: paymentIntent.id,
      });

      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment.id, 
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).send({ error: 'Failed to create payment.' });
    }
  }

  @Get(':id') 
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment found.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Get('month/:year/:month')
  @ApiOperation({ summary: 'Get all payments for a given month' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully.' })
  @ApiParam({ name: 'year', description: 'The year of the payments (e.g., 2024)', example: '2024' })
  @ApiParam({ name: 'month', description: 'The month of the payments (1-12)', example: '3' })
  async getPaymentsByMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<Payment[]> {
    return this.paymentsService.getPaymentsByMonth(parseInt(year, 10), parseInt(month, 10));
  }

  @Get('month/:year/:month/paid')
  @ApiOperation({ summary: 'Get students who have paid for a given month' })
  async getPaidStudentsByMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<Student[]> {
    return this.paymentsService.getPaidStudentsByMonth(parseInt(year, 10), parseInt(month, 10));
  }

  @Get('month/:year/:month/unpaid')
  @ApiOperation({ summary: 'Get students who have not paid for a given month' })
  async getUnpaidStudentsByMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<Student[]> {
    return this.paymentsService.getUnpaidStudentsByMonth(parseInt(year, 10), parseInt(month, 10));
  }
}