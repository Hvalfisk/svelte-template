import sveltePreprocess from 'svelte-preprocess';
import { windi } from 'svelte-windicss-preprocess'
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested'
import nestedProps from 'postcss-nested-props';
import nestedAncestors from 'postcss-nested-ancestors';
import size from 'postcss-size';
import simpleVars from 'postcss-simple-vars';

function generatePreprocessorOptions(production) {
  return {
    sourceMap: !production,
    typescript: {
      sourceMap: !production,
      inlineSources: !production
    },
    pug: true,
    postcss: {
      plugins: [
        simpleVars,
        nestedAncestors,
        nested,
        nestedProps,
        size,
        autoprefixer
      ]
    },
  };
}
export function generateConfig(production) {
  return {
    // options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
    compilerOptions: {
      // enable run-time checks when not in production
      dev: !production,
      immutable: true,
      sourcemap: !production,
    },

    // an array of file extensions that should be treated as Svelte components
    extensions: ['.svelte'],

    // options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
    preprocess: [
      sveltePreprocess(generatePreprocessorOptions(production)),
      windi({ mode: production ? 'production' : 'development' })
    ],
  };
}

const config = generateConfig(false);

export default config;
