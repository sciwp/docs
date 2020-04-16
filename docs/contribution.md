---
id: contribution
title: Contribution
sidebar_label: Contribution
---

In a brief, any user can create pull requests or open bug reports. That will allow to improve the framework and add new features so it's useful for more people.

## Source Code

You can find SCI WP source code on the [**framework repository**] (https://github.com/sciwp/sciwp-framework) at GitHub. You can also find the last release and all past releases for the Framework on the [**releases**] (https://github.com/sciwp/sciwp-framework/releases) section.

Pull requests for both features and bug fixes should be done against the latest [**development branch**] (https://github.com/sciwp/sciwp-framework/tree/dev).

If a vulnerability is discovered, send me an email at [**edu@edulazaro.com**] (mailto:edu@edulazaro.com) so it can be solved as soon as possible without exposing it.

## Coding Style

SICWP follows many of the PHP [**PSR standards**] (https://github.com/php-fig/fig-standards/tree/master/accepted), but keeping at the same time some default WordPress standards. When collaborating in the development of SCI WP you should take these considerations:

### Naming

WordPress variables and attributes are usually named with underscores between words. However, following latest trend, variables and class attributes in SCI WP should be always in [**camel case**] (https://en.wikipedia.org/wiki/Camel_case).

Functions and method names should also follow **camel case**. On the other hand, class names in SCI WP should always follow **pascal case**. Here is an example:


```php

namespace MyPlugin\App\Controllers;

class PascalCaseClass
{
  public $camelCaseAttribute;

  public function camelCaseMethod () { /* ... */ }
}
```

### DocBlocks

Always use PHP DocBlocks for variables, classes, methods and functions. Here is an example of a DocBlock for a method:

```php
/**
 * What the class does goes here.
 *
 * @param  string|array $myFirstParam
 * @param  Closure|string|boolean $mySecondParam
 * @return void
 *
 * @throws Exception
 */
public function simpleMethod($firstParam, $secondParam = false) { /* ... */ }
```

### Braces

Although in this documentation you will find braces in the same line as the method name when code is resumed with three dots for demonstration purposes, opening braces in classes and methods should start in the next line.

For control structures, braces should be placed in the same line of the control structure definition.


## Bug Reports

You can create a Bug Report [**opening a new issue**] (https://github.com/sciwp/sciwp-framework/issues) on the framework repository at GitHub. Please include all relevant information and a detailed explanation, including a code sample demonstrating the failure. This way, both developers and other users will benefit from the report, as reports also allow users to to solve similar problems.

When opening an issue, you should not expect an immediate answer to opened issues. Both the main developer and other users usually have limited free time per day. However, a good bug report is usually a good way to start a new patch or include changes which solve the issue in an upcoming version.