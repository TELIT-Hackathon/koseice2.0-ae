class AverageBus{
    constructor(usage,AvrageWait,LongWait,LongWaits,bus,DepartureTime,stop,previous,NewDepartureTime,prevID,line) {
        this.usage = usage
        this.AvrageWait = AvrageWait
        this.LongWait = LongWait
        this.LongWaits = LongWaits
        this.bus = bus
        this.DepartureTime = DepartureTime
        this.previous = previous
        this.NewDepartureTime = NewDepartureTime
        this.prevID = prevID
        this.line = line
    }
}

function CalculateTime(a,b){

    let timeAInMins = 0
    let timeBInMins = 0

    if (a < 100) {
        timeAInMins = a
    }
    else {
        timeAInMins= 60 * parseInt(a.toString().slice(0,-2)) + parseInt(a.toString().slice(-2))
    }

    if (b < 100) {
        timeBInMins = b
    }
    else {
        timeBInMins= 60 * parseInt(b.toString().slice(0,-2)) + parseInt(b.toString().slice(-2))
    }

    let timeDifference = timeAInMins - timeBInMins
    // let timeHours = Math.round(timeDifference/60)
    // let timeMinutes = timeDifference - timeHours*60

    //let time = timeHours.toString() + timeMinutes.toString()

    return timeDifference


    // let ASeconds = parseInt(a.toString().slice(-2))*60
    // a = a.toString().slice(-2)
    // ASeconds += parseInt(a)*3600
    // let BSeconds = parseInt(b.toString().slice(-2))*60
    // b = b.toString().slice(-2)
    // BSeconds += parseInt(b)*3600
    // timeInSeconds = ASeconds-BSeconds
    // const result2 = new Date(timeInSeconds * 1000).toISOString().slice(14, 19);
    // return result2.split(":")[0]








}
//console.log(CalculateTime(503,457))
class Bus{
    constructor(usage,Wait,LongWait,days,bus,DepartureTime,LongWaits,stop,line,previous,prevID) {

        this.usage = usage
        this.Wait = Wait
        this.LongWait = LongWait
        this.LongWaits = LongWaits
        this.days = days
        this.bus = bus
        this.DepartureTime = DepartureTime
        this.stop =stop
        this.line = line
        this.previous = previous
        this.prevID = prevID
    }
}
async function GetNumberOfStops(){
    const mysql = require('serverless-mysql')({
        config: {
            host     : "31.214.247.108",
            database : "s389_hackathon",
            user     : "u389_pUG1Sf8i75",
            password : "vTF7k3qNVmWtxX2tj+XwVZ=x"
        }
    })
    let results = await mysql.query('SELECT * FROM connections')
    let Mapa = new Map()

    for(let daco of results){

        Mapa[daco.id] = daco.stops.split(",").length
    }

}


async function Evaluate(Start ,End){
    let ReverseddayTranslator = {6:0,0:1,1:2,2:3,3:4,4:5,5:6}
    let MapBus = new Map()
    const mysql = require('serverless-mysql')({
        config: {
            host     : "31.214.247.108",
            database : "s389_hackathon",
            user     : "u389_pUG1Sf8i75",
            password : "vTF7k3qNVmWtxX2tj+XwVZ=x"
        }
    })

    // Run your query

    let results = await mysql.query('SELECT * FROM traffic_records')
    let stopsTable = await mysql.query('SELECT * FROM connections')
    let departures = await mysql.query('SELECT * FROM departures')
    let StopMap = new Map()
    for(let line of stopsTable){
        StopMap[line.id] = line.stops.split(",")
    }
    // Run clean up function
    await mysql.end()
    let myChoice = [];
    for(let obj of results) {
        if(obj.time >= Start && obj.time <= End){
            myChoice.push(obj)
            //console.log("something")
        }

    }

    for(let traffic_reccord of myChoice){
        // console.log("neeeeveeer")
        let stop = traffic_reccord.stop_id
        let line = traffic_reccord.line_id
        let direction =0



        if(StopMap[traffic_reccord.line_id].indexOf(traffic_reccord.stop_id) > StopMap[traffic_reccord.line_id].indexOf(traffic_reccord.destination_id)){
            let direction =0
        }else{
            let direction = 1
        }
        let day = traffic_reccord.time.getDay()
        let time = traffic_reccord.time.time


        let possibleStops = []
        // console.log("dacoo6")
        // console.log(departures.length)
        // console.log(traffic_reccord.stop_id)

        for(stop of departures){
            if(stop.stop_id === traffic_reccord.stop_id){
                // console.log("one")
                possibleStops.push(stop)

            }
        }
        //console.log(possibleStops)
        let possibleLines = []
        for(lines of possibleStops){
            // console.log(lines.line_id)
            // console.log(lines.stop_id)
            // console.log(traffic_reccord.line_id)
            // console.log(traffic_reccord.stop_id)

            if(lines.line_id == traffic_reccord.line_id  ){
                // console.log("two")
                possibleLines.push(lines)
            }



        }
        let dayTranslator = {0:6,1:0,2:1,3:2,4:3,5:4,6:5}

        //console.log(possibleLines)
        let possibleDays = []
        for (let day of possibleLines) {
            //console.log(day.day)
            //console.log(dayTranslator[traffic_reccord.time.getDay()])
            if(day.day == dayTranslator[traffic_reccord.time.getDay()]){
                possibleDays.push(day)
            }
        }
        //console.log(possibleDays)
        let arrival
        let bus
        let smallest = 111111111
        let previous = 111111111
        let prevID = 0
        for (let time of possibleDays) {

            let cas = (traffic_reccord.time.getHours()).toString() + (traffic_reccord.time.getMinutes()).toString()

            //console.log(cas)
            if(time.time>cas & time.time<smallest){
                previous = smallest
                smallest = time.time
                //console.log("debil")
                arrival = time.time
                prevID = bus
                bus = time.id
                break
            }


        }
        if(arrival === undefined){
            //console.log("end")
            continue
        }

        //console.log(arrival)
        let trafficRecordTime = traffic_reccord.time.getHours().toString() + traffic_reccord.time.getMinutes().toString()
        console.log(arrival)
        console.log(trafficRecordTime)
        // console.log(line)
        // console.log(stop)
        let wait =  parseInt(CalculateTime(arrival,trafficRecordTime))
        //zistim aky som buss

        let busArivalTime
        //console.log(wait)
        //cas prihodu busu


        if(!(MapBus[bus]!=(undefined))){
            MapBus[bus] = new Bus()
            MapBus[bus].prevID = prevID
            if(previous != 111111111){
                MapBus[bus].previous = previous
            }else{
                MapBus[bus].previous = 0
            }

            MapBus[bus].line = traffic_reccord.line_id
            MapBus[bus].DepartureTime = arrival
            MapBus[bus].stop = stop.stop_id
            MapBus[bus].bus = bus
            MapBus[bus].days = traffic_reccord.day
            MapBus[bus].Wait = 0
            MapBus[bus].usage = 0
            MapBus[bus].LongWait=0
            MapBus[bus].LongWaits=[]



        }
        MapBus[bus].usage +=  1
        MapBus[bus].Wait += wait
        if(wait > 5){
            MapBus[bus].LongWait +=1
            MapBus[bus].LongWaits.push(wait)
        }




    }
    //  console.log("good end")
    // console.log(MapBus)

    // days is an array of weekdays: 0 is Sunday, ..., 6 is Saturday
    function countCertainDays( days, d0, d1 )
    {
        var ndays = 1 + Math.round((d1-d0)/(2436001000));
        var sum = function(a,b)
        {
            return a + Math.floor( (ndays+(d0.getDay()+6-b) % 7 ) / 7 );
        }
        return days.reduce(sum,0);
    }
    countCertainDays([5],new Date(2020,0,1),new Date(2020,2,1))
    let AVGBUSLIST = []
    for(const [key, CertainBus] of Object.entries(MapBus)) {
        // console.log("runnujem")
        let AVGBUS = new AverageBus()
        let theirDays = [ReverseddayTranslator[CertainBus.day]]
        let daysNumber = countCertainDays(theirDays,Start,End)
        AVGBUS.previous = CertainBus.previous
        AVGBUS.prevID = CertainBus.prevID
        AVGBUS.bus = CertainBus.bus

        AVGBUS.AvrageWait = CertainBus.Wait / CertainBus.usage
        console.log(AVGBUS.AvrageWait,"wait")
        AVGBUS.line = CertainBus.line;
        AVGBUS.AvrageLongWait = CertainBus.LongWait / CertainBus.usage
        AVGBUS.usage = CertainBus.usage / daysNumber
        AVGBUS.LongWaits = CertainBus.LongWaits
        AVGBUS.DepartureTime = CertainBus.DepartureTime
        AVGBUS.NewDepartureTime = 0
        if (AVGBUS.usage < 5) {
            console.log("odporuca sa zrusit")
        } else if (AVGBUS.usage < 20) {
            console.log("odporuca sa maly bus")
        } else if (AVGBUS.usage < 40) {
            console.log("odporuca sa stredny bus")
        } else if (AVGBUS.usage < 40) {
            console.log("odporuca sa klasicky bus")
        } else if (AVGBUS.usage < 60) {
            console.log("odporuca sa velky bus")
        } else if (AVGBUS.usage > 60){
            console.log("odporuca sa dva autobusy")
        }
        if (AVGBUS.AvrageWait > 4) {
            //console.log("Odporuca sa posunut spoj o")
            //console.log(-AVGBUS.AvrageWait+1)
            AVGBUS.NewDepartureTime =AVGBUS.DepartureTime  -AVGBUS.AvrageWait+1
            console.log(AVGBUS)

            AVGBUS.NewDepartureTime += AVGBUS.DepartureTime - AVGBUS.AvrageWait+1
            for (longtime of AVGBUS.LongWaits) {
                longtime += -AVGBUS.AvrageWait + 1
            }
        }
        AVGBUSLIST.push(AVGBUS)


    }
    for(const AVGBUS of AVGBUSLIST)
    {
        //console.log(AVGBUS.LongWaits)

        let copy = {...AVGBUS.LongWaits}
        for (let i =0; i<AVGBUS.LongWaits; i++) {
            AVGBUS.LongWaits[i] -= AVGBUS.DepartureTime - AVGBUS.NewDepartureTime
            if(AVGBUS.LongWaits[i]<6){
                AVGBUS.LongWaits.pop(i)
            }
        }


        // if (AVGBUS.LongWaits.reduce((partialSum, a) => partialSum + a, 0) > 75) {
        //
        //     //vypocitam si novy waiting a porovnam aky by bol gao medzi nim a predoslim busom
        //     let sorted = AVGBUS.LongWaits.sort()
        //     let index = Math.floor(AVGBUS.LongWaits.length / 3)
        //
        //     //console.log(AVGBUS.NewDepartureTime,"geno")
        //
        //
        //     let avgLongWait = AVGBUS.LongWaits[index]
        //     //console.log(avgLongWait,"kkot")
        //     let TimeFromPrev = CalculateTime(Math.round(AVGBUS.NewDepartureTime),avgLongWait)
        //     console.log(TimeFromPrev,Math.round(AVGBUS.NewDepartureTime),avgLongWait)
        //     TimeFromPrev = CalculateTime(TimeFromPrev,AVGBUS.previous)
        //     console.log(TimeFromPrev,AVGBUS.previous)
        //     if(TimeFromPrev<3){
        //
        //     }
        //     else if(TimeFromPrev!= undefined){
        //         console.log("new Line in time")
        //         console.log(AVGBUS.previous += TimeFromPrev+2)
        //     }
        //
        // }
    }





    //console.log(results);

}
Evaluate(new Date("2022-11-01T22:12:41.000Z"),new Date("2022-12-05T22:12:41.000Z"))
//console.log(CalculateTime(540,120))
function AddTrafficRecord(linka,vystupovanie,cas){

}
