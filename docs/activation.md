---
id: framework-activation
title: Activation
sidebar_label: Activation
---

SCIWP includes an activation service where you can check the PHP and the WordPress version and allow or disallow the plugin installation if it does not meet the requirements. You can also add checks for plugin dependencies and add custom activation rules and messages.

This service uses the `register_activation_hook` wordpress function, but adds more flexibility.

## Activation service configuration
Yoou can add the basic activation requirements using the config array inside the `plugin/config.php` file, under the **activation** section.

### How to set the required WordPress version

To set the required WordPress version, open the `plugins/config.php` file and locate the **activation['wordpress']** setting. Here you can set three options:

* **enabled (boolean):** Set to true or false to enable or disable the WordPress version check.
* **version (string):** Set here the required WordPress version required by yout plugin.
* **message (string):** Configure the message that will be displayed in case WordPress is not updated to the required version. You can use the **%1$s** and the the **%2$s** variables in the string, which will be replaced by the plugin name and the required WordPress version respectively.

Here is an example of the the php activation configuration:

```php
'wordpress' => [
  'enabled' => false,
  'version' => '4.6',
  'message' => __('The %1$s plugin requires the %2$s WordPress version or greater.', 'text-domain'),
],
```
Replace **text-domain** by the text domain you are using in your plugin, if any.

You can also use a shorthand configuration and just set the **activation['wordpress']** value to the required WordPress version.

```php
'wordpress' => '4.6',
```
Using this shorthand, the framework will set a default error mesage.

If the **activation['wordpress']** is not configured, the framework will not check for the WordPress version.

### How to set the required PHP version

To set the required PHP version, open the `plugins/config.php` file and locate the **activation['php']** setting. Here you can set three options:

* **enabled (boolean):** Set to true or false to enable or disable the PHP version check.
* **version (string):** Set here the required PHP version required by yout plugin.
* **message (string):** Configure the message that will be displayed in case PHP is not updated to the required version. You can use the %1$s and the the %2$s variables in the string, which will be replaced by the plugin name and the required PHP version respectively.

Here is an example of the the php activation configuration:

```php
'php' => [
  'enabled' => true,
  'version' => '7.1',
  'message' => __('The %1$s plugin requires PHP version %2$s or greater.', 'text-domain'),
],
```
Replace **text-domain** by the text domain you are using in your plugin, if any.

You can also use a shorthand configuration and just set the **activation['php']** value to the required PHP version.

```php
'php' => '7.1',
```
Using this shorthand, the framework will set a default error mesage.

If the **activation['php']** is not configured, the framework will not check for the PHP version when the plugin is enabled.

### How to set the required Plugins

You can configure a list of plugin which will be required on the plugin activation. To set these dependencies, open the file `plugins/config.php` and locate the **activation['plugins']** setting.

In this array you can set the list of plugins as a pair of keys and plugin array. Each key should be the WordPress internal plugin name. Here are the settings you can set for each plugin:

* **name (string):** The name of the plugin.
* **message (string):** The message that will be displayed in case the referenced plugin is not found or enabled. You can use the %1$s and the the %2$s variables in the string, which will be replaced by your plugin name and the required plugin name. If the message is not present, a default message will be displayed.

Here is an example of the the plugins activation configuration:

```php
'plugins' => [
  'xplugin' => [
    'name' => 'The X Plugin',
    'message' => '<p>'.__('The %1$s plugin requires the plugin %2$s.', 'text-domain'),
  ],
  'yplugin'
],
```
Replace **text-domain** by the text domain you are using in your plugin, if any.

As you can see, you can also use a shorthand configuration and just set a plugin id as a value, without the matching array. In this case, the name of the plugin will be this value, and the default message will be displayed if the plugin is not found.

If the **activation['plugins']** setting is not configured, the framework will not check any required plugin.

## Custom activation rules

The activation service allows to set custom activation rules using the addCheck function. To do so, you first need to add the plugin to SCIWP and then add the check. Here are some examples of how to add new checks:

### Using a function or a static method

Here is an example of how to add a funciton to the Activation service check list:

```php
namespace MyPlugin;
...
function customCheckFunction() {
  $message = __('This condition will walways fail,'text-domain');
  return ($message);
}

// Add the function the activation checks
$pluginInstance->service('activation')->addCheck('check_name','\MyPlugin\customCheckFunction');
```
You should write the logic for the checks inside the functions and return **true** if the check is correct, and an **error message** if it fails.

You can also send parameters to these functions, via a **third parameter** if the `addCheck` function:

```php
namespace MyPlugin;
...
function customCheckFunction($param1, $param2) {
  if ($param1) return true;
  if (param2) {
    return __('Message 1,'text-domain');
  }
  return __('Message 2,'text-domain');
}

// Add the function the activation checks
$pluginInstance->service('activation')->addCheck('check_name','\MyPlugin\customCheckFunction', [$param1, $param2]);
```

You can also set static class methods in the same way, but don't forget to specify the full namespace of the class and the method.

```php
$plugin->service('activation')->addCheck('check_name', '\Namespace\Class::method', [$param1, $param2]);
```

### Using a method of a class instance

The `addCheck` function can also accept functions of an existing class instance. To do that, you just need to specify the function in the addCheck function as an array with the object and the method to be called:

```php
$plugin->service('activation')->addCheck('check_name', [$instance, 'method'], [$param1, $param2]);
```
### Using a file
It's also possible to use a PHP file. The only condition is that the file should contain a PHP script returning true if the check is correct or string reprensenting the error if the check is false:

```php
$fullFilePath = $plugin->getDir() . '/path/to/script';
$plugin->service('activation')->addCheck('check_name', $fullFilePath);
```
The **Activation service** will get the result of the script to verify the condition.

## Custom activation actions

The **Activation service** allows to set a list of actions to execute after each plugin is correctly enabled. To do so you can use the AddAction function.

### Using a function or a static method

Here is an example of how to add a function to the Activation service action list:

```php
namespace MyPlugin;
...
function actionFunction() {
  // Here the code of your action
}

// Add the function the activation checks
$pluginInstance->service('activation')->addAction('action_name','\MyPlugin\actionFunction');
```

You can also send parameters to these functions using **third parameter** if the `addAction` function:

```php
namespace MyPlugin;
...
function actionFunction($param1, $param2) {
  // Here the code of your action
}

// Add the function the activation checks
$pluginInstance->service('activation')->addAction('action_name','\MyPlugin\actionFunction', [$param1, $param2]);
```

You can also set static class methods in the same way, but don't forget to specify the full namespace of the class and the method.

```php
$plugin->service('activation')->addAction('action_name', '\Namespace\Class::method', [$param1, $param2]);
```

### Using a method of a class instance

The `addAction` function can also accept functions of an existing class instance. To do that, you just need to specify the function in the addCheck function as an array with the object and the method to be called:

```php
$plugin->service('activation')->addAction('action_name', [$instance, 'method'], [$param1, $param2]);
```
### Using a file
It's also possible to use a PHP script as an action. Yo use a PHP file, just send a file path instead of the function or method name:

```php
$fullFilePath = $plugin->getDir() . '/path/to/script';
$plugin->service('activation')->addAction('action_name', $fullFilePath);
```
You can also set actions when the plugin is disabled. To add them check the [Deactivation](https://github.com/wormvc/wormvc/wiki/Deactivation/_) section of this wiki.