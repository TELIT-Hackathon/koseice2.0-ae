import {getStop} from "../../database/Connector";

export default async function Stop(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    const stop = await getStop(req.body.stop)

    if (stop === null) {
        res.status(400).json({
            message: "Bad request."
        });
        return;
    }

    res.status(200).json(stop.length > 0 ? stop[0] : {});
}