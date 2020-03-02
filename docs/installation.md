---
id: framework-install
title: Installation
sidebar_label: Installation
---

In this section you will find how to install the framework and get started with it. It might look long because there are some considerations to explain, but in most cases it's just matter of writing **three lines of code**.

## Requirements

SCIWP Framework makes use of many WordPress components, so the base requirements for the latest SCIWP version are usually the same as the latest major WordPress version. However you will need to make sure that your server meets the following requirements before installing the framework:

* PHP >= 7.2

* WordPress >= 5.0

There are also some web server considerations you will need to take for the framework to work properly. Check the [Server Configuration](#server-configuration) section for more details.


## Installing SCIWP

The installation of SCIWP Framework will not take you more than one or two minutes. You can install the framework into a new WordPress plugin or into an existing plugin you have created. The installation process is exactly the same.

### Installation

 If you are creating a new plugin, start by creating a new directory for it into the ```\wp-content\plugins``` folder. For example: ```\wp-content\plugins\myplugin```. Then follow these steps:

1. Create a new empty directory called **sciwp** inside your plugin's folder.
2. Download the latest stable release of SCIWP Framework from [this GitHub repository](https://github.com/sciwp/sciwp-framework/releases).
3. Extract the downloaded file contentents into the plugin's **sciwp** directory created in the first step.

After installing the framework, you still need to configure the Plugin to use it, which will take around 40 seconds.

### Plugin Setup

If you are creating a new plugin, you can just use the SCIWP Boilerplate template. To use the template, download the latest release from [this GitHub repo](https://github.com/sciwp/sciwp-boilerplate/releases) and then extract the downloaded file contents into the ```\wp-content\plugins\myplugin``` directory, as per our example.

If you are not using the boilerplate, just edit the main file of your plugin, where you define the WordPress plugin name and the plugin description. This file is usually located in the root folter of your plugin. Then you just need add the next two lines of code to this file:

```php
# Define the namespace
namespace MyPlugin;

# Start the framework assuming the plugin file is 
# in the root folder of your plugin
include plugin_dir_path(__FILE__).'sciwp/run.php';

# Create a new Plugin and regsiter it into the Plugin Manager
Sci\Plugin::create(__FILE__)->register();
```
As you can see, we first define the namespace ```\MyPlugin\``` for the file. The namespace specified in this file will be the base namespace for the Plugin. However, it's possible to use a different one by just defining a namespace in the main file of the plugin. If you don't specify a namespace at the top of the file, just remember to include the full class name for the Plugin class, including the base namespace, when creating the plugin.

```php
# Specify the full namespace
MyPlugin\Sci\Plugin::create(__FILE__)->register();
```

That's all you need to start. To **activate the plugin**, just access the WordPress administration panel and activate it as usually. However, there are some considerations described in the [Server Configuration](#server-configuration) section below you might need to take before activating your Plugin.

When the Plugin is activated for the first time, the framework namespaces will be configured to use the current plugin root namespace to avoid problems with plugins created by other users which use a different instance of SCIWP.


## Server configuration
In general, you will not need to make the changes explained in this section. However, it's worth to read this information before enabling your Plugin.

### Directory Permissions

After installing the framework, you may need to configure some permissions so it is able to replace the included default namespace for the one matching your plugin's configuration. At least, directories within the ```..\myplugin\sciwp``` folder should be writable by your web server, as otherwise the framework might experience problems.

The default base namespace for the downloaded SCIWP Framework files is ```MyPlugin\```. If you get write permission errors when activating your plugin, you will need to open the framework directory ```..\myplugin\sciwp``` with an editor like [Notepad++] (https://notepad-plus-plus.org/downloads/), [VS Code] (https://code.visualstudio.com/) or [Sublime] (https://www.sublimetext.com/) and find and replace all occurrences of the string ```MyPlugin\``` with the base namespace you want to setup.

SCIWP can also replace the namespaces in your code if the ```rebuild_code``` option in the **_config.php_** file is enabled. If the option is enabled and you get write permission errors , you will need to grant permissions to all the files inside your plugin or manually replace the base namespace in all the files to match the one you want.

### Pretty Permalinks

Your web server must accept **pretty permalinks** so you can create new **routes**. Configuration is different for the different web servers.

#### Apache

Before any configuration, make sure that the **_mod_rewrite_** module is enabled in **Apache**. Once enabled, you can switch on pretty permalinks in WordPress by acessing the **Permalinks** option in the WordPress administration panel. If the routes are not still working, try to add the next configuration to the **_.htaccess_** file located in the root directory of your WordPress installation as an alternative:

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
```

#### Nginx

If you are using **Nginx**, you need to add the following directive to the configuration file of your website:

```
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

Once applied this configuration, both WordPress and SCIWP will be able to process new routes and permalink structures.

## Extending your Plugin

If you want to create another plugin as an extension of the plugin you have just created (MyPlugin, as per our example), you don't need to follow this process again. It's enough to add this line of code in the main file of the new plugin, where **_MyPlugin_** is the namespace of your main plugin:

```php
# Define namespace
namespace MyChildPlugin;

# Register a new Plugin into the Plugin Manager
\MyPlugin\Sci\Plugin::create(__FILE__)->register();
```

You can use SCIWP with all plugins you want. Just remember to configure these new plugins so they require the plugin which includes SCIWP.

It's also important to note that two plugin cannot use the same base namespace.