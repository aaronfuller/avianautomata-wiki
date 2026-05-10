import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: 'avian automata Wiki',
  tagline: 'Documentation for avian automata products',
  favicon: 'img/favicon.png',

  url: 'https://docs.avianautomata.com',
  baseUrl: '/',

  organizationName: 'avianautomata',
  projectName: 'avianautomata-wiki',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '305ap',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/avianautomata/avianautomata-wiki/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '305ap',
        indexBlog: false,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 85,
        max: 1920,
        min: 640,
        steps: 3,
        disableInDev: false,
      },
    ],
    // Future products — uncomment and duplicate to add a new product:
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'product2',
    //     path: 'docs-product2',
    //     routeBasePath: 'product2',
    //     sidebarPath: './sidebars-product2.ts',
    //   },
    // ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'avian automata',
      logo: {
        alt: 'avian automata Logo',
        src: 'img/logo.png',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            { label: '305ap Flight Controller', to: '/305ap/intro' },
          ],
        },
        {
          href: 'https://github.com/avianautomata',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            { label: '305ap Flight Controller', to: '/305ap/intro' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'PX4 Documentation', href: 'https://docs.px4.io' },
            { label: 'QGroundControl', href: 'https://qgroundcontrol.com' },
            { label: 'PX4 Discuss', href: 'https://discuss.px4.io' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/avianautomata' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} avian automata. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'ini', 'cmake'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
