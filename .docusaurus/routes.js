
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
  path: '/docs/framework-autoloader',
  component: ComponentCreator('/docs/framework-autoloader'),
  exact: true,
  
},
{
  path: '/docs/framework-basics',
  component: ComponentCreator('/docs/framework-basics'),
  exact: true,
  
},
{
  path: '/docs/framework-configuration',
  component: ComponentCreator('/docs/framework-configuration'),
  exact: true,
  
},
{
  path: '/docs/framework-contribution',
  component: ComponentCreator('/docs/framework-contribution'),
  exact: true,
  
},
{
  path: '/docs/framework-dependencies',
  component: ComponentCreator('/docs/framework-dependencies'),
  exact: true,
  
},
{
  path: '/docs/framework-install',
  component: ComponentCreator('/docs/framework-install'),
  exact: true,
  
},
{
  path: '/docs/framework-plugin-manager',
  component: ComponentCreator('/docs/framework-plugin-manager'),
  exact: true,
  
},
{
  path: '/docs/framework-prologue',
  component: ComponentCreator('/docs/framework-prologue'),
  exact: true,
  
},
{
  path: '/docs/framework-provider-manager',
  component: ComponentCreator('/docs/framework-provider-manager'),
  exact: true,
  
},
{
  path: '/docs/framework-rest-manager',
  component: ComponentCreator('/docs/framework-rest-manager'),
  exact: true,
  
},
{
  path: '/docs/framework-route-manager',
  component: ComponentCreator('/docs/framework-route-manager'),
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
