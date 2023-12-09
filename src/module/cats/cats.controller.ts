import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { IDValidationPipe } from 'src/pipe/id-validation.pipe';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@ApiTags('cats')
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IDValidationPipe) id: string) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IDValidationPipe) id: string,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', IDValidationPipe) id: string) {
    return this.catsService.remove(id);
  }
}
