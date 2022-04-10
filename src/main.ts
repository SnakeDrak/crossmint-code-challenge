import fetch from 'node-fetch';
import SyncMapUseCase from './application/sync-map.usecase';
import AstralFactory from './domain/astrals/astral.factory';
import MapAdapter from './domain/map.adapter';
import ConsoleLogger from './infrastructure/adapters/console.logger';
import EnvConfig from './infrastructure/adapters/env.config';
import CLIController from './infrastructure/cli/cli.controller';
import AppKernel from './infrastructure/core/app.kernel';
import ConfigInterface from './infrastructure/core/config.interface';
import LoggerInterface from './infrastructure/core/logger.interface';
import HttpMapRepository from './infrastructure/repository/http-map.repository';
import MapRepositoryInterface from './infrastructure/repository/map-repository.interface';

async function bootstrap() {
  const config: ConfigInterface = new EnvConfig();
  const logger: LoggerInterface = new ConsoleLogger(console);
  const app = new AppKernel([new CLIController(logger)], logger);

  const mapRepository: MapRepositoryInterface = new HttpMapRepository(config, fetch, logger);
  app.addUseCase(new SyncMapUseCase(mapRepository, new MapAdapter(new AstralFactory()), config));

  await app.initialize();
  process.on('SIGTERM', async () => {
    await app.terminate();
  });
}
bootstrap();
