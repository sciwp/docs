
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/tutorials',
  component: ComponentCreator('/tutorials'),
  exact: true,
  
},
{
  path: '/tutorials/hello-world',
  component: ComponentCreator('/tutorials/hello-world'),
  exact: true,
  
},
{
  path: '/tutorials/how-to-embed',
  component: ComponentCreator('/tutorials/how-to-embed'),
  exact: true,
  
},
{
  path: '/tutorials/tags',
  component: ComponentCreator('/tutorials/tags'),
  exact: true,
  
},
{
  path: '/tutorials/tags/docusaurus',
  component: ComponentCreator('/tutorials/tags/docusaurus'),
  exact: true,
  
},
{
  path: '/tutorials/tags/facebook',
  component: ComponentCreator('/tutorials/tags/facebook'),
  exact: true,
  
},
{
  path: '/tutorials/tags/hello',
  component: ComponentCreator('/tutorials/tags/hello'),
  exact: true,
  
},
{
  path: '/tutorials/tags/hola',
  component: ComponentCreator('/tutorials/tags/hola'),
  exact: true,
  
},
{
  path: '/tutorials/welcome',
  component: ComponentCreator('/tutorials/welcome'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/assets',
  component: ComponentCreator('/docs/assets'),
  exact: true,
  
},
{
  path: '/docs/autoloader',
  component: ComponentCreator('/docs/autoloader'),
  exact: true,
  
},
{
  path: '/docs/basics',
  component: ComponentCreator('/docs/basics'),
  exact: true,
  
},
{
  path: '/docs/collections',
  component: ComponentCreator('/docs/collections'),
  exact: true,
  
},
{
  path: '/docs/configuration',
  component: ComponentCreator('/docs/configuration'),
  exact: true,
  
},
{
  path: '/docs/contribution',
  component: ComponentCreator('/docs/contribution'),
  exact: true,
  
},
{
  path: '/docs/dependencies',
  component: ComponentCreator('/docs/dependencies'),
  exact: true,
  
},
{
  path: '/docs/helpers',
  component: ComponentCreator('/docs/helpers'),
  exact: true,
  
},
{
  path: '/docs/installation',
  component: ComponentCreator('/docs/installation'),
  exact: true,
  
},
{
  path: '/docs/models',
  component: ComponentCreator('/docs/models'),
  exact: true,
  
},
{
  path: '/docs/plugin-activation',
  component: ComponentCreator('/docs/plugin-activation'),
  exact: true,
  
},
{
  path: '/docs/plugin-deactivation',
  component: ComponentCreator('/docs/plugin-deactivation'),
  exact: true,
  
},
{
  path: '/docs/plugin-options',
  component: ComponentCreator('/docs/plugin-options'),
  exact: true,
  
},
{
  path: '/docs/plugin-services',
  component: ComponentCreator('/docs/plugin-services'),
  exact: true,
  
},
{
  path: '/docs/plugins',
  component: ComponentCreator('/docs/plugins'),
  exact: true,
  
},
{
  path: '/docs/prologue',
  component: ComponentCreator('/docs/prologue'),
  exact: true,
  
},
{
  path: '/docs/providers',
  component: ComponentCreator('/docs/providers'),
  exact: true,
  
},
{
  path: '/docs/queries',
  component: ComponentCreator('/docs/queries'),
  exact: true,
  
},
{
  path: '/docs/request',
  component: ComponentCreator('/docs/request'),
  exact: true,
  
},
{
  path: '/docs/rest',
  component: ComponentCreator('/docs/rest'),
  exact: true,
  
},
{
  path: '/docs/routes',
  component: ComponentCreator('/docs/routes'),
  exact: true,
  
},
{
  path: '/docs/style-manager',
  component: ComponentCreator('/docs/style-manager'),
  exact: true,
  
},
{
  path: '/docs/templates',
  component: ComponentCreator('/docs/templates'),
  exact: true,
  
},
{
  path: '/docs/views',
  component: ComponentCreator('/docs/views'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
