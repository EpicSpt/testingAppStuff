# Future Ledger app

This folder turns Future Ledger into an app for Android phones, iPhones, Windows PCs and Macs. It saves your numbers on the device you use it on.

These are the kinds of install:

| | What you get | What you need |
|---|---|---|
| **Android app** (`FutureLedger.apk`) | A real app from a file you install yourself | A free GitHub account |
| **Home-screen app** (iPhone and Android) | Opens full-screen from its own icon, works offline | A free GitHub account |
| **Windows app** (`FutureLedger-Setup.exe`) | A real app with a Start menu and desktop icon | A free GitHub account |
| **Mac app** (`FutureLedger-Mac.dmg`) | A real app for your Applications folder (Apple-chip and Intel Macs) | A free GitHub account |
| Native iPhone app (optional) | A real iOS app | A Mac with Xcode 26+ and an Apple ID |

GitHub builds everything for you, so you don't need to install any developer tools.

---

## Step 1: Put this folder on GitHub (one time, about 10 minutes)

1. Sign up at **github.com** (free).
2. Tap **+** (top right) → **New repository**. Name it `future-ledger`, choose **Public**, and tap **Create repository**.
   *Public means people could see the app's code. Your numbers are never in it; they stay on your phone.*
3. On the new page, tap **uploading an existing file**. Drag in **everything inside** the unzipped `future-ledger-app` folder (not the folder itself), then tap **Commit changes**.
4. Check that a folder named **`.github`** appears in the file list. Some computers hide it, so it may not upload. If it's missing:
   **Add file** → **Create new file** → type the name `.github/workflows/build.yml` → paste in everything from `github-workflow-build.yml` → **Commit changes**.
5. Go to **Settings** → **Pages**. Under **Source**, pick **GitHub Actions**.
6. Go to the **Actions** tab. If the first run shows a red ✗ (it ran before Pages was on), open it and tap **Re-run all jobs**. Wait about 10 minutes for green ✓ marks.

Your app now lives at:
- **Home-screen app:** `https://YOUR-GITHUB-NAME.github.io/future-ledger/`
- **App files:** the **Releases** section on your repository's main page → **Latest app**. It has `FutureLedger.apk` (Android), `FutureLedger-Setup.exe` (Windows) and `FutureLedger-Mac.dmg` (Mac).

## Step 2: Install it

### Android
1. On your phone, open your repository in Chrome → **Releases** → **Latest app** → tap **FutureLedger.apk**.
2. Open the download. If asked, allow **Install unknown apps** for Chrome, then tap **Install**.
3. If Google Play Protect warns about an unknown developer, tap **More details** → **Install anyway**. You built it, so that's expected.

Prefer not to install a file? Open the home-screen app link in Chrome and tap **⋮** → **Install app** (or **Add to Home screen**).

### iPhone
1. Open the home-screen app link in **Safari** (it has to be Safari).
2. Tap the **Share** button → **Add to Home Screen** → **Add**.
3. Open Future Ledger from its new icon. It runs full-screen and works without internet after the first open.

### Windows
1. Download **FutureLedger-Setup.exe** from **Latest app** and double-click it.
2. If Windows says **Windows protected your PC**, click **More info** → **Run anyway**. Windows shows this for apps that aren't signed with a paid certificate.
3. It installs in a few seconds and opens. Next time, open **Future Ledger** from the Start menu or the desktop icon.

To remove it: **Settings** → **Apps** → **Installed apps** → **Future Ledger** → **Uninstall**.

### Mac
1. Download **FutureLedger-Mac.dmg** from **Latest app** and double-click it.
2. Drag **Future Ledger** into the **Applications** folder.
3. Open Future Ledger from Applications. The first time, the Mac says Apple could not verify it. Click **Done** (or **OK**).
4. Open **System Settings** → **Privacy & Security**, scroll down, and click **Open Anyway** next to Future Ledger. Click **Open Anyway** again and enter your Mac password. After that it opens normally.

The Mac shows this for apps that aren't checked by Apple, which needs the Apple Developer Program ($99/year).

### Sending it to other people
Send them the link to your **Latest app** release: `https://github.com/YOUR-GITHUB-NAME/future-ledger/releases/latest`. They download the file for their device and follow the steps above. The Windows and Mac files are over 100 MB, which is too big for most email, so a link (or Google Drive, Dropbox or WeTransfer) works better.

Everyone gets their own blank plan. Numbers are saved on each person's own computer or phone and are never shared.

## Step 3: Bring your numbers over

The version on claude.ai saves to your Claude account, and the app saves on your device, so move your plan once:

1. Open Future Ledger on claude.ai, scroll to the bottom, and tap **Copy my plan**.
2. Send that text to your phone or computer (for example, email it to yourself or paste it into a note).
3. In the app, scroll to the bottom, tap **Paste a plan**, paste it, and tap **Load this plan**.

## Updating the app later

Replace `www/index.html` on GitHub with the new version (open it → pencil icon, or upload the file again). GitHub rebuilds every version automatically.
- Android: download and install the new `FutureLedger.apk` over the old one. Your numbers stay.
- iPhone: close and reopen the app while online.
- Windows: download and run the new `FutureLedger-Setup.exe`. Your numbers stay.
- Mac: open the new `FutureLedger-Mac.dmg`, drag Future Ledger into Applications, and choose **Replace**. Your numbers stay.

To show a new version number in the Windows and Mac apps, also change `"version"` in `desktop/package.json` (for example to `1.0.1`).

---

## Optional: a native iPhone app (needs a Mac)

Apple only allows building iPhone apps on a Mac.

1. Install **Xcode** (26 or newer) from the Mac App Store and **Node.js** 22 or newer from nodejs.org.
2. In Terminal, inside this folder, run:
   ```
   npm install
   npm run ios
   npx cap open ios
   ```
3. In Xcode, click **App** → **Signing & Capabilities** → choose your Apple ID as the **Team**.
4. Plug in your iPhone, select it at the top of Xcode, and press **▶︎ Run**.
   On the iPhone, trust yourself under **Settings → General → VPN & Device Management**.

With a free Apple ID the app stops opening after 7 days and has to be run from Xcode again. The Apple Developer Program ($99/year) removes that limit and lets you publish to TestFlight or the App Store.

## Optional: publishing to Google Play

Needs a Google Play developer account ($25 one time) and a release build signed with your own private key, instead of the shared one in `signing/`.

## Optional: building the Windows or Mac app on your own computer

GitHub builds both for you, but you can also build them yourself. A Windows PC can only build the Windows app, and only a Mac can build the Mac app.

1. Install **Node.js** 22 or newer from nodejs.org.
2. In a terminal, inside the `desktop` folder, run:
   ```
   npm install
   npm run dist
   ```
3. The finished file appears in `desktop/dist/`.

## What's in this folder

- `www/` – the app itself (the same page as on claude.ai, plus an icon and offline support)
- `assets/` – icon and splash screen artwork for the Android and iPhone apps
- `capacitor.config.json`, `package.json` – settings that wrap the page as a native app ([Capacitor](https://capacitorjs.com))
- `desktop/` – settings and icons that wrap the page as a Windows and Mac app ([Electron](https://www.electronjs.org))
- `.github/workflows/build.yml` – tells GitHub how to build and publish everything (`github-workflow-build.yml` is a visible copy)
- `signing/debug.keystore` – a basic signing key so each new Android build installs over the last one. It's fine for personal use, not for Google Play.
