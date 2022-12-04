import {addRecord} from "../../database/Connector";

export default async function AddRecord(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    const result = await addRecord(req.body.stop, req.body.connection, req.body.destination)

    if (!result) {
        res.status(400).json({
            message: "Bad request."
        });
        return;
    }

    res.status(200).json({
        message: "ok"
    });
}