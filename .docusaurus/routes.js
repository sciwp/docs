
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world'),
  exact: true,
  
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola'),
  exact: true,
  
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags'),
  exact: true,
  
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus'),
  exact: true,
  
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook'),
  exact: true,
  
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello'),
  exact: true,
  
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola'),
  exact: true,
  
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/2-x',
  component: ComponentCreator('/docs/2-x'),
  exact: true,
  
},
{
  path: '/docs/framework/addon-plugins',
  component: ComponentCreator('/docs/framework/addon-plugins'),
  exact: true,
  
},
{
  path: '/docs/framework/assets',
  component: ComponentCreator('/docs/framework/assets'),
  exact: true,
  
},
{
  path: '/docs/framework/autoloader',
  component: ComponentCreator('/docs/framework/autoloader'),
  exact: true,
  
},
{
  path: '/docs/framework/basics',
  component: ComponentCreator('/docs/framework/basics'),
  exact: true,
  
},
{
  path: '/docs/framework/configuration',
  component: ComponentCreator('/docs/framework/configuration'),
  exact: true,
  
},
{
  path: '/docs/framework/contribution',
  component: ComponentCreator('/docs/framework/contribution'),
  exact: true,
  
},
{
  path: '/docs/framework/dependencies',
  component: ComponentCreator('/docs/framework/dependencies'),
  exact: true,
  
},
{
  path: '/docs/framework/installation',
  component: ComponentCreator('/docs/framework/installation'),
  exact: true,
  
},
{
  path: '/docs/framework/model-queries',
  component: ComponentCreator('/docs/framework/model-queries'),
  exact: true,
  
},
{
  path: '/docs/framework/models',
  component: ComponentCreator('/docs/framework/models'),
  exact: true,
  
},
{
  path: '/docs/framework/plugin-activation',
  component: ComponentCreator('/docs/framework/plugin-activation'),
  exact: true,
  
},
{
  path: '/docs/framework/plugin-deactivation',
  component: ComponentCreator('/docs/framework/plugin-deactivation'),
  exact: true,
  
},
{
  path: '/docs/framework/plugin-services',
  component: ComponentCreator('/docs/framework/plugin-services'),
  exact: true,
  
},
{
  path: '/docs/framework/plugins',
  component: ComponentCreator('/docs/framework/plugins'),
  exact: true,
  
},
{
  path: '/docs/framework/prologue',
  component: ComponentCreator('/docs/framework/prologue'),
  exact: true,
  
},
{
  path: '/docs/framework/providers',
  component: ComponentCreator('/docs/framework/providers'),
  exact: true,
  
},
{
  path: '/docs/framework/rest',
  component: ComponentCreator('/docs/framework/rest'),
  exact: true,
  
},
{
  path: '/docs/framework/routes',
  component: ComponentCreator('/docs/framework/routes'),
  exact: true,
  
},
{
  path: '/docs/framework/style-manager',
  component: ComponentCreator('/docs/framework/style-manager'),
  exact: true,
  
},
{
  path: '/docs/framework/templates',
  component: ComponentCreator('/docs/framework/templates'),
  exact: true,
  
},
{
  path: '/docs/framework/views',
  component: ComponentCreator('/docs/framework/views'),
  exact: true,
  
},
{
  path: '/docs/mdx',
  component: ComponentCreator('/docs/mdx'),
  exact: true,
  
},
{
  path: '/docs/plugin/doc1',
  component: ComponentCreator('/docs/plugin/doc1'),
  exact: true,
  
},
{
  path: '/docs/plugin/doc2',
  component: ComponentCreator('/docs/plugin/doc2'),
  exact: true,
  
},
{
  path: '/docs/plugin/doc3',
  component: ComponentCreator('/docs/plugin/doc3'),
  exact: true,
  
},
{
  path: '/docs/plugin/mdx',
  component: ComponentCreator('/docs/plugin/mdx'),
  exact: true,
  
},
{
  path: '/docs/sciwp-collections',
  component: ComponentCreator('/docs/sciwp-collections'),
  exact: true,
  
},
{
  path: '/docs/sciwp-dependency-injection',
  component: ComponentCreator('/docs/sciwp-dependency-injection'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
