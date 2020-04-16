---
id: queries
title: Queries
sidebar_label: Queries
---

You can perform some advanced queries into any database table or directoy into any model.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.


## Query Basics


You can use the `query` method into any model to start an advanced query with the model. The method will return the query itself so you can add condition after condition and get the results in the end.

```php
$orcs = App\Models\Orc::query();
```

You can also use the `query` method of the DB class to start a new database query.

```php
use Sci\Database\DB;

$orcs = DB::query();
```

### Select a Table

You can select a table using the query `table` method. 

```php
use Sci\Database\DB;

$orcs = DB::query()->table('wp_orcs')->get();
```

You can also use the `table` method of the **DB** class as a shortcut, which will start a new query and select the specified table:

```php
use Sci\Database\DB;

$orcs = DB::table('wp_orcs')->get();
```

You can also use the `from` method:


```php
use Sci\Database\DB;

$orcs = DB::query()->from('wp_orcs');
```

### Select Fields

You can select the table columns or fields to return by using the `select` method:

```php
use Sci\Database\DB;

$orcs = DB::query()->select('name', 'surname');
```

You can also filter the column values here:

```php
use Sci\Database\DB;

$orcs = DB::query()->select(['name' = 'thrall']);
```

### Get Results

To get the results of a query yo should use the `get` method, which will retrieve the resutls of the query:

```php
use Sci\Database\DB;

$orcs = DB::table('wp_orcs')->get();
```

If you just want to get the first record in the results, you can use the  `first` method: 

```php
use Sci\Database\DB;

$orcs = DB::table('wp_orcs')->first();
```

### Count Results

If you just want to count the number of results retrieved, you can use the `count` method:

```php
use Sci\Database\DB;

$orcs = DB::table('wp_orcs')->count();
```

### Sub Queries

```php
use Sci\Database\DB;

$orcs = DB::query()->from('wp_orcs');
```

The `from` method also allows to specify another query, so the current query can be executed using the results of another one:

```php
use Sci\Database\DB;

$orcs = DB::table('wp_orcs');

$results = DB::query()->select(['name', 'faction'])->from($orcs);

```

You can use a **Closure** with the from method as long as it returns a Query:

```php
$orcs = DB::query()->select(['name'])->from(

  function($query) { 
    $query->from('wo_orcs')->where(['surname' => 'Whatever']);
  }
    
)->get();

```

## Where Clauses

This is the most simple query, which will get all record in the database table without any conditions specified:

```php

$orcs = App\Models\Orc::query()->get();
foreach ($orcs as $orc) {
    echo $orc->name;
}
```
There are many constraints and options you can add. You can use them in any order, but the only one requirement is that the get method is used at the end to execute the query and get the results. In the next secitons you can view all query options.

### The where clause

Allows to add a standard where clause, which accepts the next parameters:

* **Column <string\>**: The name of the column where you want to check the condition. If no value is specified, the default column will be the primary key of the model.
* **Operator <string\>**: The operator, which accepts any valid SQL comparison operator, like `'='`, `'>'`, `'>='`, `'<'`, `'<='` and more. If no value is specified, the operator `'='` will be used by default.
* **Value <mixed\>**: The value to compare with the field value. The value is always required.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.
* **Many <string\>**: By default, when you specify a set of values in a constraint, the field should match any of the values in the set, using `OR` by default. You can make the field match all values in the set by using `AND`. If this is not specified, `OR` will be used by default.

You must specify at least a value, and the rest of the arguments are optional. Here is an example which uses all parameters:

```php
$orcs = App\Models\Orc::query()->where([
  'name', // Apply the constraint to the name filed
  '=', //The condition operator
  ['Trall', 'Orgrim'], // Value or array of values to compare
  'AND', // Relation with the previous constraints if many are specified
  true, // The condition is not negated
  'OR' // Match any of the specified values
])->get();
```

If there is just one clause, it can be also specified in this way, using the default values for the other parameters:

```php
$orcs = App\Models\Orc::query()->where('name', ['Trall', 'Orgrim'])->get();
```

You can concatenate many where clauses by appending them to the returned value of the previous one:

```php
$orcs = App\Models\Orc::query()->where('name', ['Trall', 'Orgrim'])->where(['armor', '>', 5])->get();
```

Or if you want, it's possible to specify many constraints in the same where clause as long as they are between brackets, in array format:

```php
$orcs = App\Models\Orc::query()->where(['name', ['Trall', 'Orgrim']], ['armor', '>', 5])->get();

```
### The whereNot clause

This clause adds a negated standard where constraint. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNot(['name', '=', 'Orgrim'])->get();
```
The the previous example we search for an orc whose name is not Orgrim. It's also possible to get the same result using the not equals `!=` operator with a standard `where` clause. You can also specify many comma separated constraints.

### The whereAny clause

This clause adds a standard where constraint, but validating the field value against any of the values by default, in case an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereAny(['name', '=', ['Trall', 'Orgrim']])->get();
```
The the previous example we are searching for any orc whose name matches any of the patterns in the array. You can also specify many comma separated constraints.

### The whereAll clause

This clause adds a standard where constraint, but validating the field value against all the values by default, in case an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereAll(['name', 'LIKE', ['%tr%', '%al%']])->get();
```
The the previous example we are searching for any orc whose name matches all the patterns in the array. You can also specify many comma separated constraints.

### The orWhere clause

This clause adds a standard where clause, but joining it with the previous one using the **OR** operator instead of the default **AND** operator, so both conditions or sets of conditions need to be true. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhere(['strength', '>', 30])->get();
```
The the previous example we search for the orcs whose armor has more than 10 points or whose strength has more than 30 points. You can also specify many comma separated constraints.

### The orWhereNot clause

This clause adds a negated orWhere clause, joining it with the previous one with the **OR** operator instead of the default **AND** operator. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereNot(['strength', '>', 20])->get();
```
The the previous example we search for the orcs whose armor has more than 10 points or whose strength does not have more than 20 points. You can also specify many comma separated constraints.

### The orWhereAny clause

This clause adds a orWhere constraint, validating the field value against any of the values if an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereAny(['name', '=', ['Trall', 'Orgrim']])->get();
```
The the previous example we are searching for any orc whose armor has more than 10 points and whose name matches any the patterns in the array. You can also specify many comma separated constraints.

### The orWhereAll clause

This clause adds a orWhere constraint, but validating the field value against all the values if an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereAll(['name', 'LIKE', ['%tr%', '%al%']])->get();
```
The the previous example we are searching for any orc whose armor has more than 10 points and whose name matches all the patterns in the array. You can also specify many comma separated constraints.

## WhereRaw Clauses

These clauses append a raw SQL query.

### The whereRaw clause

This clause appends a custom raw SQL query to the query. It accepts three arguments:

* **Query <string\>**: The raw query in SQL format.
* **Replacement<boolean\>**: If this is set to true, the dangerous characters will be replaced. This option is set to false by default.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example.

```php
$orcs = App\Models\Orc::query()->whereRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose strength is lower than 20 points.

### The whereNotRaw clause

This clause adds a negated whereRaw caluse. It accepts the same parameters as the whereRaw clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose strength is not lower than 20 points. You can also specify many comma separated queries using the array format.

### The orWhereRaw clause

This clause appends a custom raw SQL query to the query, appending it to the previous one using the `OR` operator. It accepts the same parameters as the whereRaw clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereRaw("armor > 10")->orWhereRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose armor is more than 10 points or whose strength is lower than 20 points. You can also specify many comma separated queries using the array format.

### The orWhereNotRaw clause

This clause adds a negated orWhereRaw caluse, appending it to the previous one using the `OR` operator. It accepts the same parameters as the whereRaw clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereRaw("armor > 10")->orWhereNotRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose armor is more than 10 points or whose strength is not lower than 20 points. You can also specify many comma separated queries using the array format.

## WhereLt Clauses

These clauses append a **_less than_** clause.

### The whereLt clause

Add a where clause using the less than `<` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare againts the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->whereLt ('armor', 30)->get();
```
The previous query will select all orcs whose armor is lower than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->whereLt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower than 30 points and whose strength is lower than 15 points.

### The whereNotLt clause

Add a negated where clause using the less than `<` operator. It accepts the same arguments as the whereLt constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotLt ('armor', 30)->get();
```
The previous query will select all orcs whose armor is not lower than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLt clause

Add a where clause using the less than `<` operator, appending it to the previous one using the `OR` operator. It acceps a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLt ('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is lower than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or the orcs whose armor is lower than 30 points and whose strength is lower than 15 points.

### The orWhereNotLt clause

Add a negated where clause using the less than `<` operator, appending it to the previous one using the `OR` operator. It accepts the same arguments as the orWhereLt constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotLt ('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not lower than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

## WhereLte Clauses

These clauses append a **_less than or equals_** clause.

### The whereLte clause

Add a where clause using the less or equals `<=` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->whereLte('armor', 30)->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->whereLte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The whereNotLte clause

Add a negated where clause using the  less or equals `<=` operator. It accepts the same arguments as the whereLte constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotLte('armor', 30)->get();
```
The previous query will select all orcs whose armor is not lower or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLte clause

Add a where clause using the less or equals `<=` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is lower or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or those orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The orWhereNotLte clause

Add a negated where clause using the less or equals `<=` operator, appending it to the previous one using the `OR` operator. It accepts the same arguments as the orWhereLte constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotLte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not lower or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

## WhereGt Clauses

These clauses append a **_greater than_** clause.

### The whereGt clause

Add a where clause using the greater than `>` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->whereGt('armor', 30)->get();
```
The previous query will select all orcs whose armor is greater than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->whereGt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is greater than 30 points and whose strength is bigger than 15 points.

### The whereNotGt clause

Add a negated where clause using the greater than `>` operator. It accepts the same arguments as the whereGt constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotGt('armor', 30)->get();
```
The previous query will select all orcs whose armor is not greater than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.


### The orWhereGt clause

Add a where clause using the greater than `>` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGt('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is greater than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose whose surname is Doomhammer or those orcs whose armor is greater than 30 points and whose strength is bigger than 15 points.

### The orWhereNotGt clause

Add a negated where clause using the greater than `>` operator, appending it to the previous one using the `OR` operator.  It accepts the same arguments as the orWhereGt constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotGt('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not greater than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

## WhereGte Clauses

These clauses append a **_greater than or equals_** clause.

### The whereGte clause

Add a where clause using the greater or equals `>=` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->whereGte('armor', 30)->get();
```
The previous query will select all orcs whose armor is greater or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->whereGte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The whereNotGte clause

Add a negated where clause using the greater or equals `>=` operator. It accepts the same arguments as the whereGte constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotGte('armor', 30)->get();
```
The previous query will select all orcs whose armor is not greater or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereGte clause

Add a where clause using the greater or equals `>=` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field <string\>**: The name of the table column to compare.
* **Value <mixed\>**: The value to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is greater or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or those orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The orWhereNotGte clause

Add a where clause using the greater or equals `>=` operator, appending it to the previous one using the `OR` operator.It accepts the same arguments as the orWhereGte constraint. Here is an example:

```php
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotGte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not greater or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.


## WhereIn Clauses

These clauses append a **_in_** clause.

### The whereIn clause

Add a where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. It accepts these arguments:

* **Field <string\>**: The name of the table column to compare.
* **Values**: The set of values to compare against the field.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```php
$orcs = App\Models\Orc::query()->whereIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose surname is Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.
```php
$orcs = App\Models\Orc::query()->whereIn(['surname', ['Doomhammer', 'Blackrock']],['name', ['Orgrim', 'Thrall'], 'AND'])->get();
```
The previous query will select all orcs whose surname is Doomhammer or Blackrock and whose name is Orgrim or Thrall.

### The whereNotIn clause

Add a negated where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. It uses the same operator as the whereIn clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereNotIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose surname is not Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereIn clause

Add a where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. The constraint will be appended to the previous one using the `OR` operator. It uses the same operator as the whereIn clause.

Here is an example:

```php
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereIn ('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose armor is greater than 10 or whose surname is Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereNotIn clause

Add a negated where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. The constraint will be appended to the previous one using the `OR` operator. It uses the same operator as the whereIn clause. Here is an example:

```php
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereNotIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose armor is greater than 10 or whose surname is not Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

## WhereLike Clauses

These clauses append a **_like_** clause.

### The whereLike clause

Add a where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. It accepts these arguments:

* **Field <string\>**: The name of the table column to compare.
* **Pattern <string|array\>**: The pattern or set of patterns to match.
* **Append <string\>**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean <boolean\>**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:
```php
$orcs = App\Models\Orc::query()->whereLike('name', '%al%')->get();
```
The previous query will select all orcs whose name contains the `'al'` substring. You can also specify many patterns in an array format:

```php
$orcs = App\Models\Orc::query()->whereLike('name', ['%al%','%al%'])->get();
```
It's also possible to use an array or a set of arrays containing multiple queries. Here is an example:

```php
$orcs = App\Models\Orc::query()->whereLike(['name', '%al%'],['surname', '%im%', 'AND')->get();
```
The previous query will select all orcs whose name contains the `'al'` substring and whose surname contains the `'im'` substring.

### The whereNotLike clause

Add a negated where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. It accepts the same arguments as the whereLike clause. Here is an example:
```php
$orcs = App\Models\Orc::query()->whereNotLike('name', '%al%')->get();
```
The previous query will select all orcs whose name does not contain the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLike clause

Add a where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. The clause will be appended to the previous one using the `'OR'` operator. It accepts the same arguments as the whereLike clause. Here is an example:
```php
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereLike ('name', '%al%')->get();
```
The previous query will select all orcs whose armor is greater than 10 and whose name contains the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereNotLike clause

Add a negated where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. The clause will be appended to the previous one using the `'OR'` operator. It accepts the same arguments as the whereLike clause. Here is an example:
```php
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereNotLike ('name', '%al%')->get();
```
The previous query will select all orcs whose armor is greater than 10 and whose name does not contain the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.
