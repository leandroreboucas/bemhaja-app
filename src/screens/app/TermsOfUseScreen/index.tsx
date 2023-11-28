import {useState} from 'react';

import {WebView} from 'react-native-webview';

import {Screen, Header, Loading} from '@components';

export function TermsOfUseScreen() {
  const [loading, setLoading] = useState(true);
  // URL do PDF
  const pdfUrl = 'https://bemhaja-prod.s3.amazonaws.com/terms/tcu.pdf';

  // URL do Google Docs Viewer com o PDF
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl,
  )}`;

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header canGoBack title="Termos" />
      {loading ? (
        <Loading />
      ) : (
        <WebView
          source={{uri: googleDocsUrl}}
          style={{flex: 1}}
          originWhitelist={['*']}
          scalesPageToFit
          startInLoadingState
          onLoad={() => {
            setLoading(false);
          }}
        />
      )}
    </Screen>
  );
}
