---
id: plugin-activation
title: Plugin Activation
sidebar_label: Plugin Activation
---

SCI WP includes an **Activation Service** where you can check the PHP and the WordPress version and allow or disallow the plugin installation if it does not meet the requirements. You can also add checks for plugin dependencies and add custom activation rules and messages.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

This service uses the `register_activation_hook` wordpress function, but adds more flexibility.

## Enabling the Service

To use the **Activation Service** you need to add the Activation Service class under the `'services'` section of the `config.php` file of each plugin. If this file is not created, create it and open it with any plain text editor.

```php
'services' => [
  'activation' => \MyPlugin\Sci\Services\ActivationService::class,
],
```

## Configuration

You can add the basic activation requirements using the config array inside the `config.php` file, under the **activation** section.

### WordPress version

To set the required WordPress version, open the `config.php` file and locate or create the `activation['wordpress']` setting. Here you can set three options:

* **enabled <boolean\>:** Set to true or false to enable or disable the WordPress version check.
* **version <string)\>:** Set here the required WordPress version required by your plugin.
* **message <string)\>:** Configure the message that will be displayed in case WordPress is not updated to the required version. You can use the `%1$s` and the the `%2$s` variables in the string, which will be replaced by the plugin name and the required WordPress version respectively.

Here is an example of the the php activation configuration:

```php
'wordpress' => [
  'enabled' => false,
  'version' => '4.6',
  'message' => __('The %1$s plugin requires the %2$s WordPress version or greater.', 'text-domain'),
],
```
Replace **text-domain** by the text domain you are using in your plugin, if any.

You can also use a shorthand configuration and just set the `activation['wordpress']` value to the required WordPress version.

```php
'wordpress' => '4.6',
```
Using this shorthand, the framework will set a default error mesage.

If the `activation['wordpress']` setting is not configured, the framework will not check for the WordPress version.

### PHP version

To set the required PHP version, open the `config.php` file and locate the `activation['php']` setting. Here you can set three options:

* **enabled <boolean\>:** Set to true or false to enable or disable the PHP version check.
* **version <string\>:** Set here the required PHP version required by yout plugin.
* **message <string\>:** Configure the message that will be displayed in case PHP is not updated to the required version. You can use the `%1$s` and the the `%2$s` variables in the string, which will be replaced by the plugin name and the required PHP version respectively.

Here is an example of the the php activation configuration:

```php
'php' => [
  'enabled' => true,
  'version' => '7.1',
  'message' => __('The %1$s plugin requires PHP version %2$s or greater.', 'text-domain'),
],
```
Replace **text-domain** by the text domain you are using in your plugin, if any.

You can also use a shorthand configuration and just set the `activation['php']`setting value to the required PHP version.

```php
'php' => '7.1',
```
Using this shorthand, the framework will set a default error mesage.

If the `activation['php']` setting is not configured, the framework will not check for the PHP version when the plugin is enabled.

### Required Plugins

You can configure a list of plugin which will be required on the plugin activation. To set these dependencies, open the file `config.php` and locate the `activation['plugins']` setting.

In this array you can set the list of plugins as a pair of keys and plugin array. Each key should be the WordPress internal plugin name. Here are the settings you can set for each plugin:

* **name <string\>:** The name of the plugin.
* **message <string\>:** The message that will be displayed in case the referenced plugin is not found or enabled. You can use the `%1$s` and the the `%2$s` variables in the string, which will be replaced by your plugin name and the required plugin name. If the message is not present, a default message will be displayed.

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

If the `activation['plugins']` setting is not configured, the framework will not check any required plugin.

## Activation Rules

The activation service allows to set custom activation rules using the `addCheck` method. To do so, you first need to add the plugin to SCI WP and then add the check. The binded methods should return **true** for the check to pass, or any text message for the check to fail. Here are some examples of how to add new checks:

### Using a Closure


You should write the logic for the checks inside the functions and return **true** if the check is correct, and an **error message** if it fails. Here is an example of how to add a function to the Activation service check list:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation checks
$myPlugin->service('activation')->addCheck('check_name', function() {
  $message = 'This condition will always fail';
  return ($message);
});
```

You can also send parameters to these functions, via a **third parameter** if the `addCheck` function:


```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation checks
$myPlugin->service('activation')->addCheck('check_name', function($param1 = 'hey', $param2 = 'ho') {
  $message = $param1 . ' ' .$param2 . ': This condition will always fail';
  return ($message);
});
```

### Using a Function

You can link a reference to an existing function. In the same way as the closures, return to for the check to pass and a message for the check to fail:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

function customCheckFunction() {
  return 'Totally failed!';
}

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation checks
$myPlugin->service('activation')->addCheck('check_name','\MyPlugin\customCheckFunction');
```

You can also use link parameters to these functions via a **third parameter** of the `addCheck` function:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

function customCheckFunction($param1, $param2) {
  if ($param1) {
    return true;
  }
  if ($param2) {
    return 'Failed at parameter 2!';
  }
  return 'Totally failed!';
}

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation checks
$myPlugin->service('activation')->addCheck('check_name','\MyPlugin\customCheckFunction', [false, true]);
```

### Using a Method


The `addCheck` method can also accept functions of an existing class instance. To do that, you just need to specify the function in the addCheck function as an array with an instance and the method to be called:


```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Crate a class instance
$instance = Sci::make('MyPlugin\App\Services\ActivationService');

# Add the method the activation checks
$myPlugin->service('activation')->addCheck('check_name', [$instance, 'method'], [$param1, $param2]);
```

You can also just set the class, and the framework will try to create a new instance of the class for you:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the method the activation checks
$myPlugin->service('activation')->addCheck('check_name', ['MyPlugin\App\Services\ActivationService', 'method'], [$param1, $param2]);
```


You can also set a static class method in the same way, but don't forget to specify the full namespace of the class and the method.

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the class static method the activation checks
$myPlugin->service('activation')->addCheck('check_name', '\MyPlugin\ActivationChecker::method', [$param1, $param2]);
```

### Using a File
It's also possible to use a PHP file. The only condition is that the file should contain a PHP script returning true if the check is correct or string reprensenting the error if the check is false:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

$fullFilePath = $myPlugin->getDir() . '/path/to/script';

$myPlugin->service('activation')->addCheck('check_name', $fullFilePath);
```
The **Activation service** will get the result of the script to verify the condition.


## Activation Actions

The **Activation Service** allows to set a list of actions to execute after each plugin is correctly enabled. To do so you can use the `AddAction` method.

### Using a Closure

You should write the logic for the actions inside the functions. Here is an example of how to add an action to the **Activation Service** action list:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation checks
$myPlugin->service('activation')->addAction('action_name', function() {
  # Action code here
});
```

You can also send parameters to these functions, via a **third parameter** if the `addAction` function:


```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the function the activation actions
$myPlugin->service('activation')->addAction('action_name', function($param1 = 'value1', $param2 = 'value2') {
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

# Add the function the activation actions
$myPlugin->service('activation')->addAction('action_name','\MyPlugin\customActionFunction');
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

# Add the function the activation actions
$myPlugin->service('activation')->addAction('action_name','\MyPlugin\customActionFunction', ['value1', 'value2']);
```

### Using a Method


The `addAction` method can also accept functions of an existing class instance. To do that, you just need to specify the method in the addAction method as an array with a class instance and the method to be called:


```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Crate a class instance
$instance = Sci::make('MyPlugin\App\Services\ActivationService');

# Add the method the activation actions
$myPlugin->service('activation')->addAction('action_name', [$instance, 'method'], [$param1, $param2]);
```

You can just set the class, and the framework will try to create a new instance of the class for you:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the method the activation actions
$myPlugin->service('activation')->addAction('action_name', ['MyPlugin\App\Services\ActivationService', 'method'], [$param1, $param2]);
```


You can also set a static class method in the same way, but don't forget to specify the full namespace of the class and the method.

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# Add the class static method the activation actions
$myPlugin->service('activation')->addAction('action_name', '\MyPlugin\ActivationChecker::method', [$param1, $param2]);
```

### Using a File
It's also possible to use a PHP file with code to be executed when the Plugin is activated successfully:

```php
namespace MyPlugin;

use Sci\Manager\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

$fullFilePath = $myPlugin->getDir() . '/path/to/script';

$myPlugin->service('activation')->addAction('action_name', $fullFilePath);
```

You can also set actions when the plugin is disabled. To add them check the [Plugin Deactivation](/docs/plugin-deactivation) section of this documentation.