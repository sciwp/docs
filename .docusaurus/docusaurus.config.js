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
              "label": "Framework",
              "to": "docs/framework-prologue"
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
          "title": "Social",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/sciwp"
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