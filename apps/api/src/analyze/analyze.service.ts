import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class AnalyzeService {
  runAnalysis(url: string, query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const aiWorkerDir = path.resolve(process.cwd(), '../ai-worker');
      const workerPath = path.resolve(aiWorkerDir, 'main.py');

      const pythonPath = path.resolve(
        process.cwd(),
        '../ai-worker/venv/bin/python',
      );

      const python = spawn(pythonPath, [workerPath, url, query], {
        cwd: aiWorkerDir,
      });

      let output = '';
      let error = '';

      python.stdout.on('data', (data: Buffer) => {
        output += data.toString();
      });

      python.stderr.on('data', (data: Buffer) => {
        error += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(error || `Python process exited with code ${code}`));
          return;
        }

        resolve(output.trim());
      });
    });
  }
}
