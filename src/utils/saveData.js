import { client } from '../config.js';
import jsLogger from 'js-logger';

export const saveData = async (id, validatorRes) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });

    try {
        jsLogger.info(`${id.replace('logs-')}: Saving data into the database...`);
        await client.index({
            index: id,
            body: validatorRes
        });
        jsLogger.info(`${id.replace('logs-')}: Data has been saved successfully.`);
    } catch (error) {
        jsLogger.error(`${id.replace('logs-')}: `, error);
    }
}

export default saveData;
