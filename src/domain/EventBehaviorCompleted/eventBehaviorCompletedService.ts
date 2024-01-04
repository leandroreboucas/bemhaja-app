import { mediaUtils } from '@utils';

import { fileService } from '../File';

import { eventBehaviorCompletedApi } from './eventBehaviorCompletedApi';
import { EventBehaviorCompleted } from './types';

async function create(data: EventBehaviorCompleted): Promise<void> {
  if (data.midia_link && !data.midia_link.includes('amazonaws.com')) {
    const lastIndexOf = data.midia_link.lastIndexOf('.');
    const extension = data.midia_link.substring(lastIndexOf);
    const contentType = await mediaUtils.getMimeType(extension);

    const photoBucket = await fileService.getUrlUpload({
      contentType,
      fileName: `${new Date().getTime()}.${extension}`,
      folder: 'app/event-behavior-completed',
      uri: data.midia_link!,
    });
    data.midia_link = photoBucket;
  }
  return await eventBehaviorCompletedApi.create(data);
}

export const eventBehaviorCompletedService = {
  create,
};
