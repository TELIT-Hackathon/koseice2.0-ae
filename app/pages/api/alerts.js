import {getAlerts} from "../../database/Connector";

let data = undefined;

export default async function Alerts(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({
            message: "This endpoint only accepts GET requests."
        });
        return;
    }

    if (req.body.history !== undefined) {
      res.status(200).json(await getAlerts(req.body.history));
    }
    else {
      res.status(200).json(await getAlerts());
    }
}