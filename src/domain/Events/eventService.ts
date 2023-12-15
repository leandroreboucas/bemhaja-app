import { fileService } from '../File';
import { EventoDTO, PageAPI } from '../types';

import { eventApi } from './eventApi';
import { CreateEventModel } from './eventTypes';

async function getList(): Promise<PageAPI<EventoDTO>> {
  return await eventApi.getList();
}

async function create(data: CreateEventModel): Promise<void> {
  if (data.event?.foto && !data.event?.foto.includes('amazonaws.com')) {
    const photoBucket = await fileService.getUrlUpload({
      contentType: 'image/jpeg',
      fileName: `${new Date().getTime()}.jpg`,
      folder: 'app/profile',
      uri: data.event.foto!,
    });
    data.event.foto = photoBucket;
  }
  return await eventApi.create(data);
}

export const eventService = {
  getList,
  create,
};
