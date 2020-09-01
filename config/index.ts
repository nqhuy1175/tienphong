import {ENVConfig} from './env.config';
import {dev} from './environment/development.env';
import {production} from './environment/production.env';
import {Config} from './environment/type';

let config: Config;
switch (ENVConfig) {
  case 'development':
    config = dev;
    break;
  case 'production':
    config = production;
    break;
}

export default {...config};
