import tailwindConfig from '../../tailwind.config';

export const CustomTheme = {
  colors: {
    hover: 'inherit',
    clickable: 'inherit',
    activeBackground: 'inherit',
    surface1: 'inherit',
    inputBackground: 'inherit',
    accent: 'inherit',
    error: 'inherit',
    errorSurface: 'inherit',
  },
  syntax: {
    plain: 'var(--theme-plain)',
    comment: 'var(--theme-comment)',
    keyword: 'var(--theme-keyword)',
    tag: 'var(--theme-tag)',
    punctuation: 'var(--theme-punctuation)',
    definition: 'var(--theme-definition)',
    property: 'var(--theme-property)',
    static: 'var(--theme-static)',
    string: 'var(--theme-string)',
  },
  font: {
    // body: tailwindConfig.theme.extend.fontFamily.sans.join(', '),
    // mono: tailwindConfig.theme.extend.fontFamily.mono.join(', '),
    // size: tailwindConfig.theme.extend.fontSize.code,
    lineHeight: '24px',
  },
};
