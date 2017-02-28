A fully pluggable server for development.


## Usage
```
## Load proxy, webpack and hmr plugins
$ dora --plugins proxy,webpack,hmr

## Load local plugin
$ dora --plugins ./local-plugin

## Load plugin with arguments
$ dora --plugins atool-build?publicPath=/foo/&verbose

## Load plugin with JSON arguments
$ dora --plugins atool-build?{"publicPath":"/foo/","verbose":true}
```
