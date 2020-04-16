---
id: plugin-deactivation
title: Plugin Deactivation
sidebar_label: Plugin Dectivation
---

SCI WP includes a **Deactivation Service** which allows to execute some custom actions when a plugin using the framework is disabled.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

This service uses the `register_deactivation_hook` wordpress function, but adds more flexibility. To do so you can use the AddAction method.

## Enabling the Service

To use the **Deactivation Service** you need to add the Deactivation Service class under the `'services'` section of the `config.php` file of each plugin.

```php
'services' => [
  'deactivation' => \MyPlugin\Sci\Services\DeactivationService::class,
],
```

## Deactivation Actions

The **Deactivation Service** allows to set a list of actions to execute after each plugin is correctly disabled. To do so you can use the `AddAction` method.

### Using a Closure

You should write the logic for the actions inside the functions. Here is an example of how to add an action to the **Deactivation Service** action list:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the deactivation checks
$myPlugin->service('deactivation')->addAction('action_name', function() {
  # Action code here
});
```

You can also send parameters to these functions, via a **third parameter** if the `addAction` function:


```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name', function($param1 = 'value1', $param2 = 'value2') {
  # Action code here
});

```


### Using a Function

You can link a reference to an existing function:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

function customActionFunction() {
  return 'Totally failed!';
}

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name','\MyPlugin\customActionFunction');
```

You can also use link parameters to these functions via a **third parameter** of the `addAction` function:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

function customActionFunction($param1, $param2) {
  # Action code
}

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name','\MyPlugin\customActionFunction', ['value1', 'value2']);
```

### Using a Method


The `addAction` method can also accept functions of an existing class instance. To do that, you just need to specify the method in the addAction method as an array with a class instance and the method to be called:


```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Crate a class instance
$instance = Sci::make('MyPlugin\App\Services\DeactivationService');

# Add the method the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name', [$instance, 'method'], [$param1, $param2]);
```

You can just set the class, and the framework will try to create a new instance of the class for you:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the method the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name', ['MyPlugin\App\Services\DeactivationService', 'method'], [$param1, $param2]);
```


You can also set a static class method in the same way, but don't forget to specify the full namespace of the class and the method.

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the class static method the deactivation actions
$myPlugin->service('deactivation')->addAction('action_name', '\MyPlugin\DeactivationChecker::method', [$param1, $param2]);
```

### Using a File
It's also possible to use a PHP file with code to be executed when the Plugin is deactivated successfully:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

$fullFilePath = $myPlugin->getDir() . '/path/to/script';

$myPlugin->service('deactivation')->addAction('action_name', $fullFilePath);
```

You can also set actions when the plugin is enabled. To add them check the [Plugin Activation](/docs/plugin-activation) section of this documentation.