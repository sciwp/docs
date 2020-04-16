---
id: configuration
title: Configuration
sidebar_label: Configuration
---

All the SCI WP Framework configuration options are located in the `config.php` file, in the root folder of your plugin.
If you are using the framework with more than one plugin, you can include a configuration file for each one.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

When editing the `config.php` file, you will find an array with many options you can configure. All of them are covered in this section. The options listed in this file are all defined as pairs of `'option_name' => 'value_type'`.

## Main Settings

These are the basic plugin options and are located in the first level of the array, with no parent elements. Here is the list of options:

 * **rebuild <boolean\>**: This option should only enabled when developing the plugin. You should always delete this option or set the rebuild value to false in production or when releasing your plugin. The rebuild option allows to reload the configuration and the autoloading cache. Some tasks are only executed when a change is detected, so you can safely enable this options in your local. In  case the framework is bundled with your plugin, the framework base namespace will be updated in the framework files when the plugin namespace is updated.

 * **namespace <string\>**: This is the base namespace that the plugin will use. Each plugin requires its own namespace so the autoloader knows where to find the files. The use of namespaces prevents possible conflicts with other WordPress plugins. If this option is not present or if the value is empty, the namespace value will default to the one specified in the main file of the plugin. Please note that a rebuild is required to get the namespace from this file. If the namespace is not specified there, it will default to the lowercased version of the plugin directory name, with the first letter capitalized.

## Directory Settings

These are the directories where the Autoloader will look for PHP classes. The directories are defined inside the `'dir'` section. Directories specified here are **relative** to the root directory of each plugin.

 * **main <string\>**: This is where you will usually place the code of your plugin. The default value is `./app`. If the option is not present or if no value is specified, the default value will be used. 

 * **modules <string\>**: This is the directory where the different modules are placed. Modules are useful if you want to split your code in separate components. The autoloader will also look for files in the modules. The default value is `./modules`. If the option is not present or if no value is specified, the default value will be used. 

## Autoloader Settings

The options under the `'autoload'` section allow to configure different aspects of the **Autoloader**.

* **cache <boolean\>**: Allows to enable caching for the classes. This functionality speeds up a bit the autoloading process, but is almost **essential** when **reflexive autoloading** is enabled, so the autoloader doesn't need to search for the classes within all the project each time those classes are requested.

* **reflexive <boolean\>**: This option enables **reflexive autoloading** for classes. Reflexive loading allows to skip the standard directory structure which is usually used by autoloaders, so developers can place class files into any folder. However, the class files should be named with the class name in first place, followed by the full class namespace separated by dots, ending with the `class.php` extension.

* **autoload <string[]\>**: This option allows define classes or namespaces in an array to match them with files or directories. The elements in the array should be defined as `'Class' => 'path'`, so the autoloader looks for the specified classes or namespaces in the matching paths. It is another way of skipping the default autoloading structure and place classes into any folder.