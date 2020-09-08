import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp