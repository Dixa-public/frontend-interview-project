# Frontend dev environment guide
**_This is a guide to setup the frontend developer environment on your local machine._**

What editor and terminal you use is completely (almost) up to you - as long as these requirements are fulfilled.

***

### Editor

_If you are using VSCode, the following extensions are required:_
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

_Issue the following command in order to install the all of the VSCode extensions in one go:_

> `code --install-extension dbaeumer.vscode-eslint --install-extension editorconfig.editorconfig --install-extension stylelint.vscode-stylelint`

_If you are using the Atom editor here is a list of packages:_

You can install them all with the following command.

> `apm install Sublime-Style-Column-Selection, atom-beautify, autocomplete-modules, docblockr, editorconfig, file-icons, highlight-selected, intentions, language-babel, linter, linter-eslint, linter-stylelint, linter-ui-default, minimap, minimap-highlight-selected,pigments, pretty-json, js-hyperclick`

***

### Terminal

A recommended terminal for Mac/Linux could be "Oh My Zsh"

[Install and set up Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)

![](https://cloud.githubusercontent.com/assets/2618447/6316862/70f58fb6-ba03-11e4-82c9-c083bf9a6574.png)

If you find yourself making a lot of little mistakes when typing in GIT commands then you might want to enable autocorrect.

> `git config --global help.autocorrect 1`

#### httpie (cool command line HTTP client) 

[HTTPie](https://httpie.org/)

> `$ brew install httpie`


### GIT 

[Setting up GIT](https://help.github.com/articles/set-up-git/#setting-up-git)
