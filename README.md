# TIKI SDK (Capacitor Plugin)

The TIKI SDK for Capacitor makes it easy to create monetizable zero-party data assets. Create a digitally signed, immutable audit trail with Title, License, Payable, and Receipt records. 

Build Data Reward programs that profit you and your users. 


**Learn more at 🍍 [mytiki.com](https://mytiki.com), or jump right into the 📘 [API reference](http://tiki-sdk-capacitor.mytiki.com).**


## Installing

Install the dependency from NPM

```
npm install @mytiki/tiki-sdk-capacitor
npx cap sync
```

That's it. And yes, it's really that easy.

## Initialization

_Note: Before you get started, you will need a Publishing ID. It's free to create one; simply log in to our 🧑‍💻 [Developer Console](https://console.mytiki.com) and create a new Project._


```ts
import { instance } from '@mytiki/tiki-sdk-capacitor'

instance.initialize('<YOUR USER ID>', '<YOUR PUBLISHING ID>')
        .then((rsp) => console.log(`${rsp.address} initialized`))
```

_NOTE: Currently only iOS and Android are supported, not Web. If you'd like to use TIKI for web see our [JS SDK](https://github.com/tiki/tiki-sdk-js) or open a new Issue (it's easy to add)._

# Contributing

- Use [GitHub Issues](https://github.com/tiki-bar/tiki-sdk-capacitor/issues) to report any bugs you find or to request enhancements.
- If you'd like to get in touch with our team or other active contributors, pop in our 👾 [Discord](https://discord.gg/tiki).
- Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) if you intend to add code to this project.

## Project Structure
- `/src`: The primary TS interface for the plugin.
- `/android`: The native Android implementation.
- `/ios`: The native iOS implementation.
- `/example`: A simple example project using the plugin

## Contributors ✨
