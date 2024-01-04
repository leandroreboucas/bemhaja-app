import { mediaUtils } from '@utils';

import { fileService } from '../File';

import { eventPostApi } from './eventPostApi';
import { EventPost } from './types';

async function create(data: EventPost): Promise<void> {
    if (data.foto && !data.foto.includes('amazonaws.com')) {
        const lastIndexOf = data.foto.lastIndexOf('.');
        const extension = data.foto.substring(lastIndexOf);
        const contentType = await mediaUtils.getMimeType(extension);
        const photoBucket = await fileService.getUrlUpload({
            contentType,
            fileName: `${new Date().getTime()}.${extension}`,
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
