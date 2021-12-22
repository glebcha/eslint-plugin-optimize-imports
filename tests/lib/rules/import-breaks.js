const rule = require('../../../lib/rules/import-breaks');
const { RuleTester } = require('eslint');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
            jsx: true,
        },
	}
});

const ruleTester = new RuleTester();

ruleTester.run('import breaks test', rule, {
    valid: [
		{
			code: `import react, {
				Fragment,
				useState,
				useEffect,
				useReducer
} from 'react';`,
			options: [],
		},
    ],
    invalid: [
		{
			code: `import react, {Fragment, useState, useEffect, useReducer} from "react";`,
			output: `import react, {
				Fragment,
				useState,
				useEffect,
				useReducer
} from "react";`,
			options: [{ afterCount: 3 }],
			errors: ['Consider to place every import specifier on new line after count of 3 reached']
		},
		{
			code: `import {
Fragment, useState, useEffect, useReducer
} from "react";`,
			output: `import {
  Fragment,
  useState,
  useEffect,
  useReducer
} from "react";`,
			options: [{ symbol: 'space', symbolsCount: 2 }],
			errors: ['Consider to place every import specifier on new line after count of 2 reached']
		}
    ]
});