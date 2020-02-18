---
id: sciwp-autoloader
title: Autoloader
sidebar_label: Autoloader
---

The Autoloader is responsible for including the referenced classes. This component is used by both the plugins created with the framework and the framework itself, also allowing the use of **namespaces**, which should be a must when building plugins for any application.

## The Autoloader

By using the autoloader, only the referenced class files are loaded into the PHP scripts, improving the performance, reducing the server load and allowing developers to code in a more dynamic way.

When you add a plugin to SCIWP, the framework will search in the **_config.php_** file or in the main plugin file for the plugin namespace. If it's not found, the plugin namespace will default to the lowecased version of the plugin directory name, with the first letter capitalized. All references to classes starting by plugin namespace will be processed by the Autoloader.

## Plugin Namespaces

Plugins using SCIWP must use a root namespace. Child namespaces should usually represent the directory structure class files are located.

### Root Namespace

The use of a root namespace for each plugin is mandatory, preventing class name collisions.

The autoloader will obtain the plugin namespace based on these priorities:

1. SCIWP will search first for the **namespace** option inside the `myplugin/config.php`.
2. If not found, then it will search for the namespace used by the `myplugin/main.php` file.
3. If no namespace was found, the namespace will default to the plugin folder name.

Don't worry about the SCIWP files when you update the namespace. The framework will replace the namespace name in the framework files for you if the **rebuild** option is enabled, so feel free to change it at any time. When  updating the plugin namespace, you can also set the option **rebuild_code** to true if you want the framework to also replace the root plugin namespace in your code. Although this works most of the times, you might still need to update some parts of the code referencing to the old namespace manually.

### Namespace Structure

To better organize the code, the plugin code must be placed in the main plugin folder, which is `myplugin/app` by default. It's also possible to organize the code in modules by using the plugin modules folder, which is `myplugin/modules` by default.

SCIWP will not search for files in other folder unless you manually configure the routes to the files or folders matching the namespaces defined in the `myplugin/config.php` file, under the **autoloader => autoload** array.

#### Directory Structure Convention

For the autoloader to work properly, the folder structure should match the namespace structure, as in many other frameworks.

For example, the class `MyPlugin\App\Models\House` will match the file `myplugin/app/Models/House.php`.

Namespaces are case sensitives, so please note that the namespace **_App_** will only match the directory **_app_** if the **main_namespace** option is set to **_App_**. Otherwise the namespace **_App_** would match the namespace **_App_**.

In case the class is into a module in the modules folder, the autoloader will also search for it. For example, the class `MyPlugin\MyModule\Models\House` should match the file `myplugin/modules/MyModule/Models/House.php`. As you can see, the **modules** folder is skipped from the namespace.

#### File Structure Convention

A class name must always match the file name. So for example, the file name for the class ***_House_** should be **_House.php_**. However, the extension **_.class.php_** will also be allowed and it can be even required if you use reflexive autoloading.

### Reflexive Autoloading

This is a unique feature of this framework which allows you to place any class file into any folder by just defining the class name and the full namespace structure in the file class name.

For example, the file `House.Models.App.class.php` will match the class **MyPlugin\App\Models\House** and can be placed into any folder. The framework will search for the file in all folders until it is found, but just in the first run, as the folder will be saved in the autoloading cache if the cache is enabled.

In the same way, the file `House.Models.MyModule.class.php` will match the class **MyPlugin\MyModule\Models\House** and can be placed into any folder.

To enable the reflexive autoloading you need to set to **_true_** the **reflexive** option, inside the **autoloader** section of the config file. Set it to false to disable it.

## Autoloader Caching

The autoloader cache will keep a record and store of all the classes and the files matching those classes. This is very useful when loading files in a reflexive way, as it dramatically reduces loading times. To clear the autoloading cache, you can set the **rebuild** option to **_true_** in the `myplugin/config.php` file or just delete the `myplugin/cache/autoload.cache.php` file.

To enable the audoloader caching, you need to set the option **cache** in the **autoloader** section of the config file to true. It's recommended to keep this option enabled for a better performance if the reflexive autoloading is also enabled.

## Manual Configuration

It's also possible to define autoloading routes in the config file as pairs of class names or namespace structures and directories. You can set routes for specific files or for all the files matching a namespace, useful when you want to add third party libraries. See below how to do it.

You can configure autoloading routes manually by using the **autoload** array in the **autoloader** section of the `plugin/config.php` file. You map both individual classes to files or namespaces to directories. Classes and namespaces should be always **absolute**, and files and directories should be always **relative** to the plugin directory.

* If you want to map a class to a file, the array element should be formatted as **_Full\Class\Name => relative/path/to/class_**.

* If you want to map a namespace to a directory, the array element should be formatted as **_Full\Namespace\Route => relative/path_**.

Here is an example of each case:

```php
autoload [
  'Manual\Test' => 'app/Example/Test',
  'ThirdParty\Library' => 'Libraries/CustomLibrary',
]
```

In the example above, the class **_Manual\Test_** matches a class and the autoloader will search for it in the `myplugin/app/Example/Test.php` file. The namespace of the file should be **_Manual\Test_**, as it is what you are searching for.

In the next example, the namespace **_ThirdParty\Library_** matches a namespace and the framework will search for all classes matching this namespace in the `myplugin/Libraries/CustomLibrary` directory, overwriting the default directory structure configuration.

You can specify **any folder** in the plugin, so in this case you are not limited to the main or the modules folder.

## Autoloader Configuration

You can configure the autoloader using the **autoloader** section of the configuration array in the `plugin/config.php` file.








