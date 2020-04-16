---
id: views
title: Views
sidebar_label: Views
---

As with any other framework, the purpose of views is to print or return contents, keeping a logical separation between business logical and front end design.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Creating a View

Views are plain php files. To call a view, you first need to create a new file and place it into the views folder. The file can have both `.php` extension or `.view.php` extension. The views folder is the `../app/views` directory by default. That is, your main plugin directory followed by the views directory.

To create a view you just need to call the `create` method of the **View** class. This method accepts the next parameters:

* **file <string\>**: The view file, relative to the views dorectory (_optional_).
* **plugin <string\>**: The plugin where the framework should look for the view. The main plugin, if there's a main one, is selected by default (_optional_).
* **module <string\>**: The module where the view is located. No module is selected by default (_optional_).

Here is an example of how to create the `myView.view.php` which is located in the `views/go` directory:

```php
namespace MyPlugin;

use Sci\View;

function show()
{
  $myView = View::create('go/myView');
}

```

Here is another of how to create the `myView.view.php` which is located in the `views/go` directory of the plugin with the id `'otherplugin'`):

```php
namespace MyPlugin;

use Sci\View;

function show()
{
  $myView = View::create('go/myView', 'otherplugin');
}
```
And here is another of how to create the `myView.view.php` which is located in the `views/go` directory of the plugin with the id `'otherplugin'` inside the `'mymodule'` module):

```php
namespace MyPlugin;

use Sci\View;

function show()
{
  $myView = View::create('go/myView', 'otherplugin', 'mymodule');
} 

```

## Rendering a View

Creating a view is not enough, as you will need to use the `render` method to render it. Here is an example:

```php
namespace MyPlugin;

use Sci\View;

function show()
{
  return View::create('go/myView')->render();
}

```

## View Parameters

You can set view parameters using the `params` method of the *View* class, which accepts the next parameters:

* **params <array\>**: An array with the parameters. The keys of the array are the parameter names and the values the parameter values.

Here is an example:

```php
namespace MyPlugin;

use Sci\View;

function show()
{
  return View::create('go/myView')->params(['myVar'=>'My variable value'])->render();
}

```

The parameters configured here swill be avaiable into the view file.

 ## Views Configuration

 It's possible to change the default views folder for each plugin. To do so, just update the `views['dir']` option into the `config.php` file. If the option does not exist, just add it. In the next example we are using the 'myviews' folder instead of the default one:

 ```php
  'views' => [  
    'dir' => 'myviews'
  ],
```