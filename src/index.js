import { PORT } from "./config.js";
import app from "./app.js";



//app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);