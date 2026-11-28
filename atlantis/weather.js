// Phase 2 (2026-10-04): adjustable weather — Sunny / Cloudy / Rain / Sunset + time of day.
// One call (apply) sets the sky, sun, haze ("distant light"), clouds, rain, sea colour AND the light that
// comes into the rooms (sun direction/colour, sky light, window light, exposure), so inside and outside agree.
import * as THREE from 'three';

const lin = (hex) => new THREE.Color(hex);   // THREE.Color(hex) converts sRGB hex to linear
export const PRESETS = {
  sunny:  { label: '☀️ Sunny',  time: 14.3, turbidity: 7,  rayleigh: 1.3, mie: 0.006, mieG: 0.86, cloud: 0.22, cloudColor: 0xffffff,
            density: 0.00010, haze: 0xe4edf4, sunHaze: 0xfff3dc, sunColor: 0xfff1dc, sunInt: 2.6, hemiSky: 0xdfe9ff, hemiGround: 0x8a8670, hemiInt: 0.85,
            env: 0.55, win: 0xeef4ff, winInt: 2.4, exposure: 0.88, rain: 0, wet: 0, gain: 2.6, skyGain: 7.0, sea: 0x1fb2b8, skyRefl: 0x7fb2cf },
  cloudy: { label: '⛅ Cloudy', time: 13.0, turbidity: 16, rayleigh: 2.6, mie: 0.012, mieG: 0.7, cloud: 0.78, cloudColor: 0xeef0f2,
            density: 0.00055, haze: 0xc9cfd5, sunHaze: 0xdadde0, sunColor: 0xe9edf2, sunInt: 0.55, hemiSky: 0xe3e8ee, hemiGround: 0x77786e, hemiInt: 1.15,
            env: 0.65, win: 0xe8eef4, winInt: 2.1, exposure: 0.98, rain: 0, wet: 0.1, gain: 1.9, skyGain: 5.0, sea: 0x3f7f86, skyRefl: 0xc6ced6 },
  rain:   { label: '🌧 Rain',   time: 15.5, turbidity: 20, rayleigh: 3.2, mie: 0.02, mieG: 0.6, cloud: 0.97, cloudColor: 0x9aa2ab,
            density: 0.00120, haze: 0x9aa4ae, sunHaze: 0xa8b0b8, sunColor: 0xc8d2dc, sunInt: 0.12, hemiSky: 0xb8c4d2, hemiGround: 0x55585a, hemiInt: 0.95,
            env: 0.55, win: 0xd2dbe5, winInt: 1.5, exposure: 1.05, rain: 1, wet: 0.8, gain: 1.4, skyGain: 3.0, sea: 0x3a5f66, skyRefl: 0x8d98a2 },
  sunset: { label: '🌇 Sunset', time: 18.6, turbidity: 9,  rayleigh: 2.9, mie: 0.011, mieG: 0.9, cloud: 0.35, cloudColor: 0xffc69a,
            density: 0.00080, haze: 0xf0bb8c, sunHaze: 0xffa060, sunColor: 0xffb070, sunInt: 2.2, hemiSky: 0xffd2a8, hemiGround: 0x5e4c40, hemiInt: 0.75,
            env: 0.45, win: 0xffd4a8, winInt: 2.2, exposure: 0.95, rain: 0, wet: 0, gain: 2.4, skyGain: 6.0, sea: 0x2b6f86, skyRefl: 0xf0b890 },
};

// Sun path for Melaka (2° N). Orientation from the brochure site plan + satellite: the sea face (Towers B & C,
// our bedroom side = local +Z) looks roughly south-west, so in the outdoor group's local frame
// east = (-0.707, 0, -0.707) and north = (0.707, 0, -0.707). The sun rises over the city and sets over the sea.
const EAST = new THREE.Vector3(-Math.SQRT1_2, 0, -Math.SQRT1_2), NORTH = new THREE.Vector3(Math.SQRT1_2, 0, -Math.SQRT1_2);
export function sunDirection(hours) {
  const phi = THREE.MathUtils.clamp(Math.PI * (hours - 6) / 12, 0.06, Math.PI - 0.06);
  return EAST.clone().multiplyScalar(Math.cos(phi)).add(new THREE.Vector3(0, Math.sin(phi) * 0.95, 0)).addScaledVector(NORTH, 0.28).normalize();
}

export function createWeather({ host, renderer, scene, sun, hemi, fill, outdoor, getWindowLights, root }) {
  const state = { preset: 'sunny', time: PRESETS.sunny.time };
  const target = new THREE.Vector3();

  function apply() {
    const P = PRESETS[state.preset], U = outdoor.uniforms, sky = outdoor.sky.material.uniforms;
    // Sun direction: local (east/north) -> world, following the Flip mirror of the plan.
    const local = sunDirection(state.time);
    const world = local.clone(); world.x *= Math.sign(root.scale.x) || 1;   // only X mirrors with Flip; north (+Z) is unchanged
    const elev = Math.max(0, local.y);
    const low = 1 - THREE.MathUtils.smoothstep(elev, 0.05, 0.45);                              // warmer + weaker near the horizon
    const sunCol = lin(P.sunColor).lerp(lin(0xff9a50), state.preset === 'sunset' ? 0 : low * 0.6);

    sky.sunPosition.value.copy(world).multiplyScalar(1000);
    sky.turbidity.value = P.turbidity; sky.rayleigh.value = P.rayleigh; sky.mieCoefficient.value = P.mie; sky.mieDirectionalG.value = P.mieG;
    U.uSunDir.value.copy(world);
    U.uHaze.value.copy(lin(P.haze)); U.uSunHaze.value.copy(lin(P.sunHaze));
    U.uDensity.value = P.density; U.uCloud.value = P.cloud; U.uCloudColor.value.copy(lin(P.cloudColor));
    U.uGain.value = P.gain * (0.6 + 0.4 * Math.min(1, elev * 2.5));   // keep the land readable when the sun is low
    U.uSkyGain.value = P.skyGain;
    U.uRain.value = P.rain; U.uWet.value = P.wet; U.uSea.value.copy(lin(P.sea)); U.uSkyRefl.value.copy(lin(P.skyRefl));
    U.uSunColor.value.copy(sunCol).multiplyScalar(P.sunInt * (0.4 + 0.6 * Math.min(1, elev * 2.5)));

    // Inside: the sun now really comes in through the windows (walls/ceiling cast shadows).
    sun.color.copy(sunCol); sun.intensity = P.sunInt * (0.35 + 0.65 * Math.min(1, elev * 2.2));
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root.getObjectByName('Floor') || root);
    box.getCenter(target); sun.target.position.copy(target); sun.position.copy(target).addScaledVector(world, 25);
    sun.target.updateMatrixWorld();
    hemi.color.setHex(P.hemiSky); hemi.groundColor.setHex(P.hemiGround); hemi.intensity = P.hemiInt;
    if (fill) fill.intensity = 0.35 * P.hemiInt;
    scene.environmentIntensity = P.env;
    for (const l of getWindowLights()?.lights || []) { l.color.setHex(P.win); l.intensity = P.winInt * (state.preset === 'rain' ? 1 : 0.8 + 0.2 * Math.min(1, elev * 2)); }
    renderer.toneMappingExposure = P.exposure;
    host.dataset.weather = JSON.stringify({ preset: state.preset, time: state.time, sunElevationDeg: +(Math.asin(local.y) * 180 / Math.PI).toFixed(1) });
    syncPanel();
  }

  // ---- Panel ----
  const panel = document.createElement('div'); panel.id = 'weather-panel'; panel.className = 'weather-panel';
  const presetRow = document.createElement('label'); presetRow.className = 'sp-field'; presetRow.htmlFor = 'setting-weather';
  const presetLabel = document.createElement('span'); presetLabel.textContent = 'Weather';
  const presetSelect = document.createElement('select'); presetSelect.id = 'setting-weather';
  for (const [id, text] of [['sunny','Sunny'],['cloudy','Cloudy'],['rain','Rain'],['sunset','Sunset']]) presetSelect.add(new Option(text, id));
  presetSelect.addEventListener('change', () => { state.preset = presetSelect.value; state.time = PRESETS[state.preset].time; apply(); });
  presetRow.append(presetLabel, presetSelect);
  const timeRow = document.createElement('label'); timeRow.className = 'sp-field'; timeRow.htmlFor = 'setting-time';
  const timeLabel = document.createElement('span'); timeLabel.textContent = 'Time';
  const timeSelect = document.createElement('select'); timeSelect.id = 'setting-time';
  const timeString = time => { const minutes = Math.round(time * 60); return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`; };
  const times = [...new Set([...Array.from({length:26}, (_, i) => 6.5 + i * .5), ...Object.values(PRESETS).map(p => p.time)])].sort((a,b) => a-b);
  for (const time of times) timeSelect.add(new Option(timeString(time), String(time)));
  timeSelect.addEventListener('change', () => { state.time = +timeSelect.value; apply(); });
  for (const ev of ['pointerdown', 'keydown']) panel.addEventListener(ev, (e) => e.stopPropagation());
  timeRow.append(timeLabel, timeSelect);
  panel.append(presetRow, timeRow); host.appendChild(panel);
  function syncPanel() {
    presetSelect.value = state.preset;
    if (![...timeSelect.options].some(o => o.value === String(state.time))) timeSelect.add(new Option(timeString(state.time), String(state.time)));
    timeSelect.value = String(state.time);
  }

  apply();
  return { state, apply, panel, set(preset, time) { state.preset = preset; state.time = time ?? PRESETS[preset].time; apply(); } };
}
