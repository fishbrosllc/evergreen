const baseStyle = {
  marginTop: 0,
  marginBottom: 0
}

const appearances = {}

const paragraphSizes = {
  300: {
    fontSize: 'fontSizes.1',
    fontWeight: 'fontWeights.normal',
    lineHeight: 'lineHeights.1',
    letterSpacing: 'letterSpacings.normal'
  },
  400: {
    fontSize: 'fontSizes.2',
    fontWeight: 'fontWeights.normal',
    lineHeight: 'lineHeights.2',
    letterSpacing: 'letterSpacings.tight'
  },
  500: {
    fontSize: 'fontSizes.3',
    fontWeight: 'fontWeights.normal',
    lineHeight: 'lineHeights.3',
    letterSpacing: 'letterSpacings.tight'
  },
  600: {
    fontSize: 'fontSizes.4',
    fontWeight: 'fontWeights.normal',
    lineHeight: 'lineHeights.3',
    letterSpacing: 'letterSpacings.tighter'
  }
}

const sizes = {
  ...paragraphSizes,
  small: paragraphSizes['300'],
  medium: paragraphSizes['400'],
  large: paragraphSizes['500'],
  xl: paragraphSizes['600'],
  xxl: paragraphSizes['700']
}

export default {
  baseStyle,
  appearances,
  sizes
}
