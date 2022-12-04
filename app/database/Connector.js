const mysql = require('serverless-mysql')({
    config: {
        host     : process.env.DB_HOST,
        database : process.env.DB_DATABASE,
        user     : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        dateStrings: true
    }
})

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

export async function getAlerts() {
    const sql = "SELECT type,lat,lng FROM road_alerts WHERE time>?"
    const results = await mysql.query(sql, [1661212800])
    await mysql.end()
    return results;
}

export async function addRecord(stop, connection, destination) {
    if (!sanitizeNumber(stop) || !sanitizeNumber(connection) || !sanitizeNumber(destination))
        return false;

    const sql = "INSERT INTO traffic_records(time, stop_id, line_id, destination_id) VALUES (NOW(), ?, ?, ?)"
    await mysql.query(sql, [stop, connection, destination]);
    await mysql.end()
    return true;
}