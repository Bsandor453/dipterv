import { default as dayjs } from 'dayjs';
import config from './MainConfig';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const DEFAULT_NAMESPACE = config.defaults.namespace;

const info = (message: unknown, namespace?: string): void => {
  if (typeof message === 'string') {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO]`,
      message
    );
  }
};

const warn = (message: unknown, namespace?: string): void => {
  if (typeof message === 'string') {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN]`,
      message
    );
  }
};

const error = (message: unknown, namespace?: string): void => {
  if (typeof message === 'string') {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR]`,
      message
    );
  }
};

const dateFormat = 'YYYY.MM.DD. HH:mm:ss.SSS';
const getDate = () => {
  dayjs.extend(customParseFormat);
  return dayjs().format(dateFormat);
};

const logging = {
  info,
  warn,
  error,
};

export default logging;
