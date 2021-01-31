import React, { Component } from 'react';
import './App.css';
import {Container, Col, Row, Button, ButtonGroup, Badge} from 'react-bootstrap';

let divNum = 0;
let people = 1;
let inputNum = -1;
let finalArray = [];
let debt = [];
let deleted = [];
let individualCosts = [];
let productNames = [];
let prices = [];
let assignments = [];
let productAmounts = [];
let totalCost = 0;

class Debt extends Component{
  render() {
  	return (
      <Row style={{marginTop: 5}}>
        <Badge variant="light">Debt</Badge>
        <Badge>:</Badge>
        <Badge variant="warning" pill>{'#' + (debt[this.props.person][this.props.debt][0] + 1)}</Badge>
        <Badge>➞</Badge>
        <Badge variant="danger">{debt[this.props.person][this.props.debt][1]}</Badge>
        <Badge>➞</Badge>
        <Badge variant="warning" pill>{'#' + (debt[this.props.person][this.props.debt][2] + 1)}</Badge>
      </Row>
    );
  }
}

class Product extends Component{
  render() {
  	return (
      <Row style={{marginBottom: 5}}>
        <Badge variant="success">{finalArray[this.props.person][this.props.product][0]}</Badge>
        <Badge>{'x' + finalArray[this.props.person][this.props.product][1]}</Badge>
        <Badge variant="secondary">{finalArray[this.props.person][this.props.product][2]}</Badge>
      </Row>
    );
  }
}

class Person extends Component{
  constructor(props) {
    super(props);
    this.state = {productList: [], debtList: []};
    this.addProduct = this.addProduct.bind(this);
    this.addDebt = this.addDebt.bind(this);
  }

  addProduct(person, product){
    const productList = this.state.productList;
    this.setState({
        productList: productList.concat(<Product person={person} product={product} key={productList.length} />)
    });
  }

  addDebt(person, debt){
    const debtList = this.state.debtList;
    this.setState({
      debtList: debtList.concat(<Debt person={person} debt={debt} key={debtList.length} />)
    });
  }

  render() {
  	return (
      <div id={"person-" + this.props.num}>
        <Row style={{marginBottom: 10, marginTop: 15}}>
          <Badge pill variant="warning">{'#' + (this.props.num + 1)}</Badge>
        </Row>
        <Col></Col>
        <Col>
          {this.state.productList}
          <Row style={{marginTop: 10}}>
            <Badge variant="light">Price</Badge>
            <Badge>:</Badge>
            <Badge variant="danger">{individualCosts[this.props.num]}</Badge>
          </Row>
          {this.state.debtList}
        </Col>
      </div>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {idNum: inputNum, assign: '##', products: 'x1'};
  }

  getProduct = (e) => {
    let id = parseInt((e.target.id).slice(8), 10);
    productNames[id] = e.target.value;
  }

  getPrice = (e) => {
    let id = parseInt((e.target.id).slice(6), 10);
    let val = e.target.value;
    let error = false;
    let minorError = false;
    let dots = 0;
    for(let i = 0; i < val.length; i ++){
      if(((val[i] >= 0 && val[i] <= 9) || val[i] === '.')){
        if(val[i] === '.'){
          dots ++;
          if(val.length-1 === i) minorError = true;
          if(val.length-3 > i) error = true;
        }
        if(dots > 1) error = true;
      } else {
        error = true;
      }
    }
    if(error === true){
      document.getElementById('price-' + id).style.backgroundColor = 'red';
      document.getElementById('price-' + id).style.borderColor = 'red';
    } else {
      if(minorError === true){
        document.getElementById('price-' + id).style.backgroundColor = 'orange';
        document.getElementById('price-' + id).style.borderColor = 'orange';
      } else {
        document.getElementById('price-' + id).style.backgroundColor = 'white';
        document.getElementById('price-' + id).style.borderColor = 'white';
        prices[id] = e.target.value;
      }
    }
  }

  handleDelete = (e) => {
    let id = parseInt((e.target.id).slice(4), 10);
    let div = document.getElementById('div-' + id);
    div.parentNode.removeChild(div);
    deleted.push(id);
  }

  assignIncrease = (e) => {
    let id = parseInt((e.target.id).slice(3), 10);
    let assignment = assignments[id];
    if(assignment !== people){
      assignment ++;
      assignments[id] = assignment;
      let assign = [...this.state.assign];
      assign = '#' + assignment;
      this.setState({assign});
    }
  }

  assignDecrease = (e) => {
    let id = parseInt((e.target.id).slice(3), 10);
    let assignment = assignments[id];
    if(assignment !== 0){
      assignment --;
      assignments[id] = assignment;
      let assign = [...this.state.assign];

      if(assignment === 0){
        assign = '##';
      } else {
        assign = '#' + assignment;
      }
      this.setState({assign});
    }
  }

  productsIncrease = (e) => {
    let id = parseInt((e.target.id).slice(3), 10);
    let product = productAmounts[id];
    product ++;
    productAmounts[id] = product;
    let products = [...this.state.products];
    products = 'x' + product;
    this.setState({products});
  }

  productsDecrease = (e) => {
    let id = parseInt((e.target.id).slice(3), 10);
    let product = productAmounts[id];
    if(product !== 1){
      product --;
      productAmounts[id] = product;
      let products = [...this.state.products];
      products = 'x' + product;
      this.setState({products});
    }
  }

  updateState = () => {
    let assign = [...this.state.assign];
    assign = '##';
    this.setState({assign});
  }

  render() {
  	return (
      <div id={"div-" + this.state.idNum} style={{marginBottom: 50}}>
        <Row>
          <Col>
            <input id={"product-" + this.state.idNum} type="text" className="form-control" placeholder="Product Name" onChange={this.getProduct} />
          </Col>
          <Col>
            <div className="input-group">
              <input id={"price-" + this.state.idNum} type="text" className="form-control" placeholder="Price" onChange={this.getPrice} />
              <div className="input-group-append">
                <button id={"btn-" + this.state.idNum} onClick={(e) => this.handleDelete(e)} className="btn btn-danger" type="button">🗑</button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="justify-content-center">
              <Col>
                <Badge>Assign to person:</Badge>
              </Col>
              <Col>
                <Button id={"bt-" + this.state.idNum} onClick={(e) => this.assignDecrease(e)}>–</Button>
                <Badge>{this.state.assign}</Badge>
                <Button id={"bt-" + this.state.idNum} onClick={(e) => this.assignIncrease(e)}>+</Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Col>
                <Badge>Number of products:</Badge>
              </Col>
              <Col>
                <Button id={"bt-" + this.state.idNum} onClick={(e) => this.productsDecrease(e)}>–</Button>
                <Badge>{this.state.products}</Badge>
                <Button id={"bt-" + this.state.idNum} onClick={(e) => this.productsIncrease(e)}>+</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputList: [], personList: []};
    this.addForm = this.addForm.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }

  addForm(){
    inputNum ++;
    productNames.push('');
    prices.push(0);
    assignments.push(0);
    productAmounts.push(1);
    this["myRef" + inputNum] = React.createRef();
    const inputList = this.state.inputList;
    this.setState({
        inputList: inputList.concat(<Input ref={this["myRef" + inputNum]} key={inputList.length} />)
    });
  }

  addPerson(person){
    divNum ++;
    this["productRef" + person] = React.createRef();
    const personList = this.state.personList;
    this.setState({
      personList: personList.concat(<Person ref={this["productRef" + person]} num={person} key={personList.length} />)
    });
  }

  handleIncrement = () => {
    people ++;
    this.setState({people});
  }

  handleDecrement = () => {
    if(people !== 1){
      people --;
      for(let i = 0; i < assignments.length; i ++){
        if(assignments[i] > people){
          assignments[i] = 0;
          setTimeout(() => {
            this["myRef" + i].current.updateState();
          }, 0);
        }
      }
      this.setState({people});
    }
  }

  componentDidMount = () => {
    for(let i = 0; i < 1; i ++){
      setTimeout(() => {
        this.addForm();
      }, 0);
    }
  }

  render() { 
    return ( 
      <div className="App">
        <header className="App-header">
          <Container style={{marginTop: 50, marginBottom: 50}}>
            <Col>
              <Row className="justify-content-end" style={{marginBottom: 50}}>
                <Col className="col-4 col-sm-3 col-md-2 col-lg-1">
                  <Row className="justify-content-center">
                    <Badge variant="light">{'#' + people}</Badge>
                  </Row>
                  <Row className="justify-content-center" style={{marginBottom: 2, marginTop: 5}}>
                    <ButtonGroup className="btn-group">
                      <Button onClick={this.handleDecrement}>–</Button>
                      <Button onClick={this.handleIncrement}>+</Button>
                    </ButtonGroup>
                  </Row>
                  <Row className="justify-content-center">
                    <Badge className="text-wrap">Number of people</Badge>
                  </Row>
                </Col>
              </Row>
              {this.state.inputList}
              <Row style={{marginBottom: 40}}>
                <Button id="i" onClick={this.addForm} block>+</Button>
                <Button onClick={this.handleCalculate} variant="secondary" block>Calculate</Button>
              </Row>
              {this.state.personList}
              <Row id="total" style={{marginTop: 40, display: 'none'}}>
                <Badge variant="info">Total Price</Badge>
                <Badge>:</Badge>
                <Badge variant="danger">{totalCost}</Badge>
              </Row>
            </Col>
          </Container>
        </header>
      </div>
     );
  }

  handleCalculate = () => {
    for(let i = 0; i < divNum; i ++){
      let div = document.getElementById('person-' + i);
      div.parentNode.removeChild(div);
    }
    divNum = 0;
    for(let i = 0; i < deleted.length; i ++){
      assignments[deleted[i]] = -1;
      prices[deleted[i]] = -1;
      productAmounts[deleted[i]] = -1;
      productNames[deleted[i]] = -1;
    }
    totalCost = 0;
    finalArray = [];
    debt = [];
    let mainArray = [];
    individualCosts = [];
    for(let i = 0; i < people; i ++){
      finalArray.push([]);
      debt.push([]);
      mainArray.push([]);
      individualCosts.push(0);
    }
    for(let i = 0; i < productNames.length; i ++){
      if(assignments[i] !== 0){
        for(let j = 0; j < productAmounts[i]; j ++){
          mainArray[(assignments[i])-1].push([productNames[i], prices[i]]);
          individualCosts[(assignments[i])-1] += parseFloat(prices[i], 10);
        }
      }
    }
    let allProducts = [];
    for(let i = 0; i < productNames.length; i ++){
      if(assignments[i] === 0){
        for(let j = 0; j < productAmounts[i]; j ++){
          allProducts.push([productNames[i], prices[i]]);
        }
      }
    }
    allProducts.sort(function(a, b){
      return b[1] - a[1];
    });
    function assignAllProducts(allProducts){
      if(allProducts.length > 0){
        for(let i = 0; i < productNames.length; i ++){
          if(allProducts[0][0] === productNames[i] && allProducts[0][1] === prices[i]){
            let lowestCost = [99999999999999, -1];
            for(let j = 0; j < people; j ++){
              if(individualCosts[j] < lowestCost[0]){
                lowestCost[0] = individualCosts[j];
                lowestCost[1] = j;
              }
            }
            mainArray[lowestCost[1]].push([productNames[i], prices[i]]);
            individualCosts[lowestCost[1]] += parseFloat(prices[i], 10);
            allProducts.shift();
            assignAllProducts(allProducts);
            break;
          }
        }
      }
    }
    assignAllProducts(allProducts);
    function individualProducts(person){
      if(mainArray[person].length > 0){
        let highestPrice = ['product', 0];
        for(let i = 0; i < mainArray[person].length; i ++){
          if(parseFloat(mainArray[person][i][1], 10) >= highestPrice[1]){
            highestPrice[1] = parseFloat(mainArray[person][i][1]);
            highestPrice[0] = mainArray[person][i][0];
          }
        }
        let howMany = 0;
        for(let i = 0; i < mainArray[person].length; i ++){
          if(highestPrice[0] === mainArray[person][i][0] && highestPrice[1] === parseFloat(mainArray[person][i][1])) howMany ++;
        }        
        finalArray[person].push([highestPrice[0], howMany, highestPrice[1].toFixed(2)]);
        for(let i = (mainArray[person].length)-1; i > -1; i --){
          if(highestPrice[0] === mainArray[person][i][0] && highestPrice[1] === parseFloat(mainArray[person][i][1])){
            mainArray[person].splice(i,1);
          }
        }
        individualProducts(person);
      }
    }
    let difference = [];
    for(let i = 0; i < people; i ++){
      individualProducts(i);
      individualCosts[i] = individualCosts[i].toFixed(2);
      totalCost += parseFloat(individualCosts[i],10);
      difference.push(parseFloat(individualCosts[i],10))
    }
    let equalCost = totalCost / people;
    function countDebt(){
      let lowestDifference = [9999999999999, -1];
      for(let i = 0; i < people; i ++){
        if(Math.abs(difference[i] - equalCost) <= Math.abs(lowestDifference[0]) && Math.abs(difference[i] - equalCost) > 0.01){
          lowestDifference[0] = (equalCost - difference[i]);
          lowestDifference[1] = i;
        }
      }
      if(Math.abs(lowestDifference[0]) > 0.01 && lowestDifference[0] < 9999999999999){
        let oppositeDifference = -1;
        for(let i = 0; i < people; i ++){
          if(lowestDifference[0] < 0){
            if((equalCost - difference[i]) > 0){
              oppositeDifference = i;
              break;
            }
          } else {
            if((equalCost - difference[i]) < 0){
              
              oppositeDifference = i;
              break;
            }
          }
        }
        difference[lowestDifference[1]] = equalCost;
        difference[oppositeDifference] = (difference[oppositeDifference] - lowestDifference[0]);
        if(lowestDifference[0] < 0){
          debt[lowestDifference[1]].push([oppositeDifference, Math.abs(lowestDifference[0]), lowestDifference[1]]);
          debt[oppositeDifference].push([oppositeDifference, Math.abs(lowestDifference[0]), lowestDifference[1]]);
        } else {
          debt[lowestDifference[1]].push([lowestDifference[1], Math.abs(lowestDifference[0]), oppositeDifference]);
          debt[oppositeDifference].push([lowestDifference[1], Math.abs(lowestDifference[0]), oppositeDifference]);
        }
        countDebt();
      }
    }
    countDebt();
    for(let i = 0; i < people; i ++){
      debt[i].sort(function(a, b){
        return b[1] - a[1];
      });
    }
    for(let i = 0; i < people; i ++){
      for(let j = 0; j < debt[i].length; j ++){
        debt[i][j][1] = debt[i][j][1].toFixed(2);
      }
    }
    for(let i = 0; i < people; i ++){
      setTimeout(() => {
        this.addPerson(i);
      }, 0);
    }
    for(let i = 0; i < people; i ++){
      for(let j = 0; j < finalArray[i].length; j ++){
        setTimeout(() => {
          this["productRef" + i].current.addProduct(i,j);
        }, 0);
      }
    }
    for(let i = 0; i < people; i ++){
      for(let j = 0; j < debt[i].length; j ++){
        setTimeout(() => {
          this["productRef" + i].current.addDebt(i,j);
        }, 0);
      }
    }
    totalCost = totalCost.toFixed(2);
    this.setState({totalCost});
    document.getElementById('total').style.display = 'block';
  }
}
 
export default App;
