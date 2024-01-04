import { mediaUtils } from '@utils';

import { fileService } from '../File';
import { PageAPI } from '../types';

import { eventApi } from './eventApi';
import { CreateEventModel, Evento } from './eventTypes';

async function getList(): Promise<PageAPI<Evento>> {
  return await eventApi.getList();
}

async function create(data: CreateEventModel): Promise<void> {
  if (data.event?.foto && !data.event?.foto.includes('amazonaws.com')) {
    const lastIndexOf = data.event.foto.lastIndexOf('.');
    const extension = data.event.foto.substring(lastIndexOf);
    const contentType = await mediaUtils.getMimeType(extension);
    const photoBucket = await fileService.getUrlUpload({
      contentType,
      fileName: `${new Date().getTime()}.${extension}`,
      folder: 'app/events',
      uri: data.event.foto!,
    });
    data.event.foto = photoBucket;
  }
  return await eventApi.create(data);
}

async function getListMyEvents(): Promise<Evento[]> {
  return await eventApi.getListMyEvents();
}

export const eventService = {
  getList,
  create,
  getListMyEvents,
};
