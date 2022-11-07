import { Body, Controller, Post } from '@nestjs/common';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';

@Controller('mail/')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async save(@Body() body: SaveMailDto) { // @Body() faz com o que a gente pegue o body da req
    return this.mailService.save(body);
  }
}
