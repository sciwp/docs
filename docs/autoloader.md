---
id: autoloader
title: Autoloader
sidebar_label: Autoloader
---

The Autoloader is responsible for including the referenced classes when they are needed. It's still common in WordPress to require all the class files at the beginning of the files. However you should not follow that practive when using this framework.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Autoloading

The Autoloader is used by both the plugins created with the framework and the framework itself, also allowing the use of **namespaces**, which should be a must when building plugins for any application.

When using SCI WP you will just need to reference a class to include it. Here is an example:

```php
namespace MyPlugin;

$hugService = new App\Services\HugService();
```

And that's it. You will not need to require the `HugService.php` file, as the Autoloader already knows where it is. However, you will need to follow a folder structure convention so the Autoloader is able to find it. For example, the ```App\Services\HugService``` class should be located in the ```./app/Services/``` folder, relative to your plugin directory, inside the ```HugService.php``` file.

Well, you can place it anywhere if you use reflexive autoloading, but let's attach to this standard for now. You can [read more about autoloading here] (https://www.php.net/manual/en/language.oop5.autoload.php) for a general overview.

By using the autoloader, only the referenced class files are loaded into the PHP scripts, improving the performance, reducing the server load and allowing developers to code in a more dynamic way.

When you add a plugin to SCI WP, the framework will search inside the `config.php` file or in the main plugin file for the plugin namespace. If it's not found, the plugin namespace will default to the lowecased version of the plugin directory name, with the first letter capitalized. All references to classes starting by the plugin namespace will be processed by the Autoloader.


## Namespaces

Plugins using SCI WP must use a root namespace. Child namespaces should usually represent the directory structure where class files are located.

### Root Namespace

The use of a root namespace for each plugin is mandatory, preventing class name collisions.

When you use a Plugin with the framework, the autoloader will obtain the plugin namespace based on these priorities:

1. SCI WP will search first for the **namespace** option inside the `./config.php` file of your plugin.
2. If not found, then it will search for the namespace used by the main file of your plugin.
3. If no namespace was found, the namespace will default to the plugin folder name.

> **Bundled version**: Don't worry about the framework files when you update the namespace of the plugin which bundles the
> framework. The framework will replace the namespace name in the framework files for you when the **rebuild** option is enabled.

### Namespace Structure

To better organize the code, the core plugin code must be placed in the main plugin folder, which is the `./app` directory by default. It's also possible to organize the code in modules by using the modules folder, which is the `./modules` directory by default.

SCI WP will not search for files in other folder unless you manually configure the routes to the files or folders matching the namespaces defined in the `./config.php` file, under the `'autoloader' => 'autoload'` array.

#### Directory Structure Convention

For the autoloader to work properly, the folder structure should match the namespace structure, as in many other frameworks.

For example, the class **MyPlugin\App\Models\House** will match the file `./app/Models/House.php` of your plugin.

Namespaces are case sensitive. The **MyPlugin\App\Controllers** namespace will just match the directory `./app/Controllers` and not the the `./app/controllers` directory. However there is one exception to this. The **App** namespace will match both the `./app`directory and the `./App` directory.

In case the class is into a module in the modules folder, the autoloader will also search for it. For example, the class **MyPlugin\MyModule\Models\House** should match the file `./modules/MyModule/Models/House.php`. As you can see, the **modules** folder is omitted from the namespace.

#### File Structure Convention

A class name must always match the file name. So for example, the file name for the class **House** should be `House.php`. However, the extension `.class.php` will also be allowed and it can be even required if you use reflexive autoloading, so the file `House.class.php` will also be accepted.

## Reflexive Mode

This is a unique feature of this framework which allows you to place any class file into any folder by just defining the class name and the full namespace structure in the file class name.

For example, the file `House.Models.App.class.php` will match the class **MyPlugin\App\Models\House** and can be placed into any folder. The framework will search for the file in all folders until it is found, but just in the first run, as the folder will be saved in the autoloading cache if the cache is enabled.

In the same way, the file `House.Models.MyModule.class.php` will match the class **MyPlugin\MyModule\Models\House** and can be placed into any folder.

To enable the reflexive autoloading you need to set to **true** the `'reflexive'` option, inside the **autoloader** section of the `config.php` file. Set it to **false** to disable it.

## Caching

The autoloader cache will keep a record and store of all the classes and the files matching those classes. This is very useful when loading files in a reflexive way, as it dramatically reduces loading times. To clear the autoloading cache, you can set the `'rebuild'` option to **true** in the `config.php` file or just delete the `./cache/autoload.cache.php` file.

To enable the audoloader caching, you need to set the option `'cache'` in the `'autoloader'` section of the config file to **true**. It's recommended to keep this option enabled for a better performance if the reflexive autoloading is also enabled.

## Configuration

It's also possible to define autoloading routes in the `config.php` file as pairs of class names or namespace structures and directories. You can set routes for specific files or for all the files matching a namespace, useful when you want to add third party libraries. See below how to do it.

You can configure autoloading routes manually by using the `'autoload'` array in the `'autoloader'` section of the `config.php` file. You can map both individual classes to files or namespaces to directories. Namespaces in this section should be always **absolute**, and files and directories should be always **relative** to the plugin directory.

* If you want to map a class to a file, the array element should be formatted as `'Full\Class\Name => relative/path/to/class'`.

* If you want to map a namespace to a directory, the array element should be formatted as `'Full\Namespace\Route => relative/path'`.

Here is an example of each case:

```php
'autoload' => [
  'Manual\Test' => 'app/Example/Test',
  'ThirdParty\Library' => 'Libraries/CustomLibrary',
]
```

In the example above, the definition **Manual\Test** matches a class and the autoloader will search for it in the `./app/Example/Test.php` file. The namespace inside the file should be **Manual**, and the class name should be **Test**.

In the next example, the definition **ThirdParty\Library** matches a namespace, and the framework will search for all classes matching this namespace in the `./Libraries/CustomLibrary` directory, overwriting the default directory structure configuration.

You can specify **any folder** in the plugin, so in this case you are not limited to the main directory or the modules folder.








