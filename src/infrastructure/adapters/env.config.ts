import ConfigInterface from '../core/config.interface';

class EnvConfig implements ConfigInterface {
  get(prop: string): unknown {
    return process.env[prop];
  }

  set(prop: string, value: unknown): void {
    if (typeof value === 'string') process.env[prop] = value;
  }
}

export default EnvConfig;
