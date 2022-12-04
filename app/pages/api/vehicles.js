import {getVehicles} from "../../database/Connector";

export default async function Vehicles(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    const vehicles = await getVehicles(req.body.type)

    if (vehicles === null) {
        res.status(400).json({
            message: "Bad request."
        });
        return;
    }

    res.status(200).json(vehicles);
}