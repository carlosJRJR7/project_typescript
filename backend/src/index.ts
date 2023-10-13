import 'dotenv/config'; 
import app from './app';

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));