const express = require('express');
const app = express();
import { FileManagerEndpointExpress } from 'ngx-filemanager-api-firebase/public_api';

app.use(FileManagerEndpointExpress);
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log('listening on PORT=' + PORT);
});
