import {addAlert} from "../../database/Connector";

let data = undefined;

export default async function Alerts(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    if (data !== undefined) {
        data = await addAlert(data);
    }

    res.status(200).json(data);
}