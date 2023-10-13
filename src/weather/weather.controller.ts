import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './services/weather.service';
import { CreateCurrentWeatherDto } from './dtos/create-current-weather.dto';
import { CreateCurrentWeatherResponse } from './responses/create-current-weather.response';
import { GetWeatherDto } from './dtos/get-weather.dto';
import { WeatherResponse } from './responses/weather/weather.response';
import { WeatherResponseInterceptor } from './interceptors/weather-response.interceptor';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  public constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({
    description: 'Route for getting the latest weather stored on the server',
  })
  @ApiOkResponse({
    type: WeatherResponse,
    description: 'Returns the latest weather stored on the server',
  })
  @UseInterceptors(WeatherResponseInterceptor)
  public async getLatest(
    @Query() query: GetWeatherDto,
  ): Promise<WeatherResponse> {
    const weather = await this.weatherService.getLatestByLocation(query);

    return new WeatherResponse(weather);
  }

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
