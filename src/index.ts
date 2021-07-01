import express from 'express';
import cartRoutes from './cart';


const app = express();

app.use(express.json());

const port = 3000;

app.use("/", cartRoutes);
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})