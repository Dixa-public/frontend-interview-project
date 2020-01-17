### Editor

_The following extensions are recommended:_
* [EditorConfig](http://editorconfig.org/)
* [ESLinter](https://eslint.org/) tool
* [Prettier](https://prettier.io/)

You can fix your code styling on save by adding the following to your `settings.json`:
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"[scss]": {
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

