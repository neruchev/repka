# Repka
Private git-repository as npm-dependency

## Installation

`npm install repka --save`

## Usage

### Example of a folder structure:

```
/some_folder
 |
 |-/my_project
 |  |-/node_modules
 |  |-package.json
 |  |-repka.json
 |  |-index.js
 |
 |-/my_first_repo
 |  |-/node_modules
 |  |-package.json
 |
 |-/second_repo
    |-/node_modules
    |-package.json

```

### Configuration example:

`my_project/package.json`:

```json
{
  ...
  "scripts": {
    "add-repository:production": "repka --production",
    "add-repository:development": "repka --development",
    ...
  },
  ...
}
```

`my_project/repka.json`:

```json
{
  "first-repository": {
    "devPath": "../",
    "devAliase": "my_first_repo",
    "link": "git+ssh://git@github.com/username/first-repository.git",
    "branches": {
      "master": "master",
      "development": "dev"
    }
  },
  "second-repository": {
    "devPath": "../",
    "devAliase": "second_repo",
    "link": "git+ssh://git@github.com/username/second-repository.git",
    "branches": {
      "master": "master",
      "development": "develop"
    }
  }
}
```

Developers can create a local config `repka.local.json` that will override the `repka.json`

`my_project/.gitignore`:

```
repka.local.json
```

`my_project/index.js` (for example):

```js
import first from 'first-repository';
import second from 'second-repository';

...
```
