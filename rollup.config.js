import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const config = {
  input: pkg.source,
  output: [
    { file: pkg.module, format: 'esm' }
  ],
  plugins: [
    del({ targets: ['dist/*'] }),
    copy({
      targets: [
        { src: pkg.files, dest: 'dist' },
        {
          src: 'package.json',
          dest: 'dist',
          transform: (contents) => contents.toString()
            .replace(/dist\//g, '')
        }
      ]
    })
  ]
};

export default config;
