import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('/api/requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createUserDto: CreateRequestDto) {
    return this.requestsService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.requestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
