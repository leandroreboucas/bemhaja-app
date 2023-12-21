import {fileService} from '../File';

import {eventBehaviorCompletedApi} from './eventBehaviorCompletedApi';
import {EventBehaviorCompleted} from './types';

async function create(data: EventBehaviorCompleted): Promise<void> {
  if (data.midia_link && !data.midia_link.includes('amazonaws.com')) {
    const photoBucket = await fileService.getUrlUpload({
      contentType: 'image/jpeg',
      fileName: `${new Date().getTime()}.jpg`,
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
