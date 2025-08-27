<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Test getFullName</title>

    <style>
        table,
        table td {
            border: 1px solid;
            border-collapse: collapse;
            text-align: center;
            padding: 3.5px;
        }

        .pass {
            background-color: #00FF00;
            color: #000000;
        }

        .fail {
            background-color: #FF0000;
            color: #FFFF33;
        }

        .pass, .fail {
            font-size: 10px;
            font-family: Arial, Verdana, Helvetica, sans-serif;
            border-color: #000000;
        }

        table + tbody + tr {
            background-color: "pink"
        }

        caption {
            font-size: 9.5px;
            font-family: Arial, Verdana, Helvetica, sans-serif;
        }
    </style>

    <script>
        // Globals
        const fullNameUrl = "serv_getFullName_n6sjf.php";
        const defaultName = "U N D E F I N E D";
        const tableHeader = createTableHeader();
        let   tableRows = '';
        const tableFooter = createTableFooter();

        const memberDictionary = [
            { call: 'KN6PIV', expected: 'Jillian Aldersen'    },
            { call: 'KM6HYK', expected: 'William J. Anderson' },
            { call: 'KM6UYM', expected: 'Fernel Andong'       },
            { call: 'AI6BB' , expected: 'Paul Atkins'         },
            { call: 'KN6ORM', expected: 'Steve Austin'        },
            { call: 'W2OKB' , expected: 'Bharat Bailur'       },
            { call: 'W6LOG' , expected: 'Robert Barbitta'     },
            { call: 'KI6HIG', expected: 'Gary Barnes'         },
            { call: 'KJ6FHQ', expected: 'Anna Bernstine'      },
            { call: 'N6ZEN' , expected: 'Dan Bernstein'       },
            { call: 'KK6FOI', expected: 'Emily Bernstein'     },
            { call: 'AA6XL' , expected: 'Michael G. Bevington'},
            { call: 'WB6JKV', expected: 'Michael S. Herbert'  },
            { call: 'N6FG'  , expected: 'Frank Erbacher'      },
            { call: 'N6SJF' , expected: 'Jonathan Lancelle'   },
            { call: 'KJ6OGL', expected: 'Tom Oliver'          },
            { call: 'W1AW'  , expected: defaultName           },
            { call: 'WA6TOW', expected: defaultName           },
        ];

        // end Globals

        processMembers();

        async function processMembers() {
            for (let ix=0; ix<memberDictionary.length; ix++) {
                callsign = memberDictionary[ix].call;
                expected = memberDictionary[ix].expected;
                actual = await getFullNameFromMergedTable(callsign);
                if (actual === expected ) {
                    displayClass = "pass";
                    pass = 'Passed';
                } else {
                    displayClass = "fail";
                    pass = 'Failed';
                }
                tableRows += createTableRow(callsign, expected, actual, pass, displayClass);
                document.getElementById('table').innerHTML = tableHeader + tableRows + tableFooter;
            }
        }

        async function getFullNameFromMergedTable(callsign) {
            try {
                const response = await fetch(fullNameUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callsign })
                });
                if (!response.ok) {
                    console.log('Response not OK for ',callsign)
                    return defaultName;
                }
                const data = await response.json();
                console.log(data);
                if (data.result === null ) {
                    return defaultName;
                } else { 
                    return data.result.FullName;
                }
            } catch (error) {
                console.log("Error fetching full name:", error);
                return defaultName;
            }
        }

        function createTableHeader() {
            return `
                <table>
                    <thead>
                        <caption>
                            This is how the final table should appear when the 
                            <it>serv_getFullName</it> lookup has been 
                            </b>successfully</b>. checked out. The test here is 
                            whether the actual results match the expected results.
                            This implementation uses the fetch API which implicitly
                            uses promises. The 'expected' values for KJ6FHQ and N6FG were
                            intentionally mis-spelled to test the fail option. 
                        </caption>

                        <tr>
                            <th>Callsign</th>
                            <th>Expected</th>
                            <th>Actual</th>
                            <th>Pass/Fail</th>
                        </tr>
                    </thead>

                    <tbody>`
        }
        
        function createTableRow(callsign, expected, actual, pass, displayClass) {
            return `<tr>` +
                `<td class = ${displayClass}>` + callsign     + `</td>` +
                `<td class = ${displayClass}>` + expected     + `</td>` +
                `<td class = ${displayClass}>` + actual       + `</td>` +
                `<td class = ${displayClass}>` + pass         + `</td>` +
            `</tr>`;
        }

        function createTableFooter() {
            return '</tbody></table>';
        }

    </script>
</head>

<body>
    <H2>Table Lookup Test</h2>
    <div id="table"></div>
</body>

</html>
