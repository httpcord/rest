# `httpcord-rest`

Fork of [@discordjs/rest][1] for [httpcord][2]. It's a separate repo because
many improvements made here can be used in other places, e.g. in browsers.

## Main changes

- `fetch-ponyfill` instead of `node-fetch` - browser-compatible!
- Un-private some private methods and make it more open.
- Some general shifting around of parameters to make it more predictable.

[1]: https://github.com/discordjs/discord.js/tree/main/packages/rest
[2]: https://github.com/andre4ik3/httpcord
