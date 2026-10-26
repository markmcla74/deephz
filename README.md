<p align="center">
  <img src="deepHz192x192.png" alt="DeepHz" width="300">
</p>

# DeepHz

**Achieve a relaxed meditative state through brain entrainment**

[Launch DeepHz](https://markmcla74.github.io/deephz/)

---

# About DeepHz and Why it's Unique

## How DeepHz Works
The goal of DeepHz is to help you achieve a relaxed meditative state through a controlled auditory and visual experience. The binaural tones and unique color-ramping method work together to immerse you in a deeply calming environment. Best of all, the app is 100% free, ad-free, and designed with a strict privacy-first, zero-data-collection approach!

### Low-Fatigue "Breathing" Waveform

DeepHz uses a sine-wave modulation to create an organic "breathing" light swell. This makes the sessions substantially gentler on the eyes and far more conducive to deep, uninterrupted relaxation or sleep protocols. This is different than the jarring on/off stroboscopic "punches" found in traditional mind machines.

### Pure Sinusoidal Brightness (RGB x *sin(t)*)

By modulating display brightness in time strictly along a sine curve between full target intensity and total black ($0,0,0$), DeepHz completely eliminates the high-frequency harmonic noise native to square waves. The result is a singular, clean fundamental frequency.

### Core Mathematical Model

To avoid confusion between the flash speed and the light output, DeepHz separates its mechanics into three simple rules:

1. **The Brightness Waveform (Always a Sine Wave):** Regardless of whether the app is running a steady tone or a ramp, the screen brightness (*I(t)*) always pulses smoothly from total black (0, 0, 0) to full color using an offset sine wave (black screen when *t* = 0):

   $$I(t) = 0.5 \times \left(1 + \sin\left(\theta(t) - \frac{\pi}{2}\right)\right)$$

   This completely eliminates the harsh square-wave harmonic noise native to traditional hardware mind machines.

2. **The Flash Frequency (*f(t)*):** The speed of the flashes can either be **static** (a steady, unchanged entrainment frequency) or **dynamic** (a smooth linear ramp moving from a start frequency to an end frequency over time).

3. **Real-Time Phase Integration:** Because frequency can shift dynamically, you can't just plug a changing frequency into a static formula. Instead, DeepHz calculates phase continuously in real time:

   $$\theta(t) = 2\pi \int f(t) \, dt$$

   By accumulating phase step-by-step rather than jumping between steps, DeepHz maintains phase continuity across both steady tones and frequency ramps. This prevents the jarring visual clicks and frequency discontinuities found in other devices, including expensive commercial mind machines.
---

# Usage Instructions

<p align="center">
  <img src="configurationWithGooseneckReduced.jpg" alt="Gooseneck Configuration" width="400"><br>
  <em>Lie on a bed in a dark room, and attach your phone to a gooseneck phone holder.<br>You might need to clamp an additional piece of wood to support the gooseneck phone holder.</em>
</p>

<p align="center">
  <img src="demonstrationPicture2p2.png" alt="Recliner Demonstration" width="400"><br>
  <em>Another option is to recline in a comfortable chair, and use a virtual reality headset or a custom headset.</em>
</p>

- Be sure that your screen is bright, but not uncomfortably bright. You might have to disable the "Adaptive Brightness" setting on your phone.
- Put on your headphones, start a session, **CLOSE YOUR EYES**, and relax.
- Even though your eyes are closed, you will still perceive the changing colors.
- The binaural music and flashing lights will immerse you into a different world!

## Custom Headset

If you prefer using a headset, my custom design is more comfortable than the virtual reality headsets I tested. It doesn't extend as far outward, making it significantly less front-heavy. Another advantage of using a headset is that the room doesn't need to be dark to enjoy a session.

- **The custom headset is 3D printed:**
  * <img src="headset3DPrinted2p0.png" alt="Headset 3D Printed Parts" width="300">
  * <img src="headsetAdditionalView2p0.png" alt="Headset Additional View" width="300">
  * Find someone who can 3D print these custom parts for the main body and front plates. I use [OCpartsupply](https://www.ebay.com/itm/166598975110?itmmeta=01J2J29J7HP0WC9DGQSEX5J3PX&hash=item26ca129e86:g:eJ4AAOSwpVBlzP3H&itmprp=enc%3AAQAJAAAA0DP0jMBHs4EGwu%2B%2B%2BMgcUH%2BYUC%2Bgv%2Bvv0RQgtZi%2BUff%2BmdOUcyv3SFZkyt5aoQexqJYYG3yrpDHugrJ2djsJNQ%2FPtyAZFbbcpQLF9ljEezC0LXS%2FLwNH2an2MF4PweOIb%2FvCKRc%2FW8cVXKAurARQwq1oFoM1KyR64QYg3aJZWMiq4vNGw4QC%2FlsNTkjbrse%2BJfx9%2BN82liP%2FvSBntTCtMS5LYODmzmiqcSkxC4TECGE6QX3hdxXmMdISKvPmJR3wRp9xprDHEwv20OJrXRWCFxY%3D%7Ctkp%3ABk9SR-6jpsKUZA). [Download the .stl files](https://github.com/markmcla74/deephz/raw/main/STL/STL.zip)
  * Purchase the [Elastic Bands for Wigs](https://www.amazon.com/gp/product/B0B6CLQJCH/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) and [Foam Face Replacement Face Cover Pad](https://www.amazon.com/gp/product/B079JW16JC/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1).
  * Purchase six `#4-40 x 1"` pan head machine screws, and six nuts.
  * Purchase 3/4" wide velcro strips. You will only need to use the "hook" or "prickly" side of the velcro.
  * Follow the assembly instructions below.

### Assembly Instructions for Custom Headset

- Cut each strap in half. Feed the straps through the slots. Use the front slot for your phone, back slot for your head.
- Secure the two most outer plates with the two machine screws and nuts that protrude outward, as shown in the picture above.<br>These screws will support the phone, along with the velcro straps.
- Secure all of the plates to the main body using the remaining machine screws and nuts.
- Cut some 3/4" wide velcro strips ("hook" or "prickly" side) so that the velcro fits on the top and bottom rim of the main body.
- Attach the face cover pad to the rim of the main body. The face cover pad will stick to the velcro.
- Adjust the straps if necessary. Trim the excess strap once you are satisfied with the fit.

---

## Install DeepHz Directly from Browser

DeepHz can feel just like a native app when installed on your phone using the browser's **Add to Home Screen** or **Install App** feature.

### 📱 iPhone — Safari

Launch DeepHz. Tap the **Share** button, scroll down, and tap **Add to Home Screen**.  
[Launch DeepHz](https://markmcla74.github.io/deephz/)

### 🤖 Android — Chrome

Launch DeepHz. Tap the **three dots** in the top right, then tap **Add to Home Screen** or **Install app**.  
[Launch DeepHz](https://markmcla74.github.io/deephz/)

Once installed, DeepHz has its own icon on your home screen and can be launched like any other app.

---

## Make It Your Own

DeepHz is a **Progressive Web App**. The complete source code is available here on GitHub.  
**[Source Code →](https://github.com/markmcla74/deephz/tree/main)**

If you'd like to alter the DeepHz session timelines with different frequency flashes, colors, music, sounds, or a completely different protocol, **fork this repository and modify it as you wish.**

## 🚀 Get More Free Apps
You are welcome to download this app, or any of my other apps, from the Google Play Store. All of my apps are **free, and none of them contain ads**.

[Browse all apps by markmcla on the Google Play Store](https://play.google.com/store/search?q=markmcla&c=apps)
