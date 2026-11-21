# Xip's Games

A kid-friendly homepage for the games built on the Mac Mini.
Open it on the **home Wi-Fi** at [http://192.168.50.122:5300/](http://192.168.50.122:5300/).

The game links use the Mini’s LAN address (`192.168.50.122`). They only work
on that home network. This repo is just the hub (HTML, CSS, and screenshots).
It does not include the game source.

## Games

### Racing

| Game | Version | Port | Local URL | Status when published |
| --- | --- | --- | --- | --- |
| Cute Car Dash | Claude | 5190 | http://192.168.50.122:5190/ | Running |
| Lane Party | Grok | 5191 | http://192.168.50.122:5191/ | Running |
| Lane Party (iPad) | iPad play build | 5192 | http://192.168.50.122:5192/ | Running |

Cute Car Dash is a 3D highway runner: grab stars, transform (including into a UFO), and reach checkpoints before time runs out.

Lane Party is a related transforming-highway game (auto-drive, steer, coins and portals). The iPad play folder is a later build of the same game, tuned for iPad. No Codex source folder for this car game was found on the Mini.

### Ice Cream Sort

| Game | Version | Port | Local URL | Status when published |
| --- | --- | --- | --- | --- |
| Ice Cream Sort | Claude | 5301 | http://192.168.50.122:5301/ | Running |
| Little Scoop · Ice Cream Sort | Codex | 5302 | http://192.168.50.122:5302/ | Running |
| Ice Cream Sort | Grok | 5303 | http://192.168.50.122:5303/ | Running |

A kids’ color-sort puzzle: stack scoops of the same flavor. About 50 levels, with patterns as well as colors so color-blind kids can tell flavors apart.

### Piano Tiles Kids

| Game | Version | Port | Local URL | Status when published |
| --- | --- | --- | --- | --- |
| Tap-Tap Tunes | Claude | 5306 | http://192.168.50.122:5306/ | Running |
| Little Key Cloud | Codex | 5305 | http://192.168.50.122:5305/ | Running |
| Piano Tiles Kids | Grok | 5304 | http://192.168.50.122:5304/ | Running |

Tap the falling tiles to play 10 kid-friendly, public-domain nursery songs (Twinkle Twinkle, Happy Birthday, Jingle Bells, and more). Easy mode never really “loses”: the song waits for the missed tile. Keyboard: A S D F for the four lanes.

## How the hub is served

On the Mac Mini, the hub is served at `0.0.0.0:5300`.

`python3 -m http.server` hung without binding when started from the agent shell on this machine, so the hub (and the two Lane Party static builds) are served with a small Node static-file server that binds `0.0.0.0` on the same ports. Existing Vite games were left untouched.

## GitHub Pages

If Pages is on, the UI is at `https://xipzzz.github.io/xip-games-hub/`.
The game links still point at the home LAN, so they will not load from the public internet, and the status dots will show offline unless you are on that Wi-Fi.
