import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import api from "../../services";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
//const brandInfo = getStyle('--info')
const brandDanger = getStyle("--danger");
const brandWarning = getStyle("--warning");

var cardChardData = [{}];
var cardChartOpts = [{}];
var mainChart = {};
var mainChartOpts = {};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      cardChardDataDash: [],
      cardChartOptsDash: [],
      mainChartDash: {},
      mainChartOptsDash: {},
    };
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async componentDidMount() {
    let retornoVacinas = [];
    await api
      .get("appliedVaccines")
      .then(function (data) {
        retornoVacinas = data.data.conteudo;
      })
      .catch(function (err) {
        console.log(err.response.data);
        let erro = err.response.data.error;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      });

    for (let index = 0; index < retornoVacinas.length; index++) {
      let mes = [];
      let dataAtual = new Date();
      let aplicacoes = [];

      for (let index = 0; index < dataAtual.getMonth() + 1; index++) {
        mes[index] =
          index + 1 === 1
            ? "Janeiro"
            : index + 1 === 2
            ? "Fevereiro"
            : index + 1 === 3
            ? "Março"
            : index + 1 === 4
            ? "Abril"
            : index + 1 === 5
            ? "Maio"
            : index + 1 === 6
            ? "Junho"
            : index + 1 === 7
            ? "Julho"
            : index + 1 === 8
            ? "Agosto"
            : index + 1 === 9
            ? "Setembro"
            : index + 1 === 10
            ? "Outubro"
            : index + 1 === 11
            ? "Novembro"
            : "Dezembro";

        aplicacoes[index] = 0;
      }

      const element = retornoVacinas[index];

      for (let index = 0; index < element.dados.length; index++) {
        aplicacoes[element.dados[index].mes - 1] =
          element.dados[index].aplicacoes;
      }

      cardChardData[index] = {
        labels: mes,
        name: element.name,
        corBackgroundCard:
          index === 0
            ? brandPrimary
            : index === 1
            ? brandSuccess
            : index === 2
            ? brandWarning
            : brandDanger,
        datasets: [
          {
            label: "Aplicações",
            backgroundColor:
              index === 0
                ? brandPrimary
                : index === 1
                ? brandSuccess
                : index === 2
                ? brandWarning
                : brandDanger,
            borderColor: "rgba(255,255,255,.55)",
            data: aplicacoes,
          },
        ],
      };

      cardChartOpts[index] = {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "transparent",
                zeroLineColor: "transparent",
              },
              ticks: {
                fontSize: 2,
                fontColor: "transparent",
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                display: false,
                min:
                  Math.min.apply(Math, cardChardData[index].datasets[0].data) -
                  5,
                max:
                  Math.max.apply(Math, cardChardData[index].datasets[0].data) +
                  5,
              },
            },
          ],
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
        },
      };

      mes = [];
      aplicacoes = [];
    }

    this.setState({
      cardChardDataDash: cardChardData,
      cardChartOptsDash: cardChartOpts,
    });

    let retornoCampaigns = [];

    await api
      .get("campaignVaccines")
      .then(function (data) {
        retornoCampaigns = data.data.conteudo;
      })
      .catch(function (err) {
        console.log(err.response.data);
        let erro = err.response.data.error;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      });

    console.log(retornoCampaigns);

    let mes = ["", "", "", "", "", ""];
    let dataAtual = new Date();
    let aplicacoes = [];
    let dataset = [];

    for (let index = 0; index < retornoCampaigns.length; index++) {
      let validaData =
        retornoCampaigns[index].mes_final < dataAtual.getMonth() + 1 &&
        retornoCampaigns[index].ano_final === dataAtual.getFullYear()
          ? retornoCampaigns[index].mes_final
          : dataAtual.getMonth() + 1;
      for (
        let indexMes = retornoCampaigns[index].mes_inicial - 1;
        indexMes < validaData;
        indexMes++
      ) {
        mes[indexMes] =
          indexMes + 1 === 1
            ? "Jan"
            : indexMes + 1 === 2
            ? "Fev"
            : indexMes + 1 === 3
            ? "Mar"
            : indexMes + 1 === 4
            ? "Abr"
            : indexMes + 1 === 5
            ? "Mai"
            : indexMes + 1 === 6
            ? "Jun"
            : indexMes + 1 === 7
            ? "Jul"
            : indexMes + 1 === 8
            ? "Ago"
            : indexMes + 1 === 9
            ? "Set"
            : indexMes + 1 === 10
            ? "Out"
            : indexMes + 1 === 11
            ? "Nov"
            : "Dez";

        aplicacoes[indexMes] = 0;
      }

      const element = retornoCampaigns[index];
      let colorBackground = this.getRandomColor();

      for (
        let indexDados = 0;
        indexDados < element.dados.length;
        indexDados++
      ) {
        aplicacoes[element.dados[indexDados].mes - 1] =
          element.dados[indexDados].aplicacoes;
      }

      dataset[index] = {
        label: element.descricao,
        backgroundColor: "transparent",
        borderColor: colorBackground,
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: aplicacoes,
      };
      aplicacoes = [];
    }

    mainChart = {
      labels: mes,
      datasets: dataset,
    };

    console.log(mainChart);

    mainChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: "index",
        position: "nearest",
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {
              backgroundColor:
                chart.data.datasets[tooltipItem.datasetIndex].borderColor,
            };
          },
        },
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
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              maxTicksLimit: 5,
              stepSize: Math.ceil(150 / 5),
              max: 150,
            },
          },
        ],
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

    this.setState({
      mainChartDash: mainChart,
      mainChartOptsDash: mainChartOpts,
    });
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

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const {
      cardChardDataDash,
      cardChartOptsDash,
      mainChartDash,
      mainChartOptsDash,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          {cardChardDataDash.map((post, index) => (
            <Col xs="12" sm="6" lg="3" key={index}>
              <Card
                className="text-white"
                style={{ backgroundColor: `${post.corBackgroundCard}` }}
              >
                <CardBody className="pb-0">
                  <div className="text-value">{post.name}</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                  <Line
                    data={cardChardDataDash[index]}
                    options={cardChartOptsDash[index]}
                    height={70}
                  />
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
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block"></Col>
                </Row>
                  <div
                    className="chart-wrapper myChartDiv"
                    style={{ marginTop: 40 + "px" }}
                  >
                    <Line
                      data={mainChartDash}
                      options={mainChartOptsDash}
                      height={60}
                    />
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
