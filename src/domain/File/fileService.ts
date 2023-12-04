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
        const filename = uri.substring(uri.lastIndexOf('/') + 1, uri.length);
        const extend = filename.split('.')[1];
        const respUrl = await fileApi.getUrlUpload({ contentType, fileName, folder });
        const formData = new FormData();
        Object.entries(respUrl.fields).forEach(([field, value]) => {
            formData.append(field, value);
        });

        formData.append(
            'file',
            JSON.parse(
                JSON.stringify({
                    uri,
                    name: filename,
                    type: 'image/' + extend,
                }),
            ),
        ); // Append the fileBlob to the formData with the specified name

        await axios.post(respUrl.url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return `${respUrl.url}${respUrl.fields.key}`;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(JSON.stringify(error));
        }
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

export const fileService = { getUrlUpload };
