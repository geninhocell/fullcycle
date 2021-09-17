import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TenantGuard } from 'src/tenant/tenant.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private tenantService: TenantService,
  ) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    console.log(this.tenantService.tenant);
    return this.reportsService.create(createReportDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @MessagePattern('reports-generated')
  async reportGenerated(
    @Payload()
    message: KafkaMessage,
  ) {
    const { id, ...other } = message.value as any;

    await this.reportsService.update(id, other);
  }
}
