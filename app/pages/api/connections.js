import {getConnections} from "../../database/Connector";

let data = undefined;

export default async function Stops(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({
            message: "This endpoint only accepts GET requests."
        });
        return;
    }

    if (data === undefined) {
        data = await getConnections();
    }

    res.status(200).json(data);
}