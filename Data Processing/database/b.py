import json
import mysql.connector

mydb = mysql.connector.connect(
  host="31.214.247.108",
  user="u389_pUG1Sf8i75",
  password="vTF7k3qNVmWtxX2tj+XwVZ=x",
  database="s389_hackathon"
)

colors = {
    "1": ("#af9778","white"),
    "2": ("#d2005c","white"),
    "3": ("#55bace","white"),
    "4": ("#7477b0","white"),
    "5": ("#bfbfb9","black"),
    "6": ("#ea7b08","white"),
    "7": ("#5cbf14","white"),
    "9": ("#f5d907","black"),
    "R1": ("#0377ae","white"),
    "R2": ("#0377ae","white"),
    "R3": ("#0377ae","white"),
    "R4": ("#0377ae","white"),
    "R5": ("#0377ae","white"),
    "R6": ("#0377ae","white"),
    "R7": ("#0377ae","white"),
    "R8": ("#0377ae","white"),
    "10": ("#d61a0c","white"),
    "11": ("#6f7273","white"),
    "12": ("#6f7273","white"),
    "14": ("#6f7273","white"),
    "15": ("#f99aa7","white"),
    "16": ("#6800a2","white"),
    "17": ("#6f7273","white"),
    "18": ("#bfbfb9","black"),
    "19": ("#026553","white"),
    "20": ("#6f7273","white"),
    "21": ("#6f7273","white"),
    "22": ("#6f7273","white"),
    "23": ("#0e8ccc","white"),
    "24": ("#6f7273","white"),
    "25": ("#6f7273","white"),
    "26": ("#6f7273","white"),
    "26P": ("#bfbfb9","black"),
    "27": ("#2105a3","white"),
    "28": ("#bfbfb9","black"),
    "29": ("#6f7273","white"),
    "30": ("#bfbfb9","black"),
    "31": ("#6f7273","white"),
    "32": ("#6f7273","white"),
    "33": ("#6f7273","white"),
    "34": ("#710a6b","white"),
    "35": ("#6f7273","white"),
    "36": ("#7f581a","white"),
    "37": ("#6f7273","white"),
    "51": ("#bfbfb9","black"),
    "52": ("#6f7273","white"),
    "54": ("#bfbfb9","black"),
    "55": ("#bfbfb9","black"),
    "56": ("#bfbfb9","black"),
    "57": ("#bfbfb9","black"),
    "71": ("#81c7e5","black"),
    "72": ("#c6d640","black"),
    "RA1": ("#0377ae","white"),
    "RA2": ("#0377ae","white"),
    "RA3": ("#0377ae","white"),
    "RA4": ("#0377ae","white"),
    "RA5": ("#0377ae","white"),
    "RA6": ("#0377ae","white"),
    "RA7": ("#0377ae","white"),
    "RA8": ("#0377ae","white"),
    "N1": ("#fae013","black"),
    "N2": ("#ffbabd","black"),
    "N3": ("#ebf28a","black"),
    "N4": ("#e10585","black"),
    "N5": ("#b5f1bb","black"),
    "N6": ("#aedbf1","black"),
    "N7": ("#feae46","black")
}

mycursor = mydb.cursor()

sql = "INSERT INTO connections(id, name, bus, background, color, stops) VALUES (%s, %s, %s, %s, %s, %s)"
val = []

stops = {}
submitted = set()

with open("ZASLINKY.TXT") as f:
    i = -1
    for line in f:
        i += 1
        if i == 0:
            continue
        line = line[1:-2].split('","')
        num = int(line[0])
        if num not in stops:
            stops[num] = []
        int(line[3])
        if line[3] not in stops[num]:
            stops[num].append(line[3])

with open("LINKY.TXT") as f:
    data = {}
    i = -1
    for line in f:
        i += 1
        if i == 0:
            continue
        line = line[1:-2].split('","')
        if line[0] in submitted:
            continue
        data[int(line[0])] = stops[int(line[0])]
        submitted.add(line[0])
        name = line[1][2:]
        val.append((int(line[0]),name,line[1][0] == "A", colors[name][0], colors[name][1], ",".join(stops[int(line[0])])))
    print(json.dumps(data))


#mycursor.executemany(sql, val)
#mydb.commit()
print(mycursor.rowcount, "updated")
