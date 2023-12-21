import {api} from '@api';

import {FileRequestUrlUpload, FileResponseUrlUpload} from './fileTypes';

async function getUrlUpload(fileRequest: FileRequestUrlUpload) {
  try {
    console.log(api.defaults.headers.common.Authorization);
    const respUrl = await api.post<FileResponseUrlUpload>(
      '/file/upload',
      fileRequest,
    );
    return respUrl.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      'Estamos com problemas tecnicos, tente novamente mais tarde.',
    );
  }
}

export const fileApi = {
  getUrlUpload,
};
