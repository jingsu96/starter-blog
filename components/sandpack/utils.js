const VIEWPORT_SIZE_PRESET_MAP = {
  'iPhone X': { x: 375, y: 812 },
  iPad: { x: 768, y: 1024 },
  'Pixel 2': { x: 411, y: 731 },
  'Moto G4': { x: 360, y: 640 },
  'Surface Duo': { x: 540, y: 720 },
};

export const computeViewportSize = (viewport, orientation) => {
  if (viewport === 'auto') {
    return {};
  }

  if (typeof viewport === 'string') {
    const { x, y } = VIEWPORT_SIZE_PRESET_MAP[viewport];
    return orientation === 'portrait' ? { width: x, height: y } : { width: y, height: x };
  }

  return viewport;
};

export const createFileMap = (codeSnippets, type) => {
  return codeSnippets.reduce((result, codeSnippet) => {
    // if (codeSnippet.props.mdxType !== 'pre') {
    //   return result;
    // }

    if (!codeSnippet.props.children?.props?.className?.includes('language')) {
      return result;
    }

    const { props } = codeSnippet.props.children;

    let filePath; // path in the folder structure
    let fileHidden = false; // if the file is available as a tab
    let fileActive = false; // if the file tab is shown by default

    if (props.file) {
      // const [name, ...params] = props.metastring.split(' ');
      filePath = '/' + props.file;
      if (props.hidden) {
        fileHidden = true;
      }
      if (props.active) {
        fileActive = true;
      }
    } else {
      if (props.className === 'language-js') {
        filePath = type === 'node' ? 'index.js' : '/App.js';
      } else if (props.className === 'language-css') {
        filePath = '/styles.css';
      } else {
        throw new Error(`Code block is missing a filename: ${props.children}`);
      }
    }
    if (result[filePath]) {
      throw new Error(`File ${filePath} was defined multiple times. Each file snippet should have a unique path name`);
    }

    result[filePath] = {
      code: props.children,
      hidden: fileHidden,
      active: fileActive,
    };

    return result;
  }, {});
};
