# eslint-plugin-optimize-imports

## Installation

```
npm i -D eslint eslint-plugin-optimize-imports
```

## Usage

Add `optimize-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "optimize-imports"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "optimize-imports/import-quotes": "warn",
        "optimize-imports/import-breaks": "warn"
    }
}
```

Default options for `optimize-quotes` rule:

```json
{
    "rules": {
        "optimize-imports/optimize-quotes": ["warn", {
            "single": true,
            "exclude": []
        }]
    }
}
```

Default options for `optimize-breaks` rule:

```json
{
    "rules": {
        "optimize-imports/optimize-breaks": ["warn", {
            "afterCount": 2,
            "symbol": "tab",
            "symbolsCount": 1
        }]
    }
}
```

## License

MIT
