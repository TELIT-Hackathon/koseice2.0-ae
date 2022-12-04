import {addAlert} from "../../database/Connector";

export default async function AddAlert(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    await addAlert(req.body.type, req.body.lat, req.body.lng)

    res.status(200).json({
        message: "ok"
    });
}