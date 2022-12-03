let json = undefined;
import fs from "fs/promises";

export default async function Stops(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({
            message: "This endpoint only accepts GET requests."
        });
        return;
    }

    if (json === undefined) {
        json = JSON.parse(await fs.readFile("database/stops.json"));
    }

    res.status(200).json(json);
}