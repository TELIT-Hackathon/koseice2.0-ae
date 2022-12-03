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

export async function getStop(id) {
    if (!id || isNaN(id) || id < 0)
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