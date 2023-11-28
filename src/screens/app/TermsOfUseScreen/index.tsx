import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

import {Asset} from 'expo-asset';
import {RFValue} from 'react-native-responsive-fontsize';
import {WebView} from 'react-native-webview';

import {Screen, Header, Box} from '@components';

export function TermsOfUseScreen() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  // URL do PDF
  const pdfUrl = 'https://bemhaja-prod.s3.amazonaws.com/terms/tcu.pdf';

  // URL do Google Docs Viewer com o PDF
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl,
  )}`;

  async function getPdfUri() {
    try {
      const asset = Asset.fromModule(require('./../../../assets/pdf/tcu.pdf'));
      await asset.downloadAsync();
      if (asset.localUri) {
        setPdfUri(asset.localUri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPdfUri();
  }, []);

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Termos de uso" />

      <Box
        marginHorizontal="s16"
        paddingHorizontal="s4"
        flex={1}
        borderRadius="br10">
        {pdfUri && (
          <WebView
            originWhitelist={['*']}
            source={{
              uri:
                Platform.OS === 'ios'
                  ? pdfUri.replace('file://', '')
                  : googleDocsUrl,
            }}
            style={{flex: 1, borderRadius: RFValue(10)}}
            scalesPageToFit
            startInLoadingState
            allowFileAccess
            allowFileAccessFromFileURLs
            allowUniversalAccessFromFileURLs
            allowsLinkPreview
          />
        )}
      </Box>
    </Screen>
  );
}
