<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Test getLastEntries.php</title>

    <style>
        html {
            font-family: sans-serif;
        }

        table {
            border-collapse: collapse;
            border: 2px solid rgb(200,200,200);
            letter-spacing: 0px;
            font-size: 8px;
        }

        td, th {
            border: 1px solid rgb(150,150,150);
            padding: 2px;
        }

        th {
            background-color: rgb(235,235,235);
        }

        td {
            text-align: center;
        }

        tr:nth-child(even) td {
            background-color: rgb(250,250,250);
        }

        tr:nth-child(odd) td {
            background-color: rgb(245,245,245);
        }

        caption {
            padding: 10px;
            font-size: 12px;
        }
    </style>

    <script>
        // Globals
        const numRecords = 20;  // The number of records to be displayed
        var arr_pp_grossamount = [];
        var arr_pp_paypalfee = [];
        var arr_pp_netamount = [];
        // end Globals

        var obj = new Object;
        obj.numRecords = numRecords;
        const jsonString = JSON.stringify(obj);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.status === 500) {
            }
            if ((this.status === 200) && (this.readyState === 4)) {
                var m1, m2, m3;
                const response = this.response;
                if (response === '\r\n') {
                    m1 = "Success: failed";
                    m2 = "ErrorMsg: just \\r\\n";
                    m3 = "The SQL query never came down from the server";
                } else {
                    let pdata = JSON.parse(response);
                    myarr = pdata.myarr;
                    let pp_response = [];
                    arr_pp_grossamount = [];
                    arr_pp_paypalfee = [];
                    arr_pp_netamount = [];
                    let pp_paypalfee;
                    let pp_netamount;
                    let pp_grossamount;

                    for (ix=0; ix < myarr.length; ix++) {

                        pp_response.push(myarr[ix]['pp_response']);
                        let pp_grossamount = null;
                        let pp_paypalfee = null;
                        let pp_netamount = null;

                        if (pp_response[ix] != undefined){
                            let rix = JSON.parse(pp_response[ix]);
                            console.log(rix);
                            console.log(rix["orderID"]);
                            let sellerBreakdown = rix["purchase_units"][0]["payments"]["captures"][0]["seller_receivable_breakdown"];
                           
                            let pp_grossamount = sellerBreakdown["gross_amount"]["value"];
                            let pp_paypalfee = sellerBreakdown["paypal_fee"]["value"];
                            let pp_netamount = sellerBreakdown["net_amount"]["value"];  

                            console.log("gross:", pp_grossamount);
                            console.log("fee:  ",pp_paypalfee);
                            console.log("net:  ", pp_netamount);

                            arr_pp_grossamount.push(pp_grossamount);
                            arr_pp_paypalfee.push(pp_paypalfee);
                            arr_pp_netamount.push(pp_netamount);
                        } else {
                            arr_pp_grossamount.push(pp_grossamount);
                            arr_pp_paypalfee.push(pp_paypalfee);
                            arr_pp_netamount.push(pp_netamount);
                        }
                    }

                    const len = Math.min(myarr.length,numRecords);
                    let table1HTML = createTable1Header(len);
                    let table2HTML = createTable2Header(len);
                    for (ix=0; ix < len; ix++) {
                        table1HTML += createTable1Row(myarr[ix]);
                        table2HTML += createTable2Row(myarr[ix],ix);
                    }
                    table1HTML += createTableFooter();
                    table2HTML += createTableFooter();
                    document.getElementById("table1").innerHTML = table1HTML;
                    document.getElementById("table2").innerHTML = table2HTML;
                }
            }
        }
        xhr.open("POST", "serv_getLastEntries.php", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(jsonString);

        function createTable1Header(N) {
                return (
                    `<table id="table1">
                        <thead>
                            <caption>Details record of the last ` + Number(N) +
                                        ` rows of the pp_tnx table.
                            </caption>
                            <tr>
                                <th>indx</th>
                                <th>date</th>
                                <th>call</th>  
                                <th>name</th>
                                <th>years</th>
                                <th>prmry</th>
                                <th>famly</th>
                                <th>rptr</th>
                                <th>dptr</th>
                                <th>sbttl</th>
                                <th>PayPalFee</th>
                                <th>club</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>`
                );
            }

            function createTable2Header(N) {
                return (
                    `<table id="table1">
                        <thead>
                            <caption>
                                Tracking record for the last ` + Number(N) +
                                        ` rows of the pp_tnx table.
                            </caption>
                            <tr>
                                <th>indx</th>
                                <th>pp_id</th>
                                <th>pp_orderID</th>  
                                <th>status</th>
                                <th>pp_grossamnt</th>
                                <th>pp_paypalfee</th>
                                <th>pp_netamnt</th>
                            </tr>
                        </thead>
                        <tbody>`
                );
            }

            function createTable1Row(rowdata) {
                const ppidhead = rowdata['pp_id'].substring(0,8);
                return (
                    `<tr>` + 
                        `<td>` + rowdata['myindex']            + `</td>` +
                        `<td>` + rowdata['mydate']             + `</td>` +
                        `<td>` + rowdata['callsigns']          + `</td>` +
                        `<td>` + rowdata['FullName']           + `</td>` +
                        `<td>` + rowdata['years']              + `</td>` +
                        `<td>` + rowdata["primary"]            + `</td>` +
                        `<td>` + rowdata['family']             + `</td>` +
                        `<td>` + rowdata['repeater']           + `</td>` +
                        `<td>` + rowdata['digipeater']         + `</td>` +
                        `<td>` + rowdata['subtotal']           + `</td>` +
                        `<td>` + rowdata['paypalfee']          + `</td>` +
                        `<td>` + rowdata['clubreceives']       + `</td>` +
                        `<td>` + rowdata['total']              + `</td>` +
                    `</tr>` );
                }

            function createTable2Row(rowdata,ix) {
                const ppidhead = rowdata['pp_id'].substring(0,8);
                const pp_grossamount = arr_pp_grossamount[ix];
                const pp_paypalfee = arr_pp_paypalfee[ix];
                const pp_netamount = arr_pp_netamount[ix];

                return (
                    `<tr>` + 
                        `<td>` + rowdata['myindex']            + `</td>` +
                        `<td>` + rowdata['pp_id']              + `</td>` +
                        `<td>` + rowdata['pp_orderID']         + `</td>` +
                        `<td>` + rowdata['transaction_status'] + `</td>` +
                        `<td>` + pp_grossamount                + `</td>` +
                        `<td>` + pp_paypalfee                  + `</td>` +
                        `<td>` + pp_netamount                  + `</td>` +
                    `</tr>` );
                }
 
            function createTableFooter() {
                return "</tbody></table>";
            }
    </script>
</head>

<body>
    <div id="table1"></div>
    <br>
    <br>
    <div id="table2"></div>
</body>

</html>