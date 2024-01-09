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

async function getListMyEventsParticipanting(
  page: number = 1,
  filter: string = '',
): Promise<PageAPI<Evento>> {
  return await eventApi.getListMyEventsParticipanting({
    page,
    per_page: 10,
    filter,
  });
}

async function getListMyEvents(
  page: number = 1,
  filter: string = '',
): Promise<PageAPI<Evento>> {
  return await eventApi.getListMyEvents({
    page,
    per_page: 10,
    filter,
  });
}

async function getListEventsNotCreatedForMe(
  page: number = 1,
  filter: string = '',
): Promise<PageAPI<Evento>> {
  return await eventApi.getListEventsNotCreatedForMe({
    page,
    per_page: 10,
    filter,
  });
}

export const eventService = {
  getList,
  create,
  getListMyEventsParticipanting,
  getListMyEvents,
  getListEventsNotCreatedForMe,
};
