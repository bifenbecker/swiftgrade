## Swiftgrade Web (React.js)

# How to install

1. clone the repository
2. create .env file according to example
3. install nvm if needed (https://github.com/creationix/nvm#installation)
4. install node via nvm: `nvm install stable`
5. install yarn globally: `npm install -g yarn`
6. install dependencies: `yarn install`
7. start dev server: `yarn start`

### To setup pre-commit hooks

1. copy pre-commit hook `cp pre-commit .git/hooks/pre-commit`
2. start project `yarn start`

### Bug with xcode on MacOS ([Source](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d))
1. `xcode-select --print-path`
2. `sudo rm -r -f /Library/Developer/CommandLineTools`
3. `xcode-select --install`
