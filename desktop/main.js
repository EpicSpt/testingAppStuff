// Opens Future Ledger (the page in www/) in its own Windows or Mac window.
const { app, BrowserWindow, Menu, nativeTheme, shell } = require("electron");
const path = require("node:path");

// The built app carries its own copy of www/; `npm start` uses the one next to this folder.
const page = app.isPackaged
  ? path.join(__dirname, "www", "index.html")
  : path.join(__dirname, "..", "www", "index.html");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 380,
    minHeight: 500,
    title: "Future Ledger",
    // Same colour as the page, so the window doesn't flash white while it opens.
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#0E141C" : "#F3F5F8",
    autoHideMenuBar: true,
  });
  win.on("closed", () => { win = null; });

  // Links to other websites open in the normal browser, not inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (url.startsWith("file:")) return;
    e.preventDefault();
    if (/^https?:/.test(url)) shell.openExternal(url);
  });

  win.loadFile(page);
}

// Mac needs an Edit menu for copy and paste shortcuts. On Windows the menu stays hidden until Alt is pressed.
Menu.setApplicationMenu(Menu.buildFromTemplate([
  { role: process.platform === "darwin" ? "appMenu" : "fileMenu" },
  { role: "editMenu" },
  { label: "View", submenu: [
    { role: "resetZoom" }, { role: "zoomIn" }, { role: "zoomOut" },
    { type: "separator" }, { role: "togglefullscreen" },
  ] },
  { role: "windowMenu" },
]));

// One copy at a time, so two windows never overwrite each other's numbers.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!win) return createWindow();
    if (win.isMinimized()) win.restore();
    win.focus();
  });
  app.whenReady().then(createWindow);
  app.on("activate", () => { if (!win) createWindow(); });
  app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
}
