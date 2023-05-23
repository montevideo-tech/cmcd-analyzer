import { client } from '../config.js';
import jsLogger from 'js-logger';

export const saveData = async (id, validatorRes) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });

    try {
        jsLogger.info(`${id}: Saving data into the database...`);
        await client.index({
            index: `logs-${id}`,
            body: validatorRes
        });
        jsLogger.info(`${id}: Data has been saved successfully.`);
    } catch (error) {
        jsLogger.error(`${id}: `, error);
    }
}

export default saveData;
