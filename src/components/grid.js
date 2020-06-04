import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      order: 'desc',
    };
  }
  componentDidMount() {
    fetch('https://www.json-generator.com/api/json/get/cgqmjhLSjS?indent=2')
      .then((res) => res.json())
      .then((result) => this.setState({ userData: result }));
  }
  clickHandler = (order, type) => {
    let data;
    switch (order) {
      case 'asc':
        data = this.state.userData.sort((a, b) => {
          let data;
          switch (type) {
            case 'name':
              data =
                (a.name.firstName > b.name.firstName) -
                (a.name.firstName < b.name.firstName);
              break;
            case 'city':
              data =
                (a.address.city > b.address.city) -
                (a.address.city < b.address.city);
              break;
            case 'company':
              data = (a.company > b.company) - (a.company < b.company);
              break;
            case 'age':
              data = a.age - b.age;
              break;
            case 'date':
              data = a.registered - b.registered;
              break;
            default:
              return '';
          }
          console.log(data);
          return data;
        });
        break;
      case 'desc':
        data = this.state.userData.sort((a, b) => {
          let data;
          switch (type) {
            case 'name':
              data =
                (b.name.firstName > a.name.firstName) -
                (b.name.firstName < a.name.firstName);
              break;
            case 'city':
              data =
                (b.address.city > a.address.city) -
                (b.address.city < a.address.city);
              break;
            case 'company':
              data = (b.company > a.company) - (b.company < a.company);
              break;
            case 'age':
              data = b.age - a.age;
              break;
            case 'date':
              data = b.registered - a.registered;
              break;
            default:
              return '';
          }
          return data;
        });
        break;
      default:
        return '';
    }
    this.setState({
      userData: data,
      order: this.state.order === 'desc' ? 'asc' : 'desc',
    });
  };
  render() {
    return (
      <Fragment>
        <div>
          <div className="head">User Details</div>
          <div>
            <Container className="cont">
              <Row md={7} className="tableHead">
                <Col className="headCol">#</Col>
                <Col
                  className="headCol"
                  onClick={() => this.clickHandler(this.state.order, 'name')}
                >
                  Name
                </Col>
                <Col
                  className="headCol"
                  onClick={() => this.clickHandler(this.state.order, 'city')}
                >
                  City
                </Col>
                <Col
                  className="headCol"
                  onClick={() => this.clickHandler(this.state.order, 'company')}
                >
                  Company
                </Col>
                <Col className="headCol">Phone</Col>
                <Col
                  className="headCol"
                  onClick={() => this.clickHandler(this.state.order, 'age')}
                >
                  Age
                </Col>
                <Col
                  className="headCol"
                  onClick={() => this.clickHandler(this.state.order, 'date')}
                >
                  Date
                </Col>
              </Row>
              {this.state.userData.map((data) => {
                return (
                  <Row key={data.index}>
                    <Col className="headCol">{data.index + 1}</Col>
                    <Col className="headCol">{data.name.firstName}</Col>
                    <Col className="headCol">{data.address.city}</Col>
                    <Col className="headCol">{data.company}</Col>
                    <Col className="headCol">{data.phone}</Col>
                    <Col className="headCol">{data.age}</Col>
                    <Col className="headCol">
                      {new Date(data.registered).toLocaleDateString()}
                    </Col>
                  </Row>
                );
              })}
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Grid;
