import React from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import './Weather.css';
import MaterialTable from "material-table";
import NotificationSystem from "react-notification-system";

let citiesNumber = 0;
const maxCities = 5;


class Weather extends React.Component {

    notificationSystem = React.createRef();

    constructor(props) {

        super(props);
        this.state = {
            insCity: '',
            city: {
                name: '',
                currentTemp: '',
                sunrise: '',
                sunset: '',
            },
            options: {
                title: {
                    text: "Temperatura (ºC)",
                    align: 'center',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '14px',
                      fontWeight:  'bold',
                      color:  '#263238'
                    },
            },
            chart: {
                background: "#FFFFFF",
                id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },
            series: [
              {
                name: "ºC",
                data: []
              }
            ],
            row1: {
               cidade: '',
               temp: '',
               nascsol: '',
               porsol: ''     
              },
            row2: {
                cidade: '',
                temp: '',
                nascsol: '',
                porsol: ''     
              },
            row3: {
              cidade: '',
              temp: '',
              nascsol: '',
              porsol: ''     
              },
            row4: {
              cidade: '',
              temp: '',
              nascsol: '',
              porsol: ''     
                },
            row5: {
              cidade: '',
              temp: '',
              nascsol: '',
              porsol: ''     
             }
      

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    
    // Send inserted city to node
    async sendValueToNode() {
      
            let send = {
                insertedCity: this.state.insCity
            }
            axios.post('http://localhost:4001/search-location',send)
                .then((response) => {
                    console.log(response);

                    if(response.data.name === 'Error'){
                      const notification = this.notificationSystem.current;
                      notification.addNotification({
                      title: "Cidade não encontrada! ",
                      message: "Insira outra cidade ",
                      level: "error"
                      });
                    }

                    else if(response.status === 200){

                      this.fetchWeather();
                    }
                   
 
                },(error) => {
                    console.log(error);
                });
      
    }

    
    // Fetch the weather from the internal API
    async fetchWeather() {

        let response = await fetch('http://localhost:4001/weather');
          
        await response.json().then(data => {

            // City found, added +1 to number of cities
            citiesNumber++;
            console.log(citiesNumber);

            let newCity = { city: data.name, temp: data.main.temp, sunrise: data.sys.sunrise,
            sunset: data.sys.sunset, humidity: data.main.humidity};
            
            // Store the city data in localSorage
            localStorage.setItem(citiesNumber, JSON.stringify(newCity));
            
            // USER INSERTED 1 CITY
            if(citiesNumber === 1){
            let city1 = localStorage.getItem(1);
            city1 = JSON.parse(city1);
            console.log(city1);

                this.setState({
                    options: {
                      xaxis: {
                        categories: [city1.city]
                      }
                    },
                    series: [
                      {
                        data: [Math.round(city1.temp - 273.15)]
                      }
                    ],
                    row1: {
                      cidade: city1.city,
                      temp: Math.round(city1.temp - 273.15),
                      nascsol: new Date(city1.sunrise * 1000).toLocaleTimeString('pt-IN'),
                      porsol: new Date(city1.sunset * 1000).toLocaleTimeString('pt-IN')     
                     }
                      
                })
            }

            // USER INSERTED 2 CITIES
            if(citiesNumber === 2){
                let city1 = localStorage.getItem(1);
                city1 = JSON.parse(city1);
                let city2 = localStorage.getItem(2);
                city2 = JSON.parse(city2);

                console.log(city2);    
    
                    this.setState({
                        options: {
                          xaxis: {
                            categories: [city1.city, city2.city]
                          }
                        },
                        series: [
                          {
                            data: [Math.round(city1.temp - 273.15) + '°C', Math.round(city2.temp - 273.15) + '°C']
                          }
                        ],
                        row1: {
                          cidade: city1.city,
                          temp: Math.round(city1.temp - 273.15),
                          nascsol: new Date(city1.sunrise * 1000).toLocaleTimeString('pt-IN'),
                          porsol: new Date(city1.sunset * 1000).toLocaleTimeString('pt-IN')     
                         },
                         row2: {
                          cidade: city2.city,
                          temp: Math.round(city2.temp - 273.15),
                          nascsol: new Date(city2.sunrise * 1000).toLocaleTimeString('pt-IN'),
                          porsol: new Date(city2.sunset * 1000).toLocaleTimeString('pt-IN')     
                         }
                        
                    })
                }
                
                // USER INSERTED 3 CITIES
                if(citiesNumber === 3){
                    let city1 = localStorage.getItem(1);
                    city1 = JSON.parse(city1);
                    let city2 = localStorage.getItem(2);
                    city2 = JSON.parse(city2);
                    let city3 = localStorage.getItem(3);
                    city3 = JSON.parse(city3);
    
                    console.log(city3);
        
                        this.setState({
                            options: {
                              xaxis: {
                                categories: [city1.city, city2.city, city3.city]
                              }
                            },
                            series: [
                              {
                                data: [Math.round(city1.temp - 273.15) + '°C', Math.round(city2.temp - 273.15) + '°C',
                                         Math.round(city3.temp - 273.15) + '°C']
                              }
                            ],
                            row1: {
                              cidade: city1.city,
                              temp: Math.round(city1.temp - 273.15),
                              nascsol: new Date(city1.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city1.sunset * 1000).toLocaleTimeString('pt-IN')     
                             },
                             row2: {
                              cidade: city2.city,
                              temp: Math.round(city2.temp - 273.15),
                              nascsol: new Date(city2.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city2.sunset * 1000).toLocaleTimeString('pt-IN')     
                             },
                             row3: {
                              cidade: city3.city,
                              temp: Math.round(city3.temp - 273.15),
                              nascsol: new Date(city3.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city3.sunset * 1000).toLocaleTimeString('pt-IN')     
                             }
                            
                        })
                    }

                    // USER INSERTED 4 CITIES
                    if(citiesNumber === 4){
                    let city1 = localStorage.getItem(1);
                    city1 = JSON.parse(city1);
                    let city2 = localStorage.getItem(2);
                    city2 = JSON.parse(city2);
                    let city3 = localStorage.getItem(3);
                    city3 = JSON.parse(city3);
                    let city4 = localStorage.getItem(4);
                    city4 = JSON.parse(city4);
    
                    console.log(city4);
        
                        this.setState({
                            options: {
                              xaxis: {
                                categories: [city1.city, city2.city, city3.city, city4.city]
                              }
                            },
                            series: [
                              {
                                data: [Math.round(city1.temp - 273.15) + '°C', Math.round(city2.temp - 273.15) + '°C',
                                         Math.round(city3.temp - 273.15) + '°C', Math.round(city4.temp - 273.15) + '°C']
                              }
                            ],
                            row1: {
                              cidade: city1.city,
                              temp: Math.round(city1.temp - 273.15),
                              nascsol: new Date(city1.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city1.sunset * 1000).toLocaleTimeString('pt-IN')     
                             },
                             row2: {
                              cidade: city2.city,
                              temp: Math.round(city2.temp - 273.15),
                              nascsol: new Date(city2.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city2.sunset * 1000).toLocaleTimeString('pt-IN')     
                             },
                             row3: {
                              cidade: city3.city,
                              temp: Math.round(city3.temp - 273.15),
                              nascsol: new Date(city3.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city3.sunset * 1000).toLocaleTimeString('pt-IN')     
                             },
                             row4: {
                              cidade: city4.city,
                              temp: Math.round(city4.temp - 273.15),
                              nascsol: new Date(city4.sunrise * 1000).toLocaleTimeString('pt-IN'),
                              porsol: new Date(city4.sunset * 1000).toLocaleTimeString('pt-IN')     
                             }
                            
                        })
                    }

                    // USER INSERTED 5 CITIES
                    if(citiesNumber === 5){
                        let city1 = localStorage.getItem(1);
                        city1 = JSON.parse(city1);
                        let city2 = localStorage.getItem(2);
                        city2 = JSON.parse(city2);
                        let city3 = localStorage.getItem(3);
                        city3 = JSON.parse(city3);
                        let city4 = localStorage.getItem(4);
                        city4 = JSON.parse(city4);
                        let city5 = localStorage.getItem(5);
                        city5 = JSON.parse(city5);
        
                        console.log(city5);
            
                            this.setState({
                                options: {
                                  xaxis: {
                                    categories: [city1.city, city2.city, city3.city, city4.city, city5.city]
                                  }
                                },
                                series: [
                                  {
                                    data: [Math.round(city1.temp - 273.15) + '°C', Math.round(city2.temp - 273.15) + '°C',
                                           Math.round(city3.temp - 273.15) + '°C', Math.round(city4.temp - 273.15) + '°C', 
                                           Math.round(city5.temp - 273.15) + '°C']
                                  }
                                ],
                                row1: {
                                  cidade: city1.city,
                                  temp: Math.round(city1.temp - 273.15),
                                  nascsol: new Date(city1.sunrise * 1000).toLocaleTimeString('pt-IN'),
                                  porsol: new Date(city1.sunset * 1000).toLocaleTimeString('pt-IN')     
                                 },
                                 row2: {
                                  cidade: city2.city,
                                  temp: Math.round(city2.temp - 273.15),
                                  nascsol: new Date(city2.sunrise * 1000).toLocaleTimeString('pt-IN'),
                                  porsol: new Date(city2.sunset * 1000).toLocaleTimeString('pt-IN')     
                                 },
                                 row3: {
                                  cidade: city3.city,
                                  temp: Math.round(city3.temp - 273.15),
                                  nascsol: new Date(city3.sunrise * 1000).toLocaleTimeString('pt-IN'),
                                  porsol: new Date(city3.sunset * 1000).toLocaleTimeString('pt-IN')     
                                 },
                                 row4: {
                                  cidade: city4.city,
                                  temp: Math.round(city4.temp - 273.15),
                                  nascsol: new Date(city4.sunrise * 1000).toLocaleTimeString('pt-IN'),
                                  porsol: new Date(city4.sunset * 1000).toLocaleTimeString('pt-IN')     
                                 },
                                 row5: {
                                  cidade: city5.city,
                                  temp: Math.round(city5.temp - 273.15),
                                  nascsol: new Date(city5.sunrise * 1000).toLocaleTimeString('pt-IN'),
                                  porsol: new Date(city5.sunset * 1000).toLocaleTimeString('pt-IN')     
                                 }

                                
                            })
                        }
                      
        })
     

    } 

    // Submit function, triggered when user click the "Confirmar" button
    handleSubmit(e) {
    
        e.preventDefault();

        // Check if number of cities added is less then 5(max cities), if not, show notification
        if(citiesNumber < maxCities){
            this.sendValueToNode();
        }
        else{
          const notification = this.notificationSystem.current;
          notification.addNotification({
          title: "Numero máximo de cidades atingido! ",
          message: "Clique no botão de refresh ",
          level: "warning"
        });
        }

        document.getElementById("formCity").reset();
    }

    //Check the values that the user insert in the input textfield and set the state accordingly
    handleInputChange(e) {

        this.setState({
            insCity: e.target.value,
        });
    }

    handleKeyPress = (e) => {
      if(e.key === 'Enter'){
        console.log('enter press here! ')
      }
    }

    
    render() {

        return (
             <div >
                <form onSubmit={this.handleSubmit} id="formCity">
                    <p align="left" className="desafio">Hugo Simão</p>
                    <button className="buttonRefresh" onClick={() => window.location.reload(false)} />
                    <div style={{display: 'flex', justifyContent: 'center' }}>
                       <div className="control1">
                                <input className="inputCityField" id="cityField" type="text" onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit(e)} placeholder={("Número de cidades restantes:"+ (5-citiesNumber))} onChange={this.handleInputChange} required  />
                                <input type='submit' className="buttonInsert" value='Confirmar'  />
                                <NotificationSystem ref={this.notificationSystem} />
                       </div>
                    </div>
                </form>
                <div className="graphs"> 
             <div className="barGraph"> 
         <Chart
            categories={this.state.options.xaxis.categories}
            data={this.state.series.data}
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="450"
            />
            </div>
            <div className="tableDesign" >
        <MaterialTable
           columns={[
            { title: "Cidade", field: "cidade"},
            { title: "Temperatura(ºC)", field: "temp" },
            { title: "Nascer-do-Sol", field: "nascsol"},
            { title: "Pôr-do-sol",field: "porsol",
            }
            ]}
            data={[this.state.row1, this.state.row2, this.state.row3, this.state.row4, this.state.row5]}
            options={{
            filtering: false,
            search: false,
            paging: false,
            showTitle: false,
            toolbar: false,
            alignItems: 'center',
            textAlign: 'center',
            headerStyle: {
                  backgroundColor: '#FFFFFF',
                  color: 'Black',
                  whiteSpace: 'nowrap'
            }
    
          }}
          />
                </div>
            </div>
         </div>
                  
        )
    }
}


export default Weather;

