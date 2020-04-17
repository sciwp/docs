module.exports = {
  title: 'CREATE MVC PLUGINS FOR WORDPRESS',
  tagline: '- The Framework of Choice of Mad Sciencists -',
  url: 'https://sciwp.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'sciwp', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'Home',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/prologue', label: 'Documentation', position: 'left'},
        {to: 'tutorials', label: 'Tutorials', position: 'left'},
        {
          href: 'https://github.com/sciwp/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      /*
      footer: {
        logo: {
          alt: 'Facebook Open Source Logo',
          src: 'https://docusaurus.io/img/oss_logo.png',
          href: 'https://opensource.facebook.com/',
        },
        */
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            /*{
              label: 'Style Guide',
              to: 'docs/doc1',
            },*/
            {
              label: 'Framework',
              to: 'docs/framework/prologue',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            /*{
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },*/
            {
              label: 'Discord',
              href: 'https://discord.gg/dKjBhJ',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            /*{
              label: 'Blog',
              to: 'blog',
            },*/
            {
              label: 'GitHub',
              href: 'https://github.com/sciwp',
            },
            /*{
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },*/
          ],
        },
      ],
      copyright: `Built by Eduardo Lázaro Rodríguez with Docusaurus`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        path: 'tutorials',
        routeBasePath: 'tutorials',
        include: ['*.md', '*.mdx'],
      },
    ],
    '@docusaurus/plugin-content-pages',
  ],
};
