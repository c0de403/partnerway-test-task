import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './services/weather.service';
import { CreateCurrentWeatherDto } from './dtos/create-current-weather.dto';
import { CreateCurrentWeatherResponse } from './responses/create-current-weather.response';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  public constructor(private readonly weatherService: WeatherService) {}

  @Post('current')
  @ApiOperation({
    description:
      'The route requests the current weather from an external API and stores the data on the server',
  })
  @ApiBody({
    type: CreateCurrentWeatherDto,
  })
  @ApiOkResponse({
    type: CreateCurrentWeatherResponse,
    description:
      'Returns an field which indecates whether the weather has been created',
  })
  public async createCurrent(
    @Body() body: CreateCurrentWeatherDto,
  ): Promise<CreateCurrentWeatherResponse> {
    await this.weatherService.createCurrent(body);

    return new CreateCurrentWeatherResponse(true);
  }
}
