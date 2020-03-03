(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{106:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return p}));var n=a(1),o=a(6),r=(a(0),a(135)),l={id:"framework-autoloader",title:"Autoloader",sidebar_label:"Autoloader"},i={id:"framework-autoloader",title:"Autoloader",description:"The Autoloader is responsible for including the referenced classes. This component is used by both the plugins created with the framework and the framework itself, also allowing the use of **namespaces**, which should be a must when building plugins for any application.",source:"@site/docs\\autoloader.md",permalink:"/docs/framework-autoloader",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/autoloader.md",sidebar_label:"Autoloader",sidebar:"someSidebar",previous:{title:"Basics",permalink:"/docs/framework-basics"},next:{title:"Dependencies",permalink:"/docs/framework-dependencies"}},s=[{value:"The Autoloader",id:"the-autoloader",children:[]},{value:"Plugin Namespaces",id:"plugin-namespaces",children:[{value:"Root Namespace",id:"root-namespace",children:[]},{value:"Namespace Structure",id:"namespace-structure",children:[]},{value:"Reflexive Autoloading",id:"reflexive-autoloading",children:[]}]},{value:"Autoloader Caching",id:"autoloader-caching",children:[]},{value:"Manual Configuration",id:"manual-configuration",children:[]},{value:"Autoloader Configuration",id:"autoloader-configuration",children:[]}],c={rightToc:s};function p(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The Autoloader is responsible for including the referenced classes. This component is used by both the plugins created with the framework and the framework itself, also allowing the use of ",Object(r.b)("strong",{parentName:"p"},"namespaces"),", which should be a must when building plugins for any application."),Object(r.b)("h2",{id:"the-autoloader"},"The Autoloader"),Object(r.b)("p",null,"By using the autoloader, only the referenced class files are loaded into the PHP scripts, improving the performance, reducing the server load and allowing developers to code in a more dynamic way."),Object(r.b)("p",null,"When you add a plugin to SCIWP, the framework will search in the ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"config.php"))," file or in the main plugin file for the plugin namespace. If it's not found, the plugin namespace will default to the lowecased version of the plugin directory name, with the first letter capitalized. All references to classes starting by plugin namespace will be processed by the Autoloader."),Object(r.b)("h2",{id:"plugin-namespaces"},"Plugin Namespaces"),Object(r.b)("p",null,"Plugins using SCIWP must use a root namespace. Child namespaces should usually represent the directory structure class files are located."),Object(r.b)("h3",{id:"root-namespace"},"Root Namespace"),Object(r.b)("p",null,"The use of a root namespace for each plugin is mandatory, preventing class name collisions."),Object(r.b)("p",null,"The autoloader will obtain the plugin namespace based on these priorities:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"SCIWP will search first for the ",Object(r.b)("strong",{parentName:"li"},"namespace")," option inside the ",Object(r.b)("inlineCode",{parentName:"li"},"myplugin/config.php"),"."),Object(r.b)("li",{parentName:"ol"},"If not found, then it will search for the namespace used by the ",Object(r.b)("inlineCode",{parentName:"li"},"myplugin/main.php")," file."),Object(r.b)("li",{parentName:"ol"},"If no namespace was found, the namespace will default to the plugin folder name.")),Object(r.b)("p",null,"Don't worry about the SCIWP files when you update the namespace. The framework will replace the namespace name in the framework files for you if the ",Object(r.b)("strong",{parentName:"p"},"rebuild")," option is enabled, so feel free to change it at any time. When  updating the plugin namespace, you can also set the option ",Object(r.b)("strong",{parentName:"p"},"rebuild_code")," to true if you want the framework to also replace the root plugin namespace in your code. Although this works most of the times, you might still need to update some parts of the code referencing to the old namespace manually."),Object(r.b)("h3",{id:"namespace-structure"},"Namespace Structure"),Object(r.b)("p",null,"To better organize the code, the plugin code must be placed in the main plugin folder, which is ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/app")," by default. It's also possible to organize the code in modules by using the plugin modules folder, which is ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/modules")," by default."),Object(r.b)("p",null,"SCIWP will not search for files in other folder unless you manually configure the routes to the files or folders matching the namespaces defined in the ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/config.php")," file, under the ",Object(r.b)("strong",{parentName:"p"},"autoloader => autoload")," array."),Object(r.b)("h4",{id:"directory-structure-convention"},"Directory Structure Convention"),Object(r.b)("p",null,"For the autoloader to work properly, the folder structure should match the namespace structure, as in many other frameworks."),Object(r.b)("p",null,"For example, the class ",Object(r.b)("inlineCode",{parentName:"p"},"MyPlugin\\App\\Models\\House")," will match the file ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/app/Models/House.php"),"."),Object(r.b)("p",null,"Namespaces are case sensitives, so please note that the namespace ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"App"))," will only match the directory ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"app"))," if the ",Object(r.b)("strong",{parentName:"p"},"main_namespace")," option is set to ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"App")),". Otherwise the namespace ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"App"))," would match the namespace ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"App")),"."),Object(r.b)("p",null,"In case the class is into a module in the modules folder, the autoloader will also search for it. For example, the class ",Object(r.b)("inlineCode",{parentName:"p"},"MyPlugin\\MyModule\\Models\\House")," should match the file ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/modules/MyModule/Models/House.php"),". As you can see, the ",Object(r.b)("strong",{parentName:"p"},"modules")," folder is skipped from the namespace."),Object(r.b)("h4",{id:"file-structure-convention"},"File Structure Convention"),Object(r.b)("p",null,"A class name must always match the file name. So for example, the file name for the class ",Object(r.b)("strong",{parentName:"p"},"*",Object(r.b)("em",{parentName:"strong"},"House"))," should be ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"House.php")),". However, the extension ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},".class.php"))," will also be allowed and it can be even required if you use reflexive autoloading."),Object(r.b)("h3",{id:"reflexive-autoloading"},"Reflexive Autoloading"),Object(r.b)("p",null,"This is a unique feature of this framework which allows you to place any class file into any folder by just defining the class name and the full namespace structure in the file class name."),Object(r.b)("p",null,"For example, the file ",Object(r.b)("inlineCode",{parentName:"p"},"House.Models.App.class.php")," will match the class ",Object(r.b)("strong",{parentName:"p"},"MyPlugin\\App\\Models\\House")," and can be placed into any folder. The framework will search for the file in all folders until it is found, but just in the first run, as the folder will be saved in the autoloading cache if the cache is enabled."),Object(r.b)("p",null,"In the same way, the file ",Object(r.b)("inlineCode",{parentName:"p"},"House.Models.MyModule.class.php")," will match the class ",Object(r.b)("strong",{parentName:"p"},"MyPlugin\\MyModule\\Models\\House")," and can be placed into any folder."),Object(r.b)("p",null,"To enable the reflexive autoloading you need to set to ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"true"))," the ",Object(r.b)("strong",{parentName:"p"},"reflexive")," option, inside the ",Object(r.b)("strong",{parentName:"p"},"autoloader")," section of the config file. Set it to false to disable it."),Object(r.b)("h2",{id:"autoloader-caching"},"Autoloader Caching"),Object(r.b)("p",null,"The autoloader cache will keep a record and store of all the classes and the files matching those classes. This is very useful when loading files in a reflexive way, as it dramatically reduces loading times. To clear the autoloading cache, you can set the ",Object(r.b)("strong",{parentName:"p"},"rebuild")," option to ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"true"))," in the ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/config.php")," file or just delete the ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/cache/autoload.cache.php")," file."),Object(r.b)("p",null,"To enable the audoloader caching, you need to set the option ",Object(r.b)("strong",{parentName:"p"},"cache")," in the ",Object(r.b)("strong",{parentName:"p"},"autoloader")," section of the config file to true. It's recommended to keep this option enabled for a better performance if the reflexive autoloading is also enabled."),Object(r.b)("h2",{id:"manual-configuration"},"Manual Configuration"),Object(r.b)("p",null,"It's also possible to define autoloading routes in the config file as pairs of class names or namespace structures and directories. You can set routes for specific files or for all the files matching a namespace, useful when you want to add third party libraries. See below how to do it."),Object(r.b)("p",null,"You can configure autoloading routes manually by using the ",Object(r.b)("strong",{parentName:"p"},"autoload")," array in the ",Object(r.b)("strong",{parentName:"p"},"autoloader")," section of the ",Object(r.b)("inlineCode",{parentName:"p"},"plugin/config.php")," file. You map both individual classes to files or namespaces to directories. Classes and namespaces should be always ",Object(r.b)("strong",{parentName:"p"},"absolute"),", and files and directories should be always ",Object(r.b)("strong",{parentName:"p"},"relative")," to the plugin directory."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"If you want to map a class to a file, the array element should be formatted as ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"Full\\Class\\Name => relative/path/to/class")),".")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"If you want to map a namespace to a directory, the array element should be formatted as ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"Full\\Namespace\\Route => relative/path")),"."))),Object(r.b)("p",null,"Here is an example of each case:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),"autoload [\n  'Manual\\Test' => 'app/Example/Test',\n  'ThirdParty\\Library' => 'Libraries/CustomLibrary',\n]\n")),Object(r.b)("p",null,"In the example above, the class ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"Manual\\Test"))," matches a class and the autoloader will search for it in the ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/app/Example/Test.php")," file. The namespace of the file should be ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"Manual\\Test")),", as it is what you are searching for."),Object(r.b)("p",null,"In the next example, the namespace ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("em",{parentName:"strong"},"ThirdParty\\Library"))," matches a namespace and the framework will search for all classes matching this namespace in the ",Object(r.b)("inlineCode",{parentName:"p"},"myplugin/Libraries/CustomLibrary")," directory, overwriting the default directory structure configuration."),Object(r.b)("p",null,"You can specify ",Object(r.b)("strong",{parentName:"p"},"any folder")," in the plugin, so in this case you are not limited to the main or the modules folder."),Object(r.b)("h2",{id:"autoloader-configuration"},"Autoloader Configuration"),Object(r.b)("p",null,"You can configure the autoloader using the ",Object(r.b)("strong",{parentName:"p"},"autoloader")," section of the configuration array in the ",Object(r.b)("inlineCode",{parentName:"p"},"plugin/config.php")," file."))}p.isMDXComponent=!0},135:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return m}));var n=a(0),o=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var c=o.a.createContext({}),p=function(e){var t=o.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i({},t,{},e)),a},u=function(e){var t=p(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(a),d=n,m=u["".concat(l,".").concat(d)]||u[d]||b[d]||r;return a?o.a.createElement(m,i({ref:t},c,{components:a})):o.a.createElement(m,i({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,l=new Array(r);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:n,l[1]=i;for(var c=2;c<r;c++)l[c]=a[c];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);