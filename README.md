Run webpack devserver locally - without bundling and parsing (only for development):
```
"start:dev": "webpack-dev-server --env=local",
```

run tests:
```
"test": "jest",
```

Run codestyle checker with standard
```
"codestyle-check": "standard \"src/**/*.ts\" \"src/**/*.tsx\" \"__tests__/**/*.ts\" \"__tests__/**/*.tsx\"",
```

run codestyle checker with automatically fix
```
"codestyle-fix": "standard \"src/**/*.ts\" \"src/**/*.tsx\" \"__tests__/**/*.ts\" \"__tests__/**/*.tsx\" --fix",
```

Build bundles with watch mode and source map
```
"build:dev": "webpack --mode=development --watch",
```

Build bundles on production
```
"build": "webpack --mode=production"
```