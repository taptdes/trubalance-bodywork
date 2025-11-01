declare module '@tailwindcss/vite' {
  import type { Plugin } from 'vite';
  const tailwindPlugin: Plugin;
  export default tailwindPlugin;
}

declare module 'vite-plugin-node-polyfills' {
  import type { Plugin } from 'vite';
  const polyfills: Plugin;
  export default polyfills;
}