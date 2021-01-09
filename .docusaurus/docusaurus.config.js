export default {
  "plugins": [
    [
      "@docusaurus/plugin-content-blog",
      {
        "path": "tutorials",
        "routeBasePath": "tutorials",
        "include": [
          "*.md",
          "*.mdx"
        ]
      }
    ],
    "@docusaurus/plugin-content-pages"
  ],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "algolia": {
      "apiKey": "f426a19f18676d02bac178e657381b86",
      "indexName": "sciwp",
      "contextualSearch": true,
      "searchParameters": {}
    },
    "navbar": {
      "title": "Home",
      "logo": {
        "alt": "Home",
        "src": "img/logo.svg"
      },
      "links": [
        {
          "to": "docs/prologue",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "tutorials",
          "label": "Tutorials",
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
          "title": "Documentation",
          "items": [
            {
              "label": "Framework",
              "to": "/docs/prologue"
            },
            {
              "label": "Tutorials",
              "to": "/tutorials"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Discord",
              "href": "https://discord.gg/dKjBhJ"
            }
          ]
        },
        {
          "title": "Code",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/sciwp"
            }
          ]
        }
      ],
      "copyright": "Built by Eduardo Lázaro Rodríguez (Kenodo Ltd) with Docusaurus"
    }
  },
  "title": "CREATE MVC PLUGINS FOR WORDPRESS",
  "tagline": "- The Framework of Choice of Mad Sciencists -",
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