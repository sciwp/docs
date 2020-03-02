---
id: framework-configuration
title: Configuration
sidebar_label: Configuration
---

All the SCIWP Framework configuration options are located in the **_config.php_** file, in the root folder of your plugin.
If you are using the framework with more than one plugin, you can include a configuration file for each one so you can customize
the configuration parameters for each one or add new elements to shared options which accept an array of values.

When editing the **_config.php_** file, you will find an array with many options you can configure, and many more you can add. All of them are covered in this section.

The format of the options listed in this file are defined as **_option_name => value_type_**.

## Main Settings

These are the basic plugin options and are located in the first level of the array, with no parent elements. Here is the list of options:

 * **rebuild => boolean**: This option should only enabled when developing the plugin. You should always delete this options or set the rebuild value to false in production or when releasing your plugin. The rebuild options allows to execute extra tasks like updating the framework base namespace or reading the plugin meta section. Some tasks are only executed when a change is detected, so you can safely enable this options in your local.

 * **rebuild_code => boolean**: This option will only take effect when the rebuild option is enabled. If this option is enabled, the framework will try to replace the base namespace in all plugin files, including your code, when a namespace change is detected. Although this option will work in most cases, it is not guaranteed that all occurrences are replaced successfully.

 * **namespace => string**: This is the base namespace that the plugin will use. Each plugin requires its own namespace so the autoloader knows where to find the files. The use of namespaces prevents possible conflicts with other WordPress plugins. If this option is not present or if the value is empty, the namespace value will default to the one specified in the main file of the plugin. Please note that a rebuild is required to get the namespace from this file. If the namespace is not specified there, it will default to the lowercased version of the plugin directory name, with the first letter capitalized. The framework will automatically trigger a rebuild if this namespace is updated.

 * **main_namespace => string**: This is the namespace matching the main directory of your plugin, which is **_/app_** by default. The
 default namespace for this directory is the same as the main directory name. You can replace it for another one using this option. For example, it's common to use **_App_**.

## Directory Settings

Those are the directories where both the Framework and the Autoloader will look for PHP classes. The directories are defined inside the **_dir_** section. Directories specified here are **relative** to the root directory of each plugin.

 * **main => string**: This is where you will usually place the code of your plugin. The default value is **_/app_**. If the option is not present or if no value is specified, the default value will be used. 

 * **modules => string**: This is the directory where the different modules are placed. Modules are useful if you want to split your code in separate components. The autoloader will also look for files in the modules. The default value is **_/modules_**. If the option is not present or if no value is specified, the default value will be used. 

## Autoloader Settings

The options under the **autoload** section allow to configure different aspects of the **Autoloader**.

* **cache => boolean**: Allows to enable caching for the classes. This functionality speeds up a bit the autoloading process, but is almost **essential** when **reflexive autoloading** is enabled, so the autoloader doesn't need to search for the classes withn all the project each time those classes are requested.

* **reflexive => boolean**: This option enables **reflexive autoloading** for classes. Reflexive loading allows to skip the standard directory structure which is usually used by autoloaders, so developers can place class files into any folder. However, the class files should be named with the class name in first place, followed by the full class namespace separated by dots, ending with the **_.class.php_** extension.

* **autoload => string[]**: This option allows to define a set of classes in an array whose elements have the format **_ class_name => class_path _**, so the autoloader looks for the specified classes in the matching paths. It is another way of skipping the default autoloading structure and place classes into any folder.