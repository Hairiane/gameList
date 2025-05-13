/* eslint-disable react-hooks/rules-of-hooks */
import { extendTheme, ThemeConfig, useColorModeValue } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#6c6c6c',
      700: '#202020',
      800: '#121212',
      900: '#111111',
    },
  },
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          bg: useColorModeValue('white', 'gray.800'),
          border: '1px solid',
          borderColor: useColorModeValue('gray.200', 'gray.700')
        }
      })
    },
    Button: {
      variants: {
        themeAware: () => ({
          bg: useColorModeValue('blue.600', 'blue.200'),
          color: useColorModeValue('white', 'gray.900'),
          _hover: {
            bg: useColorModeValue('blue.700', 'blue.300')
          }
        })
      }
    }
  }
});

export default theme;