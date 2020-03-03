---
id: framework-deactivation
title: Dectivation
sidebar_label: Dectivation
---

SCIWP includes a deactivation service which allows to execute some custom actions when a plugin using the framework is disabled.

This service uses the `register_deactivation_hook` wordpress function, but adds more flexibility. To do so you can use the AddAction function. 

## Using a function or a static method

Here is an example of how to add a function to the Dectivation service action list:

```php
namespace MyPlugin;
...
function actionFunction() {
  // Here the code of your action
}

// Add the function the activation checks
$pluginInstance->service('deactivation')->addAction('action_name','\MyPlugin\actionFunction');
```

You can also send parameters to these functions using **third parameter** if the `addAction` function:

```php
namespace MyPlugin;
...
function actionFunction($param1, $param2) {
  // Here the code of your action
}

// Add the function the activation checks
$pluginInstance->service('deactivation')->addAction('action_name','\MyPlugin\actionFunction', [$param1, $param2]);
```

You can also set static class methods in the same way, but don't forget to specify the full namespace of the class and the method.

```php
$plugin->service('deactivation')->addAction('action_name', '\Namespace\Class::method', [$param1, $param2]);
```

## Using a method of a class instance

The `addAction` function can also accept functions of an existing class instance. To do that, you just need to specify the function in the addCheck function as an array with the object and the method to be called:

```php
$plugin->service('deactivation')->addAction('action_name', [$instance, 'method'], [$param1, $param2]);
```
## Using a file

It's also possible to use a PHP script as an action. Yo use a PHP file, just send a file path instead of the function or method name:

```php
$fullFilePath = $plugin->getDir() . '/path/to/script';
$plugin->service('deactivation')->addAction('action_name', $fullFilePath);
```
You can also set actions when the plugin is enabled. To add them check the [Activation](https://github.com/wormvc/wormvc/wiki/Activation/_) section of this wiki.