import { ConsoleLogger } from '@nestjs/common';

export class Logger extends ConsoleLogger {
  error(...arg: any[]) {
    super.error.apply(this, arg);
  }
  log(...arg: any[]) {
    super.log.apply(this, arg);
  }
  warn(...arg: any[]) {
    super.warn.apply(this, arg);
  }
  debug(...arg: any[]) {
    super.debug.apply(this, arg);
  }
}
