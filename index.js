window.onload = descargarJSONTiempo

function tablas() {
    document.getElementById('tabla').style.display = 'block';
    document.getElementById('estadisticas').style.display = 'none';
    document.getElementById('medias').style.display = 'none';
    document.getElementById('estadisticasMinMax').style.display = 'none';
}

function estadisticasMedias() {
    document.getElementById('tabla').style.display = 'none';
    document.getElementById('estadisticas').style.display = 'block';
    document.getElementById('estadisticasMinMax').style.display = 'none';
    document.getElementById('medias').style.display = 'none';
}

function medias() {
    document.getElementById('tabla').style.display = 'none';
    document.getElementById('estadisticas').style.display = 'none';
    document.getElementById('estadisticasMinMax').style.display = 'none';
    document.getElementById('medias').style.display = 'block';
}

function estadisticasMinMax() {
    document.getElementById('tabla').style.display = 'none';
    document.getElementById('estadisticas').style.display = 'none';
    document.getElementById('medias').style.display = 'none';
    document.getElementById('estadisticasMinMax').style.display = 'block';
}


function descargarJSONTiempo() {
    if(window.XMLHttpRequest) {
        http = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    http.onreadystatechange = muestraContenido;

    http.open('GET', 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720', true);
    http.send(null);

    function muestraContenido() {
        if(http.readyState == 4 && http.status == 200) {
            var json = JSON.parse(http.responseText);
            var items = json['items'];

            var fechas = [];
            var nombres = [];

            var t_ambientes = [];
            var sum_t_ambientes = 0;
            var MAX_T_AMBIENTE = new Number(Number.MIN_VALUE);
            var MIN_T_AMBIENTE = new Number(Number.MAX_VALUE);

            var t_suelos = [];
            var sum_t_suelos = 0;
            var MAX_T_SUELOS = new Number(Number.MIN_VALUE);
            var MIN_T_SUELOS = new Number(Number.MAX_VALUE);

            var calidad_aires = [];
            var sum_calidad_aire = 0;
            var MAX_CALIDAD_AIRE = new Number(Number.MIN_VALUE);
            var MIN_CALIDAD_AIRE = new Number(Number.MAX_VALUE);

            var presion_aires = [];
            var sum_presion_aires = 0;
            var MAX_PRESION_AIRE = new Number(Number.MIN_VALUE);
            var MIN_PRESION_AIRE = new Number(Number.MAX_VALUE);

            var humedades = [];
            var sum_humedades = 0;
            var MAX_HUMEDAD = new Number(Number.MIN_VALUE);
            var MIN_HUMEDAD = new Number(Number.MAX_VALUE);

            var dir_vientos = [];
            var sum_dir_vientos = 0;
            var MAX_DIR_VIENTO = new Number(Number.MIN_VALUE);
            var MIN_DIR_VIENTO = new Number(Number.MAX_VALUE);

            var vel_vientos = [];
            var sum_vel_vientos = 0;
            var MAX_VEL_VIENTO = new Number(Number.MIN_VALUE);
            var MIN_VEL_VIENTO = new Number(Number.MAX_VALUE);

            var vel_rafagas = [];
            var sum_vel_rafagas = 0;
            var MAX_VEL_RAFAGA = new Number(Number.MIN_VALUE);
            var MIN_VEL_RAFAGA = new Number(Number.MAX_VALUE);

            for(let i = 0; i < items.length; i++) {
                fechas.push(items[i]['created_on']);
                nombres.push(items[i]['created_by']);

                t_ambientes.push(items[i]['ambient_temp']);
                if(t_ambientes[i] > MAX_T_AMBIENTE) {
                    MAX_T_AMBIENTE = t_ambientes[i];
                }
                if(t_ambientes[i] < MIN_T_AMBIENTE) {
                    MIN_T_AMBIENTE = t_ambientes[i];
                }
                sum_t_ambientes = sum_t_ambientes + parseInt(t_ambientes[i]);

                t_suelos.push(items[i]['ground_temp']);
                if(t_suelos[i] > MAX_T_SUELOS) {
                    MAX_T_SUELOS = t_suelos[i];
                }
                if(t_ambientes[i] < MIN_T_SUELOS) {
                    MIN_T_SUELOS = t_suelos[i];
                }
                sum_t_suelos = sum_t_suelos + parseInt(t_suelos[i]);
                
                calidad_aires.push(items[i]['air_quality']);
                if(calidad_aires[i] > MAX_CALIDAD_AIRE) {
                    MAX_CALIDAD_AIRE = calidad_aires[i];
                }
                if(calidad_aires[i] < MIN_CALIDAD_AIRE) {
                    MIN_CALIDAD_AIRE = calidad_aires[i];
                }
                sum_calidad_aire = sum_calidad_aire + parseInt(calidad_aires[i]);

                presion_aires.push(items[i]['air_pressure']);
                if(presion_aires[i] > MAX_PRESION_AIRE) {
                    MAX_PRESION_AIRE = presion_aires[i];
                }
                if(presion_aires[i] < MIN_PRESION_AIRE) {
                    MIN_PRESION_AIRE = presion_aires[i];
                }
                sum_presion_aires = sum_presion_aires + parseInt(presion_aires[i]);

                humedades.push(items[i]['humidity']);
                if(humedades[i] > MAX_HUMEDAD) {
                    MAX_HUMEDAD = humedades[i];
                }
                if(humedades[i] < MIN_HUMEDAD) {
                    MIN_HUMEDAD = humedades[i];
                }
                sum_humedades = sum_humedades + parseInt(humedades[i]);
                
                dir_vientos.push(items[i]['wind_direction']);
                if(dir_vientos[i] > MAX_DIR_VIENTO) {
                    MAX_DIR_VIENTO = dir_vientos[i];
                }
                if(dir_vientos[i] < MIN_DIR_VIENTO) {
                    MIN_DIR_VIENTO = dir_vientos[i];
                }
                sum_dir_vientos = sum_dir_vientos + parseInt(dir_vientos[i]);

                vel_vientos.push(items[i]['wind_speed']);
                if(vel_vientos[i] > MAX_VEL_VIENTO) {
                    MAX_VEL_VIENTO = vel_vientos[i];
                }
                if(vel_vientos[i] < MIN_VEL_RAFAGA) {
                    MIN_VEL_VIENTO = vel_vientos[i];
                }
                sum_vel_vientos = sum_vel_vientos + parseInt(vel_vientos[i]);

                vel_rafagas.push(items[i]['wind_gust_speed']);
                if(vel_rafagas[i] > MAX_VEL_RAFAGA) {
                    MAX_VEL_RAFAGA = vel_rafagas[i];
                }
                if(vel_rafagas[i] < MIN_VEL_RAFAGA) {
                    MIN_VEL_RAFAGA = vel_rafagas[i];
                }
                sum_vel_rafagas = sum_vel_rafagas + parseInt(vel_rafagas[i]);
            }

            var total_registros = nombres.length;

            // valores mininmos y maximos
            console.log('Max temp ambiente' + MAX_T_AMBIENTE);
            console.log('Min temp ambiente' + MIN_T_AMBIENTE);

            console.log('Max temp SUELO' + MAX_T_SUELOS);
            console.log('Min temp suelo' + MIN_T_SUELOS);


            // la media es
            console.log('La suma total de todas las temperaturas ambientes es : ' + sum_t_ambientes + ' y su media es: ' + sum_t_ambientes / total_registros);

            console.log('La suma total de todas las temperaturas de los suelos es : ' + sum_t_suelos + ' y su media es: ' + sum_t_suelos / total_registros);

            console.log('La suma total de todas las calidades de aires es : ' + sum_calidad_aire + ' y su media es: ' + sum_calidad_aire / total_registros);

            console.log('La suma total de todas las presiones atmosfericas es : ' + sum_presion_aires + ' y su media es: ' + sum_presion_aires / total_registros);

            console.log('La suma total de todas las humedades es : ' + sum_humedades + ' y su media es: ' + sum_humedades / total_registros);

            console.log('La suma total de todas las direcciones de viento es : ' + sum_dir_vientos + ' y su media es: ' + sum_dir_vientos / total_registros);

            console.log('La suma total de todas las velocidades de los vientos es : ' + sum_vel_vientos + ' y su media es: ' + sum_vel_vientos / total_registros);

            console.log('La suma total de todas las velocidades de las ragagas es : ' + sum_vel_rafagas + ' y su media es: ' + sum_vel_rafagas / total_registros);


            // cargamos la tabla
            var tbody = document.getElementById('tbody')
            for(let i = 0; i < nombres.length; i++){
                tbody.innerHTML += `<tr> 
                                <td>${fechas[i]}</td>
                                <td>${nombres[i]}</td>
                                <td>${t_ambientes[i]}°C</td>
                                <td>${t_suelos[i]}°C</td>
                                <td>${calidad_aires[i]}</td>
                                <td>${presion_aires[i]}atm</td>
                                <td>${humedades[i]}</td>
                                <td>${dir_vientos[i]}</td>
                                <td>${vel_vientos[i]}km/h</td>
                                <td>${vel_rafagas[i]}km/h</td>
                                </tr>`;
            }

            // Medias AVG
            var avg_t_ambiente = sum_t_ambientes / total_registros;
            var avg_t_suelo = sum_t_suelos / total_registros;
            var avg_calidad_aire = sum_calidad_aire / total_registros;
            var avg_presion_aire = sum_presion_aires / total_registros;
            var avg_humedad = sum_humedades / total_registros;
            var avg_dir_vientos = sum_dir_vientos / total_registros;
            var avg_vel_viento = sum_vel_vientos / total_registros;
            var avg_vel_rafaga = sum_vel_rafagas / total_registros;

            // cargamos la tabla de las medias
            var tbody_media = document.getElementById('tbody_media')
            tbody_media.innerHTML = `<tr> 
                                <td>${avg_t_ambiente}°C</td>
                                <td>${avg_t_suelo}°C</td>
                                <td>${avg_calidad_aire}</td>
                                <td>${avg_presion_aire}atm</td>
                                <td>${avg_humedad}</td>
                                <td>${avg_dir_vientos}</td>
                                <td>${avg_vel_viento}km/h</td>
                                <td>${avg_vel_rafaga}km/h</td>
                                </tr>`;
            

            // cargamos la tabla de las medias
            var tbody_maximos = document.getElementById('tbody_maximos')
            tbody_maximos.innerHTML = `<tr> 
                                <td>${MAX_T_AMBIENTE}°C</td>
                                <td>${MAX_T_SUELOS}°C</td>
                                <td>${MAX_CALIDAD_AIRE}</td>
                                <td>${MAX_PRESION_AIRE}atm</td>
                                <td>${MAX_HUMEDAD}</td>
                                <td>${MAX_DIR_VIENTO}</td>
                                <td>${MAX_VEL_VIENTO}km/h</td>
                                <td>${MAX_VEL_RAFAGA}km/h</td>
                                </tr>`;

            // cargamos la tabla de las medias
            var tbody_minimos = document.getElementById('tbody_minimos')
            tbody_minimos.innerHTML = `<tr> 
                                <td>${MIN_T_AMBIENTE}°C</td>
                                <td>${MIN_T_SUELOS}°C</td>
                                <td>${MIN_CALIDAD_AIRE}</td>
                                <td>${MIN_PRESION_AIRE}atm</td>
                                <td>${MIN_HUMEDAD}</td>
                                <td>${MIN_DIR_VIENTO}</td>
                                <td>${MIN_VEL_VIENTO}km/h</td>
                                <td>${MIN_VEL_RAFAGA}km/h</td>
                                </tr>`;
            
             
            // Estadisticas medias
            var ctx = document.getElementById('myChart').getContext('2d');

            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',
        
                // The data for our dataset
                data: {
                    labels: ['Temperatura ambiente', 'Temperatura suelo', 'Calidad del aire(ICA)', 'Presion del aire', 'Humedad', 'Dirección del viento', 'Velocidad del viento', 'Velocidad ráfaga de viento'],
                    datasets: [{
                        label: 'Valores de media',
                        backgroundColor: 'rgb(100, 99, 132)',
                        borderColor: 'rgb(100, 99, 132)',
                        data: [avg_t_ambiente, avg_t_suelo, avg_calidad_aire, avg_presion_aire, avg_humedad, avg_dir_vientos, avg_vel_viento, avg_vel_rafaga],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
        
                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            // Estadisticas maximas /minimas
            var myChart_secondary = document.getElementById('myChart_secondary');

            Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 18;

            var maxData = {
                label: 'Máximos',
                data: [MAX_T_AMBIENTE, MAX_T_SUELOS, MAX_CALIDAD_AIRE, MAX_PRESION_AIRE, MAX_HUMEDAD, MAX_DIR_VIENTO, MAX_VEL_VIENTO, MAX_VEL_RAFAGA],
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-max"
            };

            var minData = {
                label: 'Mínimos',
                data: [MIN_T_AMBIENTE, MIN_T_SUELOS, MIN_CALIDAD_AIRE, MIN_PRESION_AIRE, MIN_HUMEDAD, MIN_DIR_VIENTO, MIN_VEL_VIENTO, MIN_VEL_RAFAGA],
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-min"
            };

            var minMaxData = {
                labels: ['Temperatura ambiente', 'Temperatura suelo', 'Calidad del aire(ICA)', 'Presion del aire', 'Humedad', 'Dirección del viento', 'Velocidad del viento', 'Velocidad ráfaga de viento'],
                datasets: [maxData, minData]
            };

            var chartOptions = {
            scales: {
                xAxes: [{
                barPercentage: 1,
                categoryPercentage: 0.6
                }],
                yAxes: [{
                id: "y-axis-max"
                }, {
                id: "y-axis-min"
                }]
            }
            };

            var barChart = new Chart(myChart_secondary, {
                type: 'bar',
                data: minMaxData,
                options: chartOptions
            });


          
          
        }
    }
}