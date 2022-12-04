const mysql = require('serverless-mysql')({
    config: {
        host     : process.env.DB_HOST,
        database : process.env.DB_DATABASE,
        user     : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        dateStrings: true
    }
})

export async function getDepartures(line, stop) {
    if (!sanitizeNumber(line) || !sanitizeNumber(stop))
        return null;

    function convert(time) {
        time = String(time)
        return time.substring(0, time.length - 2) + ":" + time.substring(time.length - 2)
    }

    const now = new Date();
    const num = now.getHours() * 100 + now.getMinutes()

    const sql = "SELECT * FROM departures WHERE line_id=? AND stop_id=? AND time>? AND day=6 ORDER BY time ASC LIMIT 10"
    const results = await mysql.query(sql, [line, stop, num])
    await mysql.end()
    return results.map(res => convert(res.time));
}

export async function getConnections() {
    const sql = "SELECT * FROM connections"
    const results = await mysql.query(sql)
    await mysql.end()
    return results;
}

export async function getStops() {
    const sql = "SELECT * FROM stops"
    const results = await mysql.query(sql)
    await mysql.end()
    return results;
}

function sanitizeNumber(num) {
    return num && !isNaN(num) && num > 0;
}

export async function getStop(id) {
    if (!sanitizeNumber(id))
        return null;

    const sql = "SELECT * FROM stops WHERE id=?"
    const results = await mysql.query(sql, [id])
    await mysql.end()
    return results;
}

export async function getConnection(id) {
    if (!sanitizeNumber(id))
        return null;

    const sql = "SELECT * FROM connections WHERE id=?"
    const results = await mysql.query(sql, [id])
    await mysql.end()
    return results;
}

export async function getReport() {
    const sql = "SELECT * FROM reports ORDER BY time DESC LIMIT 1"
    const results = await mysql.query(sql)
    await mysql.end()
    return results[0];
}

export async function getAlerts(range= 86400) {
    const sql = "SELECT type,lat,lng,street FROM road_alerts WHERE time>?"
    const results = await mysql.query(sql, [1661212800+86400-range])
    await mysql.end()
    return results;
}

export async function addAlert(type, lat, lng) {
    const sql = "INSERT INTO road_alerts(time,type,lat,lng) VALUES(?,?,?,?)"
    await mysql.query(sql, [Math.round(new Date().getTime()/1000), type, lat, lng])
    await mysql.end()
}

export async function addRecord(stop, connection, destination) {
    if (!sanitizeNumber(stop) || !sanitizeNumber(connection) || !sanitizeNumber(destination))
        return false;

    const sql = "INSERT INTO traffic_records(time, stop_id, line_id, destination_id) VALUES (NOW(), ?, ?, ?)"
    await mysql.query(sql, [stop, connection, destination]);
    await mysql.end()
    return true;
}

const VEHICLE_CODES = new Set(["S", "E", "B", "M"]);

export async function getVehicles(type) {
    if (!VEHICLE_CODES.has(type))
        return null;

    const sql = "SELECT * FROM vehicles WHERE type=? OR type=?"
    const result = await mysql.query(sql, [type, type === "B" ? "E" : type]);
    await mysql.end()
    return result;
}