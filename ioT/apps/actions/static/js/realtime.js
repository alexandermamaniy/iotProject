
$(function() {

    // We use an inline data source in the example, usually data would
    // be fetched from a server
    var valorSerial = 25;
    var robo = "F";
    var gas = "F";

    var data = [], totalPoints = 50;

    for(var i = 0; i<50; i++){
        data[i]=25;
    }

    function getAjax( mesage ){
        object = JSON.parse(mesage);
        valorSerial = object.data;
        robo = object.data2;
        gas = object.data3
        console.log(robo , gas);
        messageAlert();


    }

    function messageAlert(){

        var mesR = robo=="T" ? "Alerta de robo!!" : "";
        var mesG = gas=="T" ? "Alerta de gas!!" : "";
        document.getElementById("robo").textContent = mesR
        document.getElementById("gas").textContent = mesG

        /*
        if(robo == "T"){

            document.getElementById("robo").textContent = "Alerta de robo!!"
        }else{
            document.getElementById("robo").textContent = ""
        }

        if(gas == "T"){
            document.getElementById("gas").textContent = "Alerta de Gas!!"
        }else{
            document.getElementById("gas").textContent = ""
        }
        */
    }

    function updateInformation(){
        $.ajax({
            url:'ajaxR',
            type : 'get',
            success : getAjax
        });
    }

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

            updateInformation();
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = valorSerial;


            if (y < 0) {
                y = 0;
            } else if (y > 50) {
                y = 50;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    // Set up the control widget

    var updateInterval = 900;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1) {
                updateInterval = 1;
            } else if (updateInterval > 2000) {
                updateInterval = 2000;
            }
            $(this).val("" + updateInterval);
        }
    });

    var plot = $.plot("#placeholder", [ getRandomData() ], {
        series: {
            shadowSize: 0	// Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 50
        },
        xaxis: {
            show: false
        }
    });

    function update() {

        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
    }

    update();


});
