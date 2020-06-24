import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import api from '../../services';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'



const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

var cardChardData = [{}];
var cardChartOpts = [{}];

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      cardChardDataDash: [],
      cardChartOptsDash: []
    };
  }

  async componentDidMount(){

    let retornoVacinas = [];
      await api.get('appliedVaccines').then(
        function(data){
          retornoVacinas = data.data.conteudo;
        }
      ).catch(
        function(err) {
          console.log(err.response.data);
          let erro =  err.response.data.error;
          alert(`Algo inesperado aconteceu!\n ${erro}`);
        }
      );

      for (let index = 0; index < retornoVacinas.length ; index++) {
        const element = retornoVacinas[index];
        let mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let aplicacoes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let index = 0; index < element.dados.length; index++) {
          // mes[element.dados[index].mes - 1] = element.dados[index].mes === 1 ? 'Janeiro' :
          // element.dados[index].mes === 2 ? 'Fevereiro' :
          // element.dados[index].mes === 3 ? 'Março' :
          // element.dados[index].mes === 4 ? 'Abril' :
          // element.dados[index].mes === 5 ? 'Maio' :
          // element.dados[index].mes === 6 ? 'Junho' :
          // element.dados[index].mes === 7 ? 'Julho' :
          // element.dados[index].mes === 8 ? 'Agosto' :
          // element.dados[index].mes === 9 ? 'Setembro' :
          // element.dados[index].mes === 10 ? 'Outubro' :
          // element.dados[index].mes === 11 ? 'Novembro' : 'Dezembro';
          aplicacoes[element.dados[index].mes - 1 ] = element.dados[index].count;
        }

        cardChardData[index] = {
            labels: mes,
            name: element.name,
            corBackgroundCard: index === 0 ? brandPrimary :
                               index === 1 ? brandSuccess :
                               index === 2 ? brandInfo : brandDanger,
            datasets: [
              {
                label: 'Aplicações',
                backgroundColor: index === 0 ? brandPrimary :
                                 index === 1 ? brandSuccess :
                                 index === 2 ? brandInfo : brandDanger,
                borderColor: 'rgba(255,255,255,.55)',
                data: aplicacoes,
              },
            ],
        };

        cardChartOpts[index] = {
          tooltips: {
            enabled: false,
            custom: CustomTooltips
          },
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'transparent',
                  zeroLineColor: 'transparent',
                },
                ticks: {
                  fontSize: 2,
                  fontColor: 'transparent',
                },

              }],
            yAxes: [
              {
                display: false,
                ticks: {
                  display: false,
                  min: Math.min.apply(Math, cardChardData[index].datasets[0].data) - 5,
                  max: Math.max.apply(Math, cardChardData[index].datasets[0].data) + 5,
                },
              }],
          },
          elements: {
            line: {
              borderWidth: 1,
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4,
            },
          }
        }
      }

      this.setState({ cardChardDataDash: cardChardData, cardChartOptsDash: cardChartOpts });

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    const {
      cardChardDataDash,
      cardChartOptsDash
    } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
        {cardChardDataDash.map((post, index) => (
          <Col xs="12" sm="6" lg="3" key={index}>
            <Card className="text-white" style={{backgroundColor: `${post.corBackgroundCard}`}}>
              <CardBody className="pb-0">
                <div className="text-value">{post.name}</div>
              </CardBody>
               <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChardDataDash[index]} options={cardChartOptsDash[index]} height={70} />
               </div>
            </Card>
          </Col>
          ))}
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Campanhas</CardTitle>
                    <div className="small text-muted">Junho 2020</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
