---
id: templates
title: Templates
sidebar_label: Templates
---

Template files are usually added in WordPress themes for the different post types available. A WordPress default template consist in a `.php` file located in the active theme folder. However with SCIWP you can also bundle templates with your plugins.

## About Templates

Templates in SCIWP are located within one of the plugins using the framework, but a theme file can be also specified so it's possible to customize the templates in WordPress themes.

It's possible to select template files when a new page or a new post is created in WordPress. WordPress does not add the template selector by default even if the `page-attributes` option is enabled for a post type, but don't worry, as the framework will always add the template selector when you define a new template for a post type.

## Creating Templates

Templates can be added to WordPress buy using the **Template** class. However it's also possible to define them in the plugin config file if the **Template Service** is enabled.

To create a template you can use the `create` method of the **Template** class. The `create` method accepts the following parameters:

* **templateFile <string\>**: The full path to the template file.
* **templateName <string\>**: The template name which will be displayed in WordPress backend (_optional_).
* **postTypes <array|string\>**: The array of post types in which will you would like to make this template available (_optional_).
* **themePath <string\>**: The full path to the theme template file (_optional_).

Let's see first how to create a new template. Here is an example:

```php
namespace MyPlugin;

use \MyPlugin\Sci\Template;

$template = Template::create('full/path/to/template_file.php', 'Template name', ['post', 'article'], 'relative/path/to/theme_template_file.php');
```

It's also possible to create a new template using the array notation: 

```php
namespace MyPlugin;

use \MyPlugin\Sci\Template;

$template = Template::create(
  [
    'path' => 'full/path/to/template_file.php',
    'name' => 'Template name',
    'theme_path' => 'relative/path/to/theme_template_file.php',
    'post_types' => ['post', 'article']
  ]
);
```

## Registering Templates

After creating a new template, it should be added to the **Template Manager** so WordPress is aware of it. You can just use the `register` method of the **Template** class. The `register` method accepts the following parameters:

* **templateId <string\>**: The identifier you want to assign to the template (_optional_).

In the next example we register the template we created in the previous section:

```php
$template->register('my-template');
```

## Template Manager

When registering a template, it will be registered into the **Template Manager**, which is the main container for templates, and it's shared among all plugins using the framework.

To get the **Template Manager** you just need to get the instance which is created when the framework boots:

```php
use MyPlugin\Sci\Manager\TemplateManager;

$templateManager = TemplateManager::instance();
```

### Register a Template

If you have already created a rest template, you can use the `register` method of the **Template** class, or also the `register` method of the **Template Manager**:

```php
use MyPlugin\Sci\Manager\TemplateManager;
use MyPlugin\Sci\Template;

$template = Template::create('full/path/to/template_file.php', 'Template name', ['post', 'article'], 'relative/path/to/theme_template_file.php');

$templateManager = TemplateManager::instance();
$templateManager->register($template, 'my-template');
```
And this has covered all relevant aspects related to the **Template Manager**.

## Template Service

Once the Template Service is configured, a new instance of the service will be attached to each plugin instance. You can get the **Template Service** by using the `service` method of the plugin class:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin')

# Get the Template Service
$templateService = $myPlugin->service('template');

```

### Configuration

While the Template class works with absolute paths when defining templates, the **Template Service** uses paths which are relative to your plugin root folder. If you want to specify templates in the `config.php file`, you need to enable the **Template Service**. This service is in charge of parsing the templates defined in the config file of each plugin, and it also provides other functionalities.

To use the **Template Service**, it must be enabled in the configuration file of each Plugin. To enable it, you need to add the **_TemplateService_** class to the services array in the `config.php` file.

```php
'services' => [
    'template' => \MyPlugin\Sci\Services\TemplateService::class,
    ...
 ],
 ```

_*Please note that you can perfectly define templates without using this service._

When enabling the **Template Service**, an instance of the service will be attached to each plugin using the framework.


### Creating Templates

You can use **Template** class to create new templates and register them in the **Template Manager**. However you can also add new templates using the **Template Service**.

The only difference is that when addinng templates using the **Template** class, the specified template route should be absolute, and when adding templates using the **Template Service**, routes to the template files should be relative to the plugin folder.

#### Creating a Single Template

To create a new template you can use the `template` method of the **Template Service**. The `template` method accepts the following parameters:

* **templateFile <string\>**: The path to the template file, relative to the plugin folder.
* **templateName <string\>**: The template name which will be displayed in WordPress backend (_optional_).
* **postTypes <array|string\>**: The array of post types in which will you would like to make this template available (_optional_).
* **themePath <string\>**: The path to the theme template file, relative to the active theme folder (_optional_).

Here is an example about how you can add a new template using the **Template Service**:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\PluginManager;

# Get the Plugin Manager instance
$pluginManager = PluginManager::instance();

# Get the Plugin from the Plugin Manager
$myPlugin = $pluginManager->get('myplugin')

# Creation of the template
$template = $myPlugin->service('template')->template(
    'relative/path/to/template_file.php',
    'Template name',
    ['post', 'article'],
    'relative/path/to/theme_template_file.php'
);

# Registration of the template
$template->register('my-template');
```

#### Creating Multiple Templates

You can create a set of templates using the `templates` method of the **Template Service**. This method can also automatically register all the templates defined. The array keys are the template ids, and the template data will be defined as the value of each array key.

The `templates` method accepts the following parameters:

* **templatesArr <array\>**: Array with template definitions.
* **register <boolean\>**: If the templates should also be registered (_optional_).

Here is an example about how you can create and register a set of templates using the **Template Service**:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\PluginManager;

# Get the Plugin Manager instance
$pluginManager = PluginManager::instance();

# Get the Plugin from the Plugin Manager
$myPlugin = $pluginManager->get('myplugin')

# Create and register the templates
$myPlugin->service('template')->templates([
    'mytemplate_1' => [
        'path' => 'relative/path/to/template_file_1.php',
        'name' => 'Template 2 name',
        'post_types' => ['post', 'article'],
        'theme_path' => 'relative/path/to/theme_template_2_file.php'
    ],
    'mytemplate_2' => [
        'path' => 'relative/path/to/template_file_2.php',
        'name' => 'Template 2 name',
        'post_types' => ['post', 'article'],
        'theme_path' => 'relative/path/to/theme_template_2_file.php'
    ],
], true);
```


### Registering Templates

Assuming you have already created a template and that it has not been registered yet, you can also add it directly to the **Template Manager**:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\TemplateManager;
use MyPlugin\Sci\Template;

$templateManager = TemplateManager::instance();
$templateManager->register($template, 'my-template');
```

### Configuring Templates

The templates defined in the the `config.php` file must be defined under the `templates` key. The SCIWP **Template Service** will be in charge of adding these templates when the plugins are loaded. Here is an example:

```php
'templates' => [
  'template_key_1' => [
    'path' => 'relative/path/to/template_file_1.php',
    'name' => 'Template 1 name',
    'theme_path' => 'relative/path/to/theme_template_file_1.php',
    'post_types' => ['post'],
  ],
  'template_key_2' => [
    'path' => 'relative/path/to/template_file_2.php',
    'name' => 'Template 2 name',
    'theme_path' => 'relative/path/to/theme_template_file_2.php',
    'post_types' => ['gallery', 'news'],
  ],
],
```
When defining a template, only the **id** and the template relative plugin route are required. If no name is provided, the template id will be used instead. If no post type is used, the **_Post_** type will be used by default:

```php
'templates' => [
  'template_id_1' => [
     'theme_path' => 'relative/theme/route/to/template_1.php',
  ],
],
```

Although this is not recommended, you can also specify a template using the string notation:

```php
'templates' => [
  'template_id_1' => 'relative/path/to/template_file_1.php',
],
```

Please note that templates defined in the `config.php` file will be automatically registered, so you don't need to register them.