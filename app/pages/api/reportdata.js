import {getReport} from "../../database/Connector";

export default async function Alerts(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({
            message: "This endpoint only accepts GET requests."
        });
        return;
    }

    res.status(200).json(await getReport());
}