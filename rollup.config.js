import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const config = {
  input: pkg.source,
  plugins: [
    del({ targets: ['dist/*'] }),
    copy({
      targets: [
        { src: pkg.files, dest: 'dist' },
      ]
    })
  ]
};

export default config;
