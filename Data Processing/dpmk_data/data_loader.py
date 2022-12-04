# import mysql.connector

# mydb = mysql.connector.connect(
# host="31.214.247.108",
# user="u389_pUG1Sf8i75",
# password="vTF7k3qNVmWtxX2tj+XwVZ=x",
# database="s389_hackathon"
# )

# mycursor = mydb.cursor()

# sql = "INSERT INTO departures(stop_id, line_id, destination_id, day, time) VALUES (%s, %s, %s, %s, %s)"
# val = []

with open('ZASSPOJE.txt', 'r') as f_zasspoje:
    with open('SPOJE.txt', 'r') as f_spoje:     


        smer_dict = {}
        lines_list = f_zasspoje.readlines()

        for index, line in enumerate(lines_list):

            report = [str(daco.strip('" ')) for daco in line.split(',')]
            
            
            if index == len(lines_list)-1:
                smer_dict[report[0]+str(int(report[1])%2)] = report[3]
                break

            else:
                if report[1] > [str(daco.strip('"; ')) for daco in lines_list[index+1]][1]:
                    smer_dict[report[0]+str(int(report[1])%2)] = report[3]

        print(smer_dict)

        mod_dict = {
                "00002": [5, 6],
                "00003": [0, 1, 2, 3, 4]
            }

        mod_list = []
        spoje = f_spoje.readlines()
        to_break = False
        
        for index in range(len(lines_list)-1):
            
            report = [str(daco.strip('" ')) for daco in lines_list[0].split(',')]
            for i in spoje:
                modifiers = [str(daco.strip('" ')) for daco in i.split(',')]

                if modifiers[0] == report[0] and modifiers[1] == report[1]:

                    for modd in modifiers[2:4]:
                        if modd in mod_dict.keys():
                            mod_list.append(mod_dict[modd])
                            to_break = True
                    
                if to_break:
                    to_break = False
                    break

            week = sum(mod_list, [])

            for y in week:
                try:
                    val.append((int(report[3]), int(report[0]), int(smer_dict[report[0]+str(int(report[1])%2)]), y, int(report[11])))
                except:
                    pass

            if index // 1000 == index / 1000:
                mycursor = mydb.cursor()
                mycursor.executemany(sql, val)
                mydb.commit()
                print(mycursor.rowcount, "updated", index/1000)
                val = []


            mod_list = []

            lines_list.pop(0)