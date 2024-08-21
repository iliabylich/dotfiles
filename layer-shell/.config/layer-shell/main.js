import App from "./App.js";
import load_css from "./css/load.js";
import initMessaging from "./lib/messages.js";

const app = new App({ "application-id": "com.me.layershell" })

initMessaging(app);

app.connect("startup", () => load_css())
app.run([])
