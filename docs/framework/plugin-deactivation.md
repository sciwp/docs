---
id: plugin-deactivation
title: Plugin Deactivation
sidebar_label: Plugin Dectivation
---

SCIWP includes a **Deactivation Service** which allows to execute some custom actions when a plugin using the framework is disabled.

This service uses the `register_deactivation_hook` wordpress function, but adds more flexibility. To do so you can use the AddAction function.

To use the **Deactivation Service** you need to add the Deactivation Service class under the `'services'` section of the `config.php` file of each plugin.

```php
'services' => [
  'dejactivation' => \MyPlugin\Sci\Services\DeactivationService::class,
],
```

## Function and static methods

Here is an example of how to add a function to the **Dectivation Service** action list:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

function actionFunction() {
  # ...
}

# Add the function the activation checks
$myPlugin->service('deactivation')->addAction('action_name','\MyPlugin\actionFunction');
```

You can also send parameters to these functions using **third parameter** if the `addAction` function:

```php
namespace MyPlugin;

use MyPlugin\Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

function actionFunction($param1, $param2) {
  # ...
}

# Add the function the activation checks
$myPlugin->service('deactivation')->addAction('action_name','\MyPlugin\actionFunction', [$param1, $param2]);
```

You can also set static class methods in the same way, but don't forget to specify the full namespace of the class and the method.

```php
$myPlugin->service('deactivation')->addAction('action_name', '\Namespace\Class::method', [$param1, $param2]);
```

## Methods and class instances

The `addAction` function can also accept functions of an existing class instance. To do that, you just need to specify the function in the addCheck function as an array with the object and the method to be called:

```php
$myPlugin->service('deactivation')->addAction('action_name', [$instance, 'method'], [$param1, $param2]);
```
## Using a file

It's also possible to use a PHP script as an action. Yo use a PHP file, just send a file path instead of the function or method name:

```php
$fullFilePath = $myPlugin->getDir() . '/path/to/script';
$myPlugin->service('deactivation')->addAction('action_name', $fullFilePath);
```
You can also set actions when the plugin is enabled. To add them check the [Activation](/docs/framework-activation-service) section of this wiki.