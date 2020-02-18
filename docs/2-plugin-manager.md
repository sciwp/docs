---
id: sciwp-plugin-manager
title: Plugin Manager
sidebar_label: Plugin Manager
---

The Plugin Manager **_Sci\Manager\PluginManager_**, is the component used by the framework to manage the plugins. All plugin instances created should be registered within the PluginManager.

**Why**: The Plugin Manager will link the Plugin objects to other framework components, like the **autoloader**.

The **_Sci\Plugin_** class stores required plugin information and accepts a set of services whose purpose is to extend WordPress default plugin functionalities.

## Creating Plugins

To create a new instance of the Plugin class, you just need to call the **_create_** static method. The create method accepts the following parameters:

* **pluginFile (string)**: The absolute path to the plugin main file, where the meta data of the plugin is defined. This field is required.

Here is an example where we create a new instance in the main plugin file:

```php
namespace MyPlugin;

# Create a new plugin
Sci\Plugin::create(__FILE__);
```

**Explanation**: Begind the curtains, the **_create_** method creates a new instance of the Plugin class using the Sci class **_make_** method, which will inject required dependences. So, the above code is equivalent to this uglier one:
```php
namespace MyPlugin;

# Masochist version of the above method
Sci::make(Sci\Plugin::class, [__FILE__]);
```
## Registering Plugins

It's nice to create a Plugin instance, but you need to add it to the **Plugin Manager** so you can autoload the classes defined inside it. For simplicity, the **\Sci\Plugin** class already includes the hability to interact with the Plugin Manager, so to register a plugin you just need to call the **_register_** method. The **_register_** method accepts the following parameters:

* **pluginId (string)**: An identificator which allows the Plugin Manager to retrieve any registered plugin. If no identificator is specified, the lowercased directory name of the plugin will be used instead. In this last case, spaces are replaced by hyphens.

Here is how you would create and register a plugin:

```php
namespace MyPlugin;

# Create a new plugin and register the instance
$myPlugin = Sci\Plugin::create(__FILE__)->register('myplugin');
```
**Explanation**: The **_create_** static method returns a **_Plugin_** instance, so it's possible to use the **_register_** method with the output.

## Plugin Methods

The Plasss includes some helpful methods to get plugin information. Here are some of them:

### getName Method

This method allow to get the plugin name. It will return the name configured in the public configuration file or, if not present, the name configured in the WordPress plugin metda. The **_getName_** method accepts no parameters. Here is an example:

```php
# Returns the plugin name
$myPlugin->getName();
```

### getNamespace Method

This method returns the configured plugin namespace. The **_getNamespace_** method accepts no parameters. Here is an example:

```php
# Returns the plugin namespace
$myPlugin->getNamespace();
```

### getDir Method

This method allow to get the path to the root plugin directory path. The **_getDir_** method accepts no parameters. Here is an example:

```php
# Returns the plugin directory
$myPlugin->getDir();
```

### getMainDir Method

The **_getMainDir_** method allows to get the path to the main plugin directory, which is where you usually place your code. It's the ```myplugin/app``` directory by default. Here is an example:

```php
# Returns the path to the main directory
$myPlugin->getMainDir();
```


### getModulesDir Method

The **_getModulesDir_** method allows to get the path to the modules directory of the plugin. It's the ```myplugin/modules``` directory by default. Here is an example:

```php
# Returns the path to the modules directory
$myPlugin->getModulesDir();
```
### getFile Method

This method allow to get the path to the main plugin file. The **_getFile_** method accepts no parameters. Here is an example:

```php
# Returns the plugin file
$myPlugin->getFile();
```

### getMetaField Method

This method returns the specified gield from the plugin meta data block. The **_getMetaField_** method accepts the following parameters:

* **field (string)**: The meta data field to get. If you look at the meta block in the main plugin file, the field matches the text which is before the column. here is an example:

```php
# Returns the plugin author
$myPlugin->getMetaField('Author');
```

## Plugin Manager

The Plugin Manager is a core component of the framework which is used to store the registed plugins. It contains the methods which allow to register plugin instances and get them.

### Registering a Plugin

You will usually not use this method. However, if you have created a Plugin instance, you can register it at any time. In fact, the **_register_** method of the Plugin class is just a shortcut to this method. The **_register_** method accepts the following parameters:

* **plugin (MyPlugin\Sci\Plugin)**: The Plugin instance.

* **pluginId (string)**: An identificator which allows the Plugin Manager to retrieve any registered plugin. If no identificator is specified, the lowercased directory name of the plugin will be used instead. In this last case, spaces are replaced by hyphens.

Here is how you would register an existing plugin:
```php
namespace MyPlugin;

use \MyPlugin\Sci\Plugin;
use \MyPlugin\Sci\Manager\PluginManager;

# Create a new plugin
$myPlugin = Plugin::create(__FILE__);

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Register the plugin into the Plugin Manager
$pluginManager->register($myPlugin, 'myplugin');

```

### Getting a Single Plugin

This method is useful when you want to get a plugin instance from your code, from another plugin or from a theme. The **_get_** method accepts the following parameters:


* **pluginId (string)**: The identificator used when registering the plugin. This parameter is optional. If the parameter is present, an array will all the plugins will be returned.

Here is an example of how you can get a registered plugin:

```php
namespace MyPlugin;

use \MyPlugin\Sci\Manager\PluginManager;

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Register the plugin into the Plugin Manager
$myPlugin = $pluginManager->get('myplugin');

```

If no **_pluginId_** is provided, an array of plugins will be retrieved.

### Getting All Plugins
To get all plugins you can use the **_get_** method without parameters or you can use the **_all_** method. This method has no parameters. Here is an example:

```php
namespace MyPlugin;

use \MyPlugin\Sci\Manager\PluginManager;

# Get the PluginManager instance
$pluginManager = PluginManager::instance();

# Get an array with all the plugins
$pluginsArr = $pluginManager->all();

# Or you can also use the get method
$pluginsArr = $pluginManager->get();

# A single plugin
$myPlugin = $pluginsArr['myplugin'];

```