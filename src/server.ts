import 'reflect-metadata';
import { AppConfig } from '@common/config/environment';
import { app, showBanner } from './app';

app.listen(AppConfig.app_port, () => {
  showBanner();
});