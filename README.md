# Matrix JS client example

This repository contains a simple Matrix client written in JavaScript to run in the current Node.js LTS version. It uses the Matrix JS SDK to:

- login to Matrix as an existing user using `m.login.password`
- skeleton for adding the remaining code to join a room and send a message to that room

The `develop` branch contains a full example, where the bot waits till someone replies back "hello".

## Install

- **Install Node**: Use the latest Node.js LTS (v14.15.0 as of this writing).
    - Make sure you have `npm` or `yarn` on the PATH.
- **Install depencendies**: In the root directory, run `$ npm install`
- **Add credentials**: Copy `credentials.sh` to `local.credentials.sh`, and add Matrix credentials in the new file
    - `local.credentials.sh` is added to `.gitignore`, so you don't have to worry about leaking your secrets
    - Source the file: `source local.credentials.sh`
- **Run**: From the same directory, run `$ node index.js`

---

License: Unlicense/Public domain
