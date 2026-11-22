/* Stock GaggiMate screens beside their BetterMate counterparts. Both sides are captures of real firmware in the
   simulator: stock from upstream v1.9.0, BetterMate from its own display and web UI. Every "Still there" item is
   checked against stock-screens.md, the parity inventory, and the BetterMate display source. */

export type Shot = { src: string; alt: string };
export type Pair = {
  id: string;
  title: string;
  intro: string;
  stock: Shot;
  bettermate: Shot;
  changed: string[];
  kept: string[];
};

const stock = (n: string, alt: string): Shot => ({ src: `/compare/stock/display/${n}.webp`, alt });
const bm = (n: string, alt: string): Shot => ({ src: `/compare/bettermate/display/${n}.webp`, alt });

export const DISPLAY: Pair[] = [
  {
    id: "standby",
    title: "Standby",
    intro: "What the machine shows while it waits for you.",
    stock: stock("standby", "Stock Standby: the GaggiMate logo, the time, Wi-Fi and Bluetooth icons and a tap glyph."),
    bettermate: bm("standby", "BetterMate Standby: the date, a large clock, and the line Boiler off · 21°, inside a faint ring."),
    changed: [
      "The clock is the one large reading. The date sits above it and one line below says what happens next: Boiler off · 21°, or Wakes at 06:30.",
      "A faint ring shows how much heat the boiler still holds, so you can tell at a glance whether it is still warm.",
      "While the machine connects, updates or autotunes, a small comet runs round the ring instead of a sentence.",
      "On AMOLED panels, after 30 s only the clock stays lit, and it moves 2 px each minute to protect the screen.",
    ],
    kept: [
      "Tap to wake.",
      "Errors, updates, autotune and a version mismatch still force Standby, and the reason is still shown.",
      "An update that is waiting shows its glyph at the top of the ring.",
    ],
  },
  {
    id: "brew",
    title: "Brew",
    intro: "The screen you see most: the profile is chosen and the boiler is heating.",
    stock: stock("brew", "Stock Brew: temperature and pressure text at the top, the profile name with list and gear buttons, a row of warning icons and a play button, inside a full ring of ticks."),
    bettermate: bm("brew", "BetterMate Brew: a warning glyph at the top, HEATING TO 93°, a large 34 °C, the profile name with a chevron, and a START pill."),
    changed: [
      "Boiler temperature is the one large reading. HEATING TO 93° says in words what the stock screen said with a blinking icon.",
      "Up to six warning icons become one glyph at the top of the ring. Tapping it lists each warning in a sentence.",
      "The play icon is now a labelled START pill.",
      "Pressure stays on the rim as ticks, and only becomes a number while a shot is brewing.",
      "Tap the profile name to change profile. The separate list and gear buttons are gone.",
    ],
    kept: [
      "Hold START to flush. The flush ends when you lift your finger, as before.",
      "With a scale connected, its weight shows under the profile; tap that line to tare.",
      "Starting with an error-level warning still asks first: Start anyway?",
      "Target notches on both halves of the ring, and a single temperature ring without a pressure sensor.",
    ],
  },
  {
    id: "adjust",
    title: "Adjust a profile",
    intro: "Changing the temperature, pressure or time of the current profile without leaving the machine.",
    stock: stock("brew-adjust", "Stock Adjust Profile: rows of minus and plus for temperature and time, and three icon buttons for save, accept and save as new."),
    bettermate: bm("adjust", "BetterMate Adjust: the profile name, a TEMP · BAR · TIME row, a large 93 between minus and plus, and a DONE pill."),
    changed: [
      "One value at a time, large, between 60 px minus and plus discs. A row above picks which: TEMP, BAR or TIME.",
      "The title says UNSAVED as soon as anything has changed.",
      "Three unlabelled disk icons become a sheet with three named choices: SAVE, SAVE AS NEW and USE ONCE.",
    ],
    kept: [
      "All three outcomes: save, save as a new profile, or use the change once without saving.",
      "Removing a profile's weight target, so the shot stops by time.",
      "Minus and plus repeat while you hold them.",
    ],
  },
  {
    id: "shot",
    title: "Pulling a shot",
    intro: "The shot is running.",
    stock: stock("status-brewing", "Stock shot screen: target temperature and time, the phase name, a progress bar with 6.0s / 28.0s, the elapsed 0:05 and a pause button."),
    bettermate: bm("shot-pulling", "BetterMate shot screen: RAMP TO 9 BAR as the label, a large 0:20, phase bars, 9.0 BAR and 21.7 / 36 G, and a STOP pill."),
    changed: [
      "Elapsed time is the large reading. The running phase names itself at the top: RAMP TO 9 BAR.",
      "One bar per phase replaces a single progress bar, so you can see where you are in the whole shot.",
      "Pressure and weight become two readings you can see from across the kitchen. Without a scale the second reading is boiler temperature.",
      "The pressure ring gets a notch at the target of the phase that is running.",
    ],
    kept: ["STOP ends the shot at any moment.", "The shot ends by itself when the profile finishes."],
  },
  {
    id: "shot-complete",
    title: "Shot complete",
    intro: "The pump has stopped. What did you get?",
    stock: stock("status-finished", "Stock finished screen: Finished, the elapsed 0:28 and a check button."),
    bettermate: bm("shot-complete", "BetterMate finished screen: SHOT COMPLETE, a large 0:29, 36.4 grams, a 1:2.0 ratio, and a DONE pill."),
    changed: [
      "The final time is the large reading, with the yield and the brew ratio under it.",
      "The ratio appears when the profile has a dose.",
    ],
    kept: ["The screen waits for DONE, so the result stays until you have read it.", "The final weight, when a scale is connected."],
  },
  {
    id: "menu",
    title: "Menu",
    intro: "Moving between modes.",
    stock: stock("menu", "Stock menu: large unlabelled icons for brew, steam, water and grind on a ring, an info button in the middle and a power icon at the bottom."),
    bettermate: bm("menu", "BetterMate menu: labelled discs for Brew, Steam, Water, Grind and Info around a power disc, with Brew selected in white."),
    changed: [
      "Every mode disc carries its name.",
      "The mode you are in is drawn as a filled disc, so you always know where you are.",
      "Standby moves to the power disc at the centre.",
    ],
    kept: ["Grind appears only when a grinder is configured.", "Information is one tap away.", "Warnings still show at the top."],
  },
  {
    id: "steam",
    title: "Steam",
    intro: "Heating up for milk.",
    stock: stock("steam-heating", "Stock steam screen: the title Steam, a thermometer icon and a small 145°C between minus and plus."),
    bettermate: bm("steam-heating", "BetterMate steam screen: STEAM, the live 128° in orange, a large target of 145 between minus and plus, and the word Heating."),
    changed: [
      "The target is the large reading between minus and plus. The live temperature sits above it and turns orange while heating.",
      "A status line says what the boiler is doing: Heating, Ready to steam, or Paused after 10 minutes.",
      "The ring fills towards a notch at the target.",
    ],
    kept: [
      "No start button: as on stock, the controller starts steaming within 5° of the target.",
      "The 10 minute safety limit, set by the controller.",
    ],
  },
  {
    id: "water",
    title: "Hot water",
    intro: "Water from the group or the wand.",
    stock: stock("water", "Stock water screen: the title Water, a thermometer icon, 80°C between minus and plus, and a play button."),
    bettermate: bm("water", "BetterMate water screen: WATER, 80°, a large target of 80 between minus and plus, and a START pill."),
    changed: [
      "The same layout as Steam, with a START pill that turns into STOP.",
      "The millilitres pumped show while it runs, when the controller reports them.",
    ],
    kept: ["The target temperature, saved as the water temperature setting.", "The 2 minute safety limit."],
  },
  {
    id: "grind",
    title: "Grind",
    intro: "For machines with a grinder wired to the controller.",
    stock: stock("grind", "Stock grind screen: the title Grind, a clock icon, 0:25 between minus and plus, and a play button."),
    bettermate: bm("grind", "BetterMate grind screen: a TIME · WEIGHT row, 0.0 G · TARE, a large 0:25 between minus and plus, and a START pill."),
    changed: [
      "Grinding by time or by weight is a labelled row, not a tap on an icon.",
      "The ring shows progress against the target while it grinds.",
      "Minus, plus and the row step aside while grinding, and the elapsed time takes their place.",
    ],
    kept: ["Grind by weight with a scale, falling back to time when the scale drops out.", "Tare from the weight line."],
  },
  {
    id: "profiles",
    title: "Choosing a profile",
    intro: "Swapping the profile you are about to pull.",
    stock: stock("profile", "Stock profile screen: Current profile, Default, its temperature and weight, 1 phases, 1 steps, arrows at the sides and a check button."),
    bettermate: bm("profiles", "BetterMate profile screen: PROFILE 1 / 5, Classic, three fact cards for 93°, 36 g and 28 s, page dots, a SELECT pill and an edit disc."),
    changed: [
      "The profile's name is large, with its temperature, yield and time as three cards under it.",
      "Page dots show where you are among your favourites.",
      "A pencil disc beside SELECT opens Adjust for that profile.",
    ],
    kept: ["Swipe, or use the arrows at the edges, to move between favourites.", "The current profile comes first."],
  },
  {
    id: "info",
    title: "Information",
    intro: "Finding the web app from your phone.",
    stock: stock("info", "Stock info screen: the version string, the network name and IP address cut off at the edges, and a QR code."),
    bettermate: bm("info", "BetterMate information screen: CONNECTED TO and the network name, a QR code on a white card, the address, SCAN TO OPEN, and ABOUT."),
    changed: [
      "The QR code sits on a white card in every theme, so phone cameras read it easily.",
      "The network name and address no longer run off the edge of the circle.",
      "Version details move behind ABOUT.",
    ],
    kept: ["The QR code in both network modes: open the web app, or join the machine's own Wi-Fi."],
  },
];

const stockWeb = (n: string, alt: string): Shot => ({ src: `/compare/stock/web/${n}.webp`, alt });
const bmWeb = (n: string, alt: string): Shot => ({ src: `/compare/bettermate/web/${n}.webp`, alt });

export const WEB: Pair[] = [
  {
    id: "dashboard",
    title: "Dashboard on a desktop",
    intro: "The web app the machine serves, at full width.",
    stock: stockWeb("dashboard-desktop", "Stock GaggiMate dashboard: a sidebar of six pages, icon-only mode tabs, a profile chart, quick-select cards, six reading cells, and a large live chart."),
    bettermate: bmWeb("dashboard-desktop", "BetterMate dashboard: a sidebar of four pages, a dial with the boiler at 88°, a blue START SHOT banner, water tank and last shot tiles, a profile picker, recent shots, and a floating mode bar."),
    changed: [
      "A dial draws the boiler exactly as the machine's own screen does, with a word for its state: READY, HEATING.",
      "The next thing you can do is one blue banner, START SHOT, with what it will do under it: Stops after 30 s.",
      "Warnings are named chips (FLUSH RECOMMENDED), not colours you have to decode.",
      "Modes move to one labelled bar at the bottom. While a shot runs the other modes lock and say why.",
      "Six pages become four. Analyzer and Statistics now open from History.",
    ],
    kept: [
      "Advanced view brings back every reading with its target, the live chart and the profile curve.",
      "The REST and WebSocket API are unchanged, so anything that talks to your machine keeps working.",
    ],
  },
  {
    id: "phone",
    title: "Dashboard on a phone",
    intro: "Where most shots are started from the web app.",
    stock: stockWeb("dashboard-phone", "Stock GaggiMate on a phone: icon-only mode tabs, a profile chart, quick-select cards, reading cells and a round menu button in the corner."),
    bettermate: bmWeb("dashboard-phone", "BetterMate on a phone: the wordmark and a warning button at the top, the dial, a START SHOT banner, water tank and last shot tiles, the profile picker, and a labelled mode bar at the bottom."),
    changed: [
      "The dial and START SHOT come first, so the daily shot needs no scrolling.",
      "The mode bar floats at the bottom within reach of your thumb, with a word under every icon.",
      "A warning button appears in the top bar only while a warning exists.",
      "Every page works down to 320 px wide without sideways scrolling.",
    ],
    kept: ["Favourite profiles, one tap each.", "Target temperature from the dashboard."],
  },
  {
    id: "navigation",
    title: "Navigation on a phone",
    intro: "Getting to profiles, history and settings.",
    stock: stockWeb("navigation-phone", "Stock GaggiMate navigation drawer: Dashboard, Profiles, Shot History, Shot Analyzer, Statistics and Settings."),
    bettermate: bmWeb("navigation-phone", "BetterMate navigation on a phone: Dashboard, Profiles, History and Settings."),
    changed: ["Four pages instead of six. Shot Analyzer and Statistics are links at the top of History."],
    kept: ["Every stock page is still there.", "The GaggiMate credit stays in the navigation."],
  },
];
