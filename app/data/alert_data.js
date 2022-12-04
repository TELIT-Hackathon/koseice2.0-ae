export const type_names = {
    "11": "JAM",
    "12": "CONSTRUCTION",
    "13": "HAZARD ON ROAD",
    "14": "ACCIDENT",
    "15": "CLOSED ROAD",
    "16": "DIFFICULT WEATHER",

    "21": "ICE",
    "22": "SNOW",
    "23": "HAIL",
    "24": "FOG",
    "25": "FLOODS",
}

export const name_types = {
    "JAM" : "11",
    "CONSTRUCTION": "12",
    "HAZARD ON ROAD": "13",
    "ACCIDENT": "14",
    "CLOSED ROAD": "15",

    "ICE": "21",
    "SNOW": "22",
    "HAIL": "23",
    "FOG": "24",
    "FLOODS": "25",
}

export const available_severities = {
    "JAM": ["1", "2", "3"],
    "CONSTRUCTION": ["1"],
    "HAZARD ON ROAD": ["1", "2"],
    "ACCIDENT": ["2", "3"],
    "CLOSED ROAD": ["3"],

    "ICE": ["0"],
    "SNOW": ["0"],
    "HAIL": ["0"],
    "FOG": ["0"],
    "FLOODS": ["0"],
}

export const severity_descriptions = {
    "111": {
        name: "Mild",
        color: "#F07D02"
    },
    "112": {
        name: "Heavy",
        color: "#E60000"
    },
    "113": {
        name: "Severe",
        color: "#9E1313"
    },
    "121": {
        name: "Heavy",
        color: "#E60000"
    },
    "131": {
        name: "Mild",
        color: "#F07D02"
    },
    "132": {
        name: "Heavy",
        color: "#E60000"
    },
    "142": {
        name: "Heavy",
        color: "#E60000"
    },
    "143": {
        name: "Severe",
        color: "#9E1313"
    },
    "153": {
        name: "Severe",
        color: "#9E1313"
    },
    "210": {
        name: "Ice",
        color: "#000000"
    },
    "220": {
        name: "Snow",
        color: "#000000"
    },
    "230": {
        name: "Hail",
        color: "#000000"
    },
    "240": {
        name: "Fog",
        color: "#000000"
    },
    "250": {
        name: "Flood",
        color: "#000000"
    }
}