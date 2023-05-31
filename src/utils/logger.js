import jsLogger from 'js-logger';
import { client } from '../config.js';

const log = async (id, value, level) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    jsLogger[level](`${id}: ${JSON.stringify(value)}`);

    try {
        await client.index({
            index: `logs-${id}`,
            body: value
        });
    } catch (error) {
        jsLogger.error(`${id}: `, error);
    }

};

export default log;