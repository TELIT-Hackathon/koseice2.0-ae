import json
import mysql.connector

mydb = mysql.connector.connect(
  host="31.214.247.108",
  user="u389_pUG1Sf8i75",
  password="vTF7k3qNVmWtxX2tj+XwVZ=x",
  database="s389_hackathon"
)

mycursor = mydb.cursor()

sql = "INSERT INTO stops(id, name, district, region, code, connections) VALUES (%s, %s, %s, %s, %s, %s)"
val = []

stops = {}

with open("ZASLINKY.TXT") as f:
    i = -1
    for line in f:
        i += 1
        if i == 0:
            continue
        line = line[1:-2].split('","')
        num = line[0]
        stop = int(line[3])
        
        if stop not in stops:
            stops[stop] = []
        if num not in stops[stop]:
            stops[stop].append(num)
        
with open("ZASTAVKY.TXT") as f:
    i = -1
    data = {}
    for line in f:
        i += 1
        if i == 0:
            continue
        line = line[1:-2].split('","')
        val.append((int(line[0]), line[3],line[2],line[1],line[4], ",".join(stops[int(line[0])])))
        
mycursor.executemany(sql, val)
mydb.commit()
print(mycursor.rowcount, "updated")
