
$(function() {

    // We use an inline data source in the example, usually data would
    // be fetched from a server
    var valorSerial = 100;

    var data = [],
        totalPoints = 300;

    for(var i = 0; i<300; i++){
        data[i]=25;
    }

    function ajaxGet(url, callback){
        var req = new XMLHttpRequest();
        req.open("GET",url,true);
        req.addEventListener("load",function(){
            if(req.status>=200 && req.status <400){
                callback(req.responseText);
            }else{
                //console.error(req.status+"primer error "+req.statusText);
            }
            if(req.status==500){
                console.error("error 500");
            }
        });
        req.addEventListener("error",function(){
            //console.error("Erro de la Super Red");
        });
        req.send(null);
    }

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

            ajaxGet("ajaxR",function(respuesta){
                object = JSON.parse(respuesta);
                valorSerial = object.dato;
                console.log(valorSerial);

            });

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

    var updateInterval = 1000;
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
