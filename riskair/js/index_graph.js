var color = 'gray';
    var len = undefined;

    var nodes = [{id: 0, label: "CFTC", group: 0},
        {id: 1, label: "ABN AMRO", group: 1},
        {id: 2, label: "Goldman Sachs", group: 8},
        {id: 3, label: "BNP", group: 1},
        {id: 4, label: "JP Morgan", group: 1},
        {id: 5, label: "Barclays", group: 1},
        {id: 6, label: "Nomura", group: 2},
        {id: 7, label: "Bank of America", group: 2},
        {id: 8, label: "Morgan Stanley", group: 2},
        {id: 9, label: "Société Générale", group: 3},
        {id: 10, label: "Deutsche Bank", group: 3},
        {id: 11, label: "Santanders", group: 3},
        {id: 12, label: "AIG", group: 4},
        {id: 13, label: "Nordea Bank", group: 4},
        {id: 14, label: "Crédit Agricole", group: 4},
        {id: 15, label: "RBC", group: 5},
        {id: 16, label: "Citigroup", group: 5},
        {id: 17, label: "Crédit Suisse", group: 5},
        {id: 18, label: "UBS", group: 6},
        {id: 19, label: "HSBC", group: 6},
        {id: 20, label: "SunTrust", group: 6},
        {id: 21, label: "Wells Fargo", group: 7},
        {id: 22, label: "BBVA", group: 7},
        {id: 23, label: "Mizuho Financial Group", group: 7},
        {id: 24, label: "Northern Trust", group: 8},
        {id: 25, label: "Commerzbank", group: 8},
        {id: 26, label: "Natixis", group: 8},
        {id: 27, label: "RBS", group: 9},
        {id: 28, label: "Lloyd", group: 9},
        {id: 29, label: "Mizuho", group: 9}
    ];
    var edges = [{from: 1, to: 0},
        {from: 2, to: 0},
        {from: 4, to: 3},
        {from: 5, to: 4},
        {from: 4, to: 0},
        {from: 7, to: 6},
        {from: 8, to: 7},
        {from: 7, to: 0},
        {from: 10, to: 9},
        {from: 11, to: 10},
        {from: 10, to: 4},
        {from: 13, to: 12},
        {from: 14, to: 13},
        {from: 13, to: 0},
        {from: 16, to: 15},
        {from: 17, to: 15},
        {from: 15, to: 10},
        {from: 19, to: 18},
        {from: 20, to: 19},
        {from: 19, to: 4},
        {from: 22, to: 21},
        {from: 23, to: 22},
        {from: 22, to: 13},
        {from: 25, to: 24},
        {from: 26, to: 25},
        {from: 25, to: 7},
        {from: 28, to: 27},
        {from: 29, to: 28},
        {from: 28, to: 0}
    ]

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'dot',
            size: 30,
            font: {
                size: 32,
                color: 'black'
            },
            borderWidth: 2
        },
        edges: {
            width: 2
        }
    };
    network = new vis.Network(container, data, options);