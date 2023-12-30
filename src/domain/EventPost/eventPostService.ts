import { fileService } from '../File';

import { eventPostApi } from './eventPostApi';
import { EventPost } from './types';

async function create(data: EventPost): Promise<void> {
    if (data.foto && !data.foto.includes('amazonaws.com')) {
        const photoBucket = await fileService.getUrlUpload({
            contentType: 'image/jpeg',
            fileName: `${new Date().getTime()}.jpg`,
            folder: 'app/event-post',
            uri: data.foto!,
        });
        data.foto = photoBucket;
    }
    return await eventPostApi.create(data);
}

export const eventPostService = {
    create,
};
