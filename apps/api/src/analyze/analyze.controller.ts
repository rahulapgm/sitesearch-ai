import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeRequestDto } from './dto/analyze-request.dto';

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Post()
  async analyze(
    @Body() body: AnalyzeRequestDto,
  ): Promise<{ success: boolean; result: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { url, query } = body;

    const result = await this.analyzeService.runAnalysis(url, query);

    return {
      success: true,
      result,
    };
  }
}
