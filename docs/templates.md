---
id: framework-template-manager
title: Templates
sidebar_label: Templates
---

Template files are usually added in WordPress themes for the different post types available. However, it´s possible to add the, using the SCIWP Template Manager. The template will consist in a `.php` file located within one of the plugins using the framework, but a theme file can be also specified so it´s possible to customize the templates.

It´s possible to select a template files when a new page or a new post is created in WordPress. Templates can be added to WordPress using both the SCIWP template manager or the template service attached to each plugin using SCIWP. It´s also possible to define them in the plugin config files.

## Define templates using the plugin config file

The templates defined in the the plugins config file must be defined under the `templates` key. Here is an example:

```php
'templates' => [
  'template_id_1' => [
    'path' => 'relative/plugin/route/to/template_1.php',
    'name' => 'Template 1 name',
    'theme_path' => 'relative/theme/route/to/template_1.php',
    'post_types' => ['post'],
  ],
  'template_id_2' => [
    'path' => 'relative/plugin/route/to/template_2.php',
    'name' => 'Template 2 name',
    'theme_path' => 'relative/theme/route/to/template_2.php',
    'post_types' => ['gallery', 'news'],
  ],
],
```
When defining a template, only the id and the template plugin file route are required. If no name is provided, the template id will be used instead:

```php
'templates' => [
  'template_id_1' => [
     'path' => 'relative/plugin/route/to/template_1.php',
     'name' => 'Template 1 name',
     'theme_path' => 'relative/theme/route/to/template_1.php',
     'post_types' => ['post'],
  ],
],
```
## Define templates using the Template class

This is another way to define templates. You can create a new instance of a a template and then add it manually to the **template manager**. Let´s see first how to create a new template.

### Create a new template instance

You just need to create a new instance of the template class:

```php
$template= new \MyPlugin\Sci\Template($plugin_id, $plugin_template_file, $template_name, $post_types, $theme_template_file);
```

Here is an example:

```php
use \MyPlugin\Sci\Template;

$template = new Template('plugin_id', 'templates/template_file.php', 'Great template', ['post', 'article'], 'my_plugin_files/templates/template_file.php');
```

It´s also possible to create a new template using an array notation, so just the plugin_id and the template definition in array format are required: 

```php
use \MyPlugin\Sci\Template;

$template = new Template(
  'plugin_id',
  [
    'path' => 'templates/template_file.php',
    'name' => 'Great template',
    'theme_path' => 'my_plugin_files/templates/template_file.php',
    'post_types' => ['post', 'article']
  ]
);
```

### Add the template to the Template Manager

After creating a new template, it should be added to the template manager so WordPress is aware of it. You can just use the `add` function of the Template class, which just requires the template id.

```php
$template->add('template_id');
```

Instead of adding the template to the Template Manager using the `add` function of the **Template** class, it's also possible to use the `add` function of the **template manager** instead:

```php
use MyPlugin\Sci;

$wormvc = Sci::instance();
$wormvc->templateManager()->add('template_id', $template);
```

### Create and add a template to the template manager using the add static method

Finally, it´s also possible to create a template and add it to the template manger using the `add` method of the **Template** class. here is an example:

```php
use \MyPlugin\Sci\Template;

Template::add('template_id', 'plugin_id', 'templates/template_file.php', 'Great template', ['post', 'article'], 'my_plugin_files/templates/template_file.php');
```

## Define templates using the Template Manager

Another option to define templates consists in using the `template` or the `templates` functions of the **template manager**. These templates allow to create templates and add them to the template manager using just one function.

### Define a single template with the the template method

This method allow to add a single template. The function accepts the same parameters as the constructor of the Template plus the template_id, so the template is added to the template manager after its creation. 

Here is an example:

```php
use MyPlugin\Sci;

$wormvc = Sci::instance();
$wormvc->TemplateManager()->template('template_id', 'my_plugin_id', 'templates/template_file.php', 'Great template', ['post', 'article'], 'my_plugin_files/templates/template_file.php');
```

It´s also possible to add a new template using an array notation:
```php
use MyPlugin\Sci;

$wormvc = Sci::instance();
$wormvc->TemplateManager()->template(
  'template_id',
  'plugin_id',
  [
    'path' => 'templates/template_file.php',
    'name' => 'Great template',
    'theme_path' => 'my_plugin_files/templates/template_file.php',
    'post_types' => ['post', 'article']
  ]
);
```

### Define multiple templates with the the templates method

It´s also possible to add many templates at the same time using the `templates` method, which accepts two parameters. One is the plugin id and the other one is an array of templates. Here is an example:

```php
use MyPlugin\Sci;

$wormvc = Sci::instance();
$wormvc->TemplateManager()->templates(
  'my_plugin_id',
  [
    'template_id1' => [
      'path' => 'templates/template_file1.php',
      'name' => 'Great template 1',
      'theme_path' => 'my_plugin_files/templates/template_file1.php',
      'post_types' => ['post', 'article']
    ],
    'template_id2' => [
      'path' => 'templates/template_file2.php',
      'name' => 'Great template 2',
      'theme_path' => 'my_plugin_files/templates/template_file2.php',
      'post_types' => ['post', 'article']
    ]
  ]
);
```