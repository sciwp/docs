export default {
  "plugins": [],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "SCIWP",
      "logo": {
        "alt": "SCIWP Logo",
        "src": "img/logo.svg"
      },
      "links": [
        {
          "to": "docs/framework-install",
          "label": "Framework Documentation",
          "position": "left"
        },
        {
          "to": "docs/plugin/doc1",
          "label": "Plugin Documentation",
          "position": "left"
        },
        {
          "to": "blog",
          "label": "Blog",
          "position": "left"
        },
        {
          "href": "https://github.com/sciwp/",
          "label": "GitHub",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Style Guide",
              "to": "docs/doc1"
            },
            {
              "label": "Second Doc",
              "to": "docs/doc2"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Stack Overflow",
              "href": "https://stackoverflow.com/questions/tagged/docusaurus"
            },
            {
              "label": "Discord",
              "href": "https://discordapp.com/invite/docusaurus"
            }
          ]
        },
        {
          "title": "Social",
          "items": [
            {
              "label": "Blog",
              "to": "blog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/facebook/docusaurus"
            },
            {
              "label": "Twitter",
              "href": "https://twitter.com/docusaurus"
            }
          ]
        }
      ],
      "copyright": "Built by Eduardo Lázaro Rodríguez with Docusaurus"
    }
  },
  "title": "SciWP",
  "tagline": "A MVC framework to create plugins for WordPress",
  "url": "https://sciwp.com",
  "baseUrl": "/",
  "favicon": "img/favicon.ico",
  "organizationName": "sciwp",
  "projectName": "docusaurus",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "C:\\Code\\sciwp\\sidebars.js",
          "editUrl": "https://github.com/facebook/docusaurus/edit/master/website/"
        },
        "theme": {
          "customCss": "C:\\Code\\sciwp\\src\\css\\custom.css"
        }
      }
    ]
  ]
};