import dedent from 'ts-dedent';
import cors from '@koa/cors';
import Router from 'koa-router';
import { AppInfo, AppConfig } from '@common/config';
import { logger } from '@common/utils';
import { createKoaServer, useContainer } from 'routing-controllers';
import bodyParser from 'koa-bodyparser';
import { InversifyInitializer } from '@common/config/inversify-initializer';

const router = new Router();

const app = createKoaServer({
  routePrefix: AppConfig.base_path,
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  middlewares: [`${__dirname}/middlewares/**/*{.js,.ts}`],
  defaultErrorHandler: false,
  cors: true
});

app.use(
  cors({
    origin: '*',
    credentials: false,
    allowMethods: '*',
    allowHeaders: '*'
  })
);
app.use(router.routes());

const container = new InversifyInitializer().container;
useContainer(container);

app.use(bodyParser());

const showBanner = (): void => {
  const banner = dedent`Application started successfully!
          Name: ${AppInfo.app_name}
          Description: ${AppInfo.app_description}
          Version: ${AppInfo.app_version}
          Port: ${AppConfig.app_port}
          Base Path: ${AppConfig.base_path}
          Environment: ${AppConfig.environment}
       `;
  logger.info(banner);
};

export { app, showBanner };
