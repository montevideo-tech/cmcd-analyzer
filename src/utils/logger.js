import jsLogger from 'js-logger';
import saveData from './saveData.js';

const log = (id, value, level) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    jsLogger[level](`${id}: ${JSON.stringify(value)}`);
    saveData(`logs-${id}`, value);
};

export default log;