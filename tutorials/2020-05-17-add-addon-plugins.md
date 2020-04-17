---
id: how-to-add-addon-plugins
title: How to create Addons for bundled SCIWP plugins
author: Eduardo Lazaro
author_title: Full Stack Developer
author_url: https://github.com/neeonez
author_image_url: https://avatars2.githubusercontent.com/u/7797530
tags: [bundle, sciwp]
---

In the Plugins section of the documentation you learned how to register you plugin with SCI MVC. However once the framework is configured it can be used with any other plugin you create with almost zero configuration.

Athough these plugins are used in exactly the same way as the main plugin where the framework resides, we call them **Addons** because they require the main plugin to be installed and enabled.

## Creating Addons

If you want to create another plugin as an addon for the plugin you have just created, you just need to use one line of code. In the next example we are registering the **MyAddonPlugin** addon plugin in main file of the addon, where **MyPlugin** is the namespace of the main plugin:

```php
# Define the namespace
namespace MyAddonPlugin;

# Creating a new Plugin
$myAddonPlugin = \MyPlugin\Sci\Plugin::create(__FILE__);
```

You can use SCI MVC with all plugins you want. Just remember to register the new plugins so they require your main plugin. It's also important to note that two plugin cannot use the same base namespace.


## Registering Addons

When you create a Plugin, you also need to register it into the **Plugin Manager**:


```php
# Registering the addon
$myAddonPlugin->register();
```
However, you can create the addon and register it in one line:

```php
# Define the namespace
namespace MyAddonPlugin;

# Register a new Plugin into the Plugin Manager
\MyPlugin\Sci\Plugin::create(__FILE__)->register();
```


## Configuring Addons

Once the addon plugin is created, you can a `config.php` file in the root folder of the addon to configure it. You can configure directories, services, styles, scripts, templates and more. Of course some options related to the framework itself like the **rebuild** option will not apply here.

Please check the [configuration section](/docs/framework/configuration) for more details.

## Using Addons

You can use all framework tools in the same way as before. You can access all the framework components and other plugin instances through the **Sci** class instance:

```php
namespace MyAddonPlugin;

use \MyPlugin\Sci\Sci;

$sci = Sci::instance();

$myPlugin = $sci->plugin('myplugin');

```

Just remember that the framework will be in a different namespace. You can now access, for example, to any of the selected plugin services:


```php
$myPlugin->service('any-service');

```

You can also access all framework tools. Here are some examples. Don't worry if you don't understand them, as they are all explained in other sections of this documentation.

Here is an example fo how you can register a Route in an addon:

```php
namespace MyAddonPlugin;

use MyPlugin\Sci\Route;

Route::get('/house/{zipcode|[a-z0-9]{6}}', 'MyAddonPlugin\App\Controllers\House@show')->register();
```

Here is an example fo how you can use a model of the main plugin in an addon, assuming the model is already created:

```php
namespace MyAddonPlugin;

use MyPlugin\App\Models\Orc;

$orcs = Orc::find(['strength', '<', 20 ], ['armor', '>=', 30]);
```

