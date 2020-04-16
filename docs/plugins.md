---
id: plugins
title: Plugins
sidebar_label: Plugins
---

The **Plugin Manager**, is the component used by the framework to manage the plugins. All plugin instances created should be registered within the **Plugin Manager**. The full namespace of the **Provider Manager** is  **Sci\Plugin\Managers\PluginManager**.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.


The Plugin Manager will link the Plugin objects to other framework components, like the **autoloader**.

The **Sci\Plugin\Plugin** class stores all required plugin information and accepts a set of services which purpose is to extend WordPress default plugin functionalities.

## Creating Plugins

To create a new instance of the Plugin class, you just need to call the `create` static method. The `create` method accepts the following parameters:

* **pluginFile  <string\>**: The absolute path to the plugin main file, where the meta data of the plugin is defined (_required_).

Here is an example where we create a new instance in the main plugin file:

```php
namespace MyPlugin;

use Sci\Plugin\Plugin;

# Create a new plugin
Plugin::create(__FILE__);
```

Behind the curtains, the `create` method creates a new instance of the **Plugin** class using the `make` method of the container, which will inject all required dependences. So, the above code is equivalent to this uglier one:

```php
namespace MyPlugin;

use Sci\Sci;
use Sci\Plugin\Plugin;

# Masochist version of the above method
Sci::make(Plugin::class, [__FILE__]);
```
## Registering Plugins

It's nice to create a Plugin instance, but you need to add it to the **Plugin Manager** so you can autoload the classes defined inside it. For simplicity, the **Plugin** class already includes the hability to interact with the **Plugin Manager**, so to register a plugin you just need to call the `register` method. The `register` method accepts the following parameters:

* **pluginId <string\>**: An identifier which allows the Plugin Manager to retrieve any registered plugin. If no identifier is specified, the lowercased directory name of the plugin will be used instead. In this last case, spaces are replaced by hyphens.

Here is how you would create and register a plugin:

```php
namespace MyPlugin;

use Sci\Plugin\Plugin;

# Create a new plugin and register the instance
$myPlugin = Plugin::create(__FILE__)->register('myplugin');
```
The `create` static method returns a **Plugin** instance, so it's possible to use the `register` method with the output.

## Plugin Methods

The **Plugin** class includes some helpful methods to get plugin information. Here are some of them:

### getName

This method allows to get the plugin name. It will return the name configured in the public configuration file or, if not present, the name configured in the WordPress plugin meta data. The `getName` method accepts no parameters. Here is an example:

```php
# Returns the plugin name
$myPlugin->getName();
```

### getNamespace

This method returns the configured plugin namespace. The `getNamespace` method accepts no parameters. Here is an example:

```php
# Returns the plugin namespace
$myPlugin->getNamespace();
```

### getDir

This method allow to get the path to the root plugin directory path. The `getDir` method accepts no parameters. Here is an example:

```php
# Returns the plugin directory
$myPlugin->getDir();
```

### getMainDir

The `getMainDir` method allows to get the path to the main plugin directory, which is where you usually place your code. It's the ```/app``` directory of your plugin by default. Here is an example:

```php
# Returns the path to the main directory
$myPlugin->getMainDir();
```


### getModulesDir

The `getModulesDir` method allows to get the path to the modules directory of the plugin. It's the `/modules` directory of your plugin by default. Here is an example:

```php
# Returns the path to the modules directory
$myPlugin->getModulesDir();
```
### getFile

This method allow to get the path to the main plugin file. The `getFile` method accepts no parameters. Here is an example:

```php
# Returns the plugin file
$myPlugin->getFile();
```

### getMetaField

This method returns the specified gield from the plugin meta data block. The `getMetaField` method accepts the following parameters:

* **field <string\>**: The meta data field to get. If you look at the meta block in the main plugin file, the field matches the text which is before the column (_required_).

Here is an example:

```php
# Returns the plugin author
$myPlugin->getMetaField('Author');
```

## Plugin Services

All plugin instances include a set of services, which are instances of other classes which provide more features. For example, the **Activation Service** is used to add plugin requirements and activation hooks.

You **should not** confuse the **Plugin Services** with all the **Services** you can have in your application. You **should not add any kind of business logic** in a Plugin Service in the same way you would add it in the standard services.

To use a service with a Plugin, you must include a reference to it in the **services** section of the `config.php` file. Here is an example of this section:

```php
'services' => [
  'template' => Sci\Template\Services\TemplateService::class,
  'activation' => Sci\Plugin\Services\ActivationService::class,
  'deactivation' => Sci\Plugin\Services\DeactivationService::class,
  'script' => Sci\Asset\Services\ScriptService::class,
  'style' => Sci\Asset\Services\StyleService::class,
  'custom' => MyPlugin\App\Services\CustomService::class,
],
```

The framework includes the next default services.

* **Activation Service**: Used to add requirements and checks to the plugin activation hooks.
* **Deactivation Service**: Used to add functions which will be executed when the plugin is disabled.
* **Template Service**: Used to add templates and parse templates defined in the `config.php` file.
* **Script Service**: Parses scripts defined in the `config.php` file.
* **Style Service**: Parses styles defined in the `config.php` file.
* **Options Service**: Service to easily handle plugin options..

You can create all services you want. You can read below how to create them.

### Getting Services

You can get the services collection of a plugin by using the `services` method of the **Plugin** class:

```php
# Get the services collection
$services = $myPlugin->services();
```
To get an array with all services of a plugin:

```php
# Get all the services
$services = $myPlugin->services()->all();
```

To get a single service you can use the `service` method of the **Plugin** class:

```php
# Get a single service
$services = $myPlugin->service('activation');
```

You can also use the `get` method of the collection class:

```php
# Get a single service
$services = $myPlugin->services()->get('activation');
```

### Creating Services

Plugin Services are standard PHP classes which are linked to the different plugins in the `config.php` file. When the plugins are loaded, they will search for the `configure` method of each service and execute it if it exists.

Plugin Services are usually used to add new functionalities to your Plugin in the context of its interaction with WordPress, and it should be possible to use them with any other Plugin you build or with the Plugins built by other users. They should always be local to a plugin instance. For this reason, the best place to create a **Plugin Service** is a framework **Extension**.

## Plugin Manager

The Plugin Manager is a core component of the framework which is used to store the registed plugins. It contains the methods which allow to register plugin instances and get them.

### Register a Plugin

You will usually not use this method. However, if you have created a Plugin instance, you can register it at any time. In fact, the ``register` method of the Plugin class is just a shortcut to this method. The `register` method accepts the following parameters:

* **plugin <Sci\Plugin\>**: The Plugin instance.

* **pluginId <string\>**: An identificator which allows the Plugin Manager to retrieve any registered plugin. If no identificator is specified, the lowercased directory name of the plugin will be used instead. In this last case, spaces are replaced by hyphens (_optional_).

Here is how you would register an existing plugin:
```php
namespace MyPlugin;

use Sci\Plugin\Plugin;
use Sci\Plugin\Managers\PluginManager;

# Create a new plugin
$myPlugin = Plugin::create(__FILE__);

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Register the plugin into the Plugin Manager
$pluginManager->register($myPlugin, 'myplugin');

```

### Getting a Plugin

This method is useful when you want to get a plugin instance from your code, from another plugin or from a theme. The `get` method accepts the following parameters:


* **pluginId <string\>**: The identificator used when registering the plugin. This parameter is optional.

Here is an example of how you can get a registered plugin:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Get the Plugin from the Plugin Manager
$myPlugin = $pluginManager->get('myplugin');

```

If no *_pluginId** is provided, an array of plugins will be retrieved.

### Getting All Plugins
To get all plugins you can use the `all` method. This method has no parameters. Here is an example:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Get an array with all the plugins
$pluginsArr = $pluginManager->all();

# A single plugin
$myPlugin = $pluginsArr['myplugin'];

```