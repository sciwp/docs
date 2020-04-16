---
id: helpers
title: Helpers
sidebar_label: Helpers
---

Helpers are classes with sets of static methods used to provide support for some tasks, like managing arrays, managing strings or parsing query strings.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Create a Helper

You can use any class as a helper. However, you can also extend the included Helper class, which already includes the static trait.

```php
use Sci\Support\Helper;

class MyHelper extends Helper {
    # Code here
}
```

## Included Helpers

It would be quite extensive to describe all helpers here. You can find all the included helpers in the **Helpers** folder of the framework.
