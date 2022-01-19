import colors from '../tokens/colors'

const baseStyle = {
  fontFamily: 'fontFamilies.ui',
  borderRadius: 'radii.1',
  color: (theme, { color }) => theme.colors[color] || color || 'colors.default',
  transition: 'color 200ms ease, background-color 200ms ease, margin 200ms ease',
  fontWeight: 600,
  marginTop: 3,
  marginBottom: 3,

  _focus: {
    // boxShadow: 'shadows.focusRing'
  },

  _disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }
}

const colorKeyForAppearanceOrIntent = (appearance, intent) => {
  if (appearance === 'destructive') {
    return 'red'
  }

  switch (intent) {
    case 'success':
      return 'green'
    case 'danger':
      return 'red'
    default:
      return 'blue'
  }
}

const colorKeyForIntent = intent => {
  if (intent === 'danger') {
    return `red500`
  } else if (intent === 'success') {
    return `green500`
  } else {
    return `gray800`
  }
}

const borderColorForIntent = (intent, isHover) => {
  if (intent === 'danger') {
    return `red${isHover ? 500 : 300}`
  } else if (intent === 'success') {
    return `green${isHover ? 400 : 300}`
  } else {
    return `gray${isHover ? 600 : 500}`
  }
}

const getPrimaryButtonAppearance = (appearance, intent, textColor, theme) => {
  const color = colorKeyForAppearanceOrIntent(appearance, intent)
  return {
    backgroundColor: `colors.${color}500`,
    borderColor: `colors.${color}500`,
    color: textColor || 'white',
    _hover: {
      backgroundColor: `colors.${color}600`,
      borderColor: `colors.${color}600`
    },
    _disabled: {
      backgroundColor: `colors.${color}100`,
      borderColor: `colors.${color}100`
    },
    _focus: {
      backgroundColor: `colors.${color}500`,
      boxShadow: `0 0 0 2px ${theme && theme.colors[`${color}100`]}`,
      borderColor: `colors.${color}500`
    },
    _active: {
      backgroundColor: `colors.${color}700`,
      borderColor: `colors.${color}700`
    }
  }
}

const getCustomColor = (appearance, intent, textColor, theme) => {
  if (appearance !== 'custom') return '#888888'
  // if (intent === 'gradient') return 'yellow'
  if (intent.toString().charAt(0) === '#') return intent
  const keys = Object.keys(colors)
  const vals = Object.values(colors)
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === intent) return vals[i]
  }
  return '#888888'
}

const shadeColor = (color, percent) => {
  var R = parseInt(color.substring(1, 3), 16)
  var G = parseInt(color.substring(3, 5), 16)
  var B = parseInt(color.substring(5, 7), 16)

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  var RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const appearances = {
  primary: (theme, { appearance, color, intent }) => getPrimaryButtonAppearance(appearance, intent, color, theme),
  default: {
    backgroundColor: 'white',
    border: (theme, props) => `1px solid ${theme.colors[borderColorForIntent(props.intent)]}`,
    color: (theme, props) => props.color || theme.colors[colorKeyForIntent(props.intent)],

    _disabled: {
      color: 'colors.gray500',
      borderColor: 'colors.gray300'
    },

    _hover: {
      border: (theme, props) => `1px solid ${theme.colors[borderColorForIntent(props.intent, true)]}`,
      backgroundColor: 'colors.gray50'
    },

    _active: {
      backgroundColor: 'colors.gray100'
    }
  },
  minimal: {
    backgroundColor: 'transparent',
    color: (theme, props) => props.color || theme.colors[colorKeyForIntent(props.intent)],

    _disabled: {
      color: 'colors.gray500',
      opacity: 0.6
    },

    _hover: {
      backgroundColor: 'colors.gray100'
    },

    _active: {
      backgroundColor: 'colors.gray200'
    }
  },
  destructive: getPrimaryButtonAppearance('destructive'),
  custom: {
    backgroundColor: (theme, props) => getCustomColor('custom', props.intent),
    color: (theme, props) => props.color || theme.colors[colorKeyForIntent(props.intent)],
    background: (theme, props) => (props.intent.substring(6, 15) === '-gradient' ? props.intent : ''),

    _disabled: {
      // color: 'colors.gray500',
      // borderColor: 'colors.gray300'
      backgroundColor: (theme, props) => getCustomColor('custom', props.intent),
      color: (theme, props) =>
        props.intent.substring(6, 15) === '-gradient'
          ? getCustomColor('custom', props.color || theme.colors[colorKeyForIntent(props.intent)])
          : '',
      opacity: 0.6
    },

    _hover: {
      backgroundColor: (theme, props) => shadeColor(getCustomColor('custom', props.intent), -20),
      color: (theme, props) =>
        props.intent.substring(6, 15) === '-gradient'
          ? shadeColor(getCustomColor('custom', props.color || theme.colors[colorKeyForIntent(props.intent)]), -10)
          : ''
    },

    _active: {
      backgroundColor: (theme, props) => shadeColor(getCustomColor('custom', props.intent), -40),
      color: (theme, props) =>
        props.intent.substring(6, 15) === '-gradient'
          ? shadeColor(getCustomColor('custom', props.color || theme.colors[colorKeyForIntent(props.intent)]), -20)
          : ''
    }
  }
}

const sizes = {
  small: {
    height: 24,
    minWidth: 24,
    fontSize: 'fontSizes.1',
    lineHeight: '24px',
    paddingLeft: 12,
    paddingRight: 12
  },
  medium: {
    height: 32,
    minWidth: 32,
    fontSize: 'fontSizes.1',
    lineHeight: '32px',
    paddingLeft: 16,
    paddingRight: 16
  },
  large: {
    height: 40,
    minWidth: 40,
    fontSize: 'fontSizes.2',
    lineHeight: '40px',
    paddingLeft: 20,
    paddingRight: 20
  },
  xl: {
    height: 48,
    minWidth: 48,
    fontSize: 'fontSizes.3',
    lineHeight: '48px',
    paddingLeft: 24,
    paddingRight: 24
  },
  xxl: {
    height: 56,
    minWidth: 56,
    fontSize: 'fontSizes.4',
    lineHeight: '56px',
    paddingLeft: 28,
    paddingRight: 28
  }
}

export default {
  baseStyle,
  appearances,
  sizes
}
