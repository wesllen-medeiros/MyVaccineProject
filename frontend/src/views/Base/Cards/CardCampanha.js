import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, CardBody, Col, Row, CardText, Fade, CardHeader,Label,Collapse} from 'reactstrap';
import dateformat from 'dateformat'

import api from '../../../services/index';


class CardCampanha extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };

    this.state = {
      campanhas:[],
    };
  
  }


  async componentDidMount() {
    try {
      const res = await api.get('campaign');
      console.log(res);
      
      this.setState({ campanhas: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    
    return (
      <div className="animated fadeIn"><br></br>
        <Row>
          <Col xs="12"  md="4">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            {this.state.campanhas.map(post => (
            <Card key={post.id} >
              <CardHeader className="text-white bg-info">
               {post.descricao}
                  <div className="card-header-actions">
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></a>
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-close" onClick={this.toggleFade}><i class="fa fa-trash" aria-hidden="true"></i></a>                
                  </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} id="collapseExample">
              <CardBody>
              <Col>
              <div class="container">
                <div class="row">
                  <div class="col">
                  <Label><h6>Público-alvo</h6></Label>
                  <CardText>{post.audience}</CardText>              
                  </div>
                  <div class="col">
                  <Label><h6>Dose</h6></Label>
                  <CardText>{post.dose}</CardText>
                  </div>
                </div>
              </div> <br></br>
            

              <div class="container">
                <div class="row">
                  <div class="col">
                  <Label><h6>Estado</h6></Label>
                  <CardText>{post.state}</CardText>               
                  </div>
                  <div class="col">
                  <Label><h6>Município</h6></Label>
                  <CardText>{post.municipio}</CardText>
                  </div>
                </div>
              </div> <br></br>

              <div class="container">
                <div class="row">
                  <div class="col">
                  <Label><h6>Dt. Liberação</h6></Label>
                  <CardText>{dateformat(new Date(post.dt_ini).setDate(new Date(post.dt_ini).getDate() + 1), 'dd/mm/yyyy')}</CardText>            
                  </div>
                  <div class="col">
                  <Label><h6>Dt. Fim Liberação</h6></Label>
                  <CardText>{dateformat(new Date(post.dt_fim).setDate(new Date(post.dt_fim).getDate() + 1), 'dd/mm/yyyy')}</CardText>
                  </div>
                </div>
              </div> <br></br>
        

              <div class="container">
                <div class="row">
                  <div class="col">
                  <Label><h6>Idade Inicial</h6></Label>
                  <CardText>{post.min_age}</CardText>              
                  </div>
                  <div class="col"> 
                  <Label><h6>Idade Limite</h6></Label>
                  <CardText>{post.max_age}</CardText>
                  </div>
                  <div class="col"> 
                  <Label><h6>Tipo</h6></Label>
                  <CardText>{post.unity_age}</CardText>
                  </div>
                </div>
              </div> <br></br>

              <div class="container">
                <div class="row">
                  <div class="col">
                  <Label><h6>Estabelecimento</h6></Label>
                  <CardText>{post.Estab.nm_fantasia}</CardText>              
                  </div>
                  <div class="col"> 
                  <Label><h6>Vacina</h6></Label>
                  <CardText>{post.vaccine.name}</CardText>
                  </div>
                </div>
              </div> <br></br>

              </Col>
              </CardBody>
            </Collapse>
            </Card>
            ))}
            </Fade>
          </Col>
          <Col xs="8">               
            <Link to="../Forms/addCampanha">
              <button type="button" class="btn btn-primary btn-circle btn-xl"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </Link> 
          </Col>
        </Row> 
      </div>     
    );
  }
}

export default CardCampanha;
