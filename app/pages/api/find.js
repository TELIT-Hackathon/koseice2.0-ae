import {getConnection, getStop} from "../../database/Connector";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default async function Vehicles(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "This endpoint only accepts POST requests."
        });
        return;
    }

    const stop = await getStop(req.body.stop), destination = await getStop(req.body.destination);
    const line = await getConnection(req.body.line);

    if (stop === null || destination === null || line === null) {
        res.status(400).json({
            message: "Bad request."
        });
        return;
    }

    const diff = getRandomInt(7)+1
    const departures = [getRandomInt(10)+1]
    for (let i = 0; i < 5; i++) {
        departures.push(departures[departures.length - 1] + diff)
    }

    res.status(200).json({
        stop: stop.length > 0 ? stop[0] : undefined,
        destination: destination.length > 0 ? destination[0] : undefined,
        line: line.length > 0 ? line[0] : undefined,
        next: departures,
        diff: diff
    });
}