// routes/favouritesRoutes.js
import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());


// Route to add a favorite
router.post('/add', async (req, res) => {

    try {
        const { addFavorite } = await import("../controller/favouritesController.mjs");
    
        const success = await addFavorite(req.body);
        res.status(200).json({ success: !!success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a favorite
router.post('/delete', async (req, res) => {

    try {
        const { deleteFavorite } = await import("../controller/favouritesController.mjs");
        const success = await deleteFavorite(req.body);
        res.status(200).json({ success: !!success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to find a favorite
router.post('/isFavourited', async (req, res) => {

    try {
        const { isFavorited } = await import("../controller/favouritesController.mjs");
        const success = await isFavorited(req.body);
        res.status(200).json({ success: !!success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to list all favorites
router.post('/findAll', async (req, res) => {

    try {
        const { favoritesList } = await import("../controller/favouritesController.mjs");
        const success = await favoritesList(req.body);
        res.status(200).json({ success: !!success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;


