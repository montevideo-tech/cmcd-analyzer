import { client } from '../config.js';
import jsLogger from 'js-logger';

export const saveData = async (id, validatorRes) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });

    try {
        await client.index({
            index: id,
            body: validatorRes
        });
        jsLogger.info('Data has been saved successfully')
    } catch (error) {
        jsLogger.error(error);
    }
}

export default saveData;
