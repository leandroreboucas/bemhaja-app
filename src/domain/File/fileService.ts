import { imageUtils } from '@utils';
import axios, { AxiosError } from 'axios';

import { fileApi } from './fileApi';

interface GetUrlUploadServiceRequest {
    folder: string;
    contentType: string;
    fileName: string;
    uri: string;
}

async function getUrlUpload({
    contentType,
    fileName,
    folder,
    uri,
}: GetUrlUploadServiceRequest) {
    try {
        const respUrl = await fileApi.getUrlUpload({ contentType, fileName, folder });
        const formData = new FormData();
        Object.entries(respUrl.fields).forEach(([field, value]) => {
            formData.append(field, value);
        });
        const blob = await imageUtils.base64toBlob(uri);
        formData.append('file', blob);
        console.log(respUrl.url);

        await axios.post(respUrl.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return `${respUrl.url}${respUrl.fields.key}`;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

export const fileService = { getUrlUpload };
