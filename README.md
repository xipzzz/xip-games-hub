# Xip's Games

A kid-friendly homepage for games built on the Mac Mini.

**Play online:** [https://xipzzz.github.io/xip-games-hub/](https://xipzzz.github.io/xip-games-hub/)

On the **home Wi-Fi**, the same hub is also at [http://192.168.50.122:5300/](http://192.168.50.122:5300/).
Each card opens the public game. A “Home Wi-Fi” link under the card opens the live version on the Mini, if that server is running.

This repository holds the hub and a production build of every game. It does not include game source, `node_modules`, or secrets.

## Games

### Racing

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Cute Car Dash | Claude | [car-dash](https://xipzzz.github.io/xip-games-hub/car-dash/) | http://192.168.50.122:5190/ |
| Lane Party | Grok | [lane-party](https://xipzzz.github.io/xip-games-hub/lane-party/) | http://192.168.50.122:5191/ |
| Lane Party (iPad) | iPad play build | [lane-party-ipad](https://xipzzz.github.io/xip-games-hub/lane-party-ipad/) | http://192.168.50.122:5192/ |

Cute Car Dash is a 3D highway runner: grab stars, transform (including into a UFO), and reach checkpoints before time runs out.

Lane Party is a related transforming-highway game (auto-drive, steer, coins and portals). The iPad play folder is a later build of the same game, tuned for iPad. No Codex source folder for this car game was found on the Mini.

### Ice Cream Sort

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Ice Cream Sort | Claude | [icecream-claude](https://xipzzz.github.io/xip-games-hub/icecream-claude/) | http://192.168.50.122:5301/ |
| Little Scoop · Ice Cream Sort | Codex | [icecream-codex](https://xipzzz.github.io/xip-games-hub/icecream-codex/) | http://192.168.50.122:5302/ |
| Ice Cream Sort | Grok | [icecream-grok](https://xipzzz.github.io/xip-games-hub/icecream-grok/) | http://192.168.50.122:5303/ |

A kids’ color-sort puzzle: stack scoops of the same flavor. About 50 levels, with patterns as well as colors so color-blind kids can tell flavors apart.

### Piano Tiles Kids

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Tap-Tap Tunes | Claude | [piano-claude](https://xipzzz.github.io/xip-games-hub/piano-claude/) | http://192.168.50.122:5306/ |
| Little Key Cloud | Codex | [piano-codex](https://xipzzz.github.io/xip-games-hub/piano-codex/) | http://192.168.50.122:5305/ |
| Piano Tiles Kids | Grok | [piano-grok](https://xipzzz.github.io/xip-games-hub/piano-grok/) | http://192.168.50.122:5304/ |

Tap the falling tiles to play 10 kid-friendly, public-domain nursery songs (Twinkle Twinkle, Happy Birthday, Jingle Bells, and more). Easy mode never really “loses”: the song waits for the missed tile. Keyboard: A S D F for the four lanes.

### Island Builders (simple Catan)

A simplified island-building board game for about age 6 (no Catan name or art). Build roads and houses, and collect stars.

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Sunny Isle | Claude | [island-claude](https://xipzzz.github.io/xip-games-hub/island-claude/) | http://192.168.50.122:5309/ |
| Island Builders | Codex | [island-codex](https://xipzzz.github.io/xip-games-hub/island-codex/) | http://192.168.50.122:5308/ |
| Island Builders | Grok | [island-grok](https://xipzzz.github.io/xip-games-hub/island-grok/) | http://192.168.50.122:5307/ |

### Atlantis 13th Floor

A walkable 3D model of the Atlantis 13th-floor unit, made with Grok.

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Atlantis 13th Floor | Grok · Grok Bot | [atlantis](https://xipzzz.github.io/xip-games-hub/atlantis/) | http://192.168.50.122:8766/ |

### Feeling Free · cycling

A 3D cycling scene with a person riding a bike (X-post recreation).

| Game | Version | Pages | Home Wi-Fi |
| --- | --- | --- | --- |
| Feeling Free | Claude Code · claude-opus-5-5 | [feeling-free-claude](https://xipzzz.github.io/xip-games-hub/feeling-free-claude/) | http://192.168.50.122:5318/ |
| Feeling Free | Codex · gpt-6.1-sol | [feeling-free-codex](https://xipzzz.github.io/xip-games-hub/feeling-free-codex/) | http://192.168.50.122:5317/ |
| Feeling Free | Grok · Grok Bot | [feeling-free-grok](https://xipzzz.github.io/xip-games-hub/feeling-free-grok/) | http://192.168.50.122:5316/ |

## How the hub is served at home

On the Mac Mini, the hub is served at `0.0.0.0:5300` from this folder. The game servers on ports 5190–5318 and the Atlantis viewer on port 8766 are separate. The Home Wi-Fi links point at those servers.

## GitHub Pages

Pages is served from the `main` branch, at the repository root, at `https://xipzzz.github.io/xip-games-hub/`. Game builds use relative asset paths, so they work on Pages and when this folder is served locally.
