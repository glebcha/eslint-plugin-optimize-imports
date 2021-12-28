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
        "optimize-imports/import-react": "warn",
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

## Optimizations

Result of `optimize-react` when possible:

```javascript
import * as React from 'react';
```

> :warning: **[React team will drop default imports support in future versions](https://twitter.com/dan_abramov/status/1308739731551858689?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1308739731551858689%7Ctwgr%5E%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fepicreact.dev%2Fimporting-react-through-the-ages%2F)**

Result of `optimize-quotes` when possible:

```javascript
// Before
import { Fragment } from "react";

// After
import { Fragment } from 'react';
```

Result of `optimize-breaks` when possible:

```javascript
// Before
import {
    Fragment as ReactFragment, useState, 
    useEffect, useReducer} from 'react';

// After
import {
    Fragment as ReactFragment, 
    useState, 
    useEffect, 
    useReducer
} from 'react';
```



## License

MIT
