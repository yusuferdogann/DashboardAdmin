import Button from "@mui/material/Button";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import $ from "jquery";
import Box from "@mui/material/Box";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [
        {
          paymentdetails: {
            amount: "",
          },
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddAmount = this.handleAddAmount.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleAddAmount = (event) => {
    let amountArray = [...this.state.customers.paymentdetails.amount];
    const value = event.target.value;
    const index = amountArray.findIndex((amount) => amount === value);
    if (index > -1) {
      amountArray = [
        ...amountArray.slice(0, index),
        ...amountArray.slice(index + 1),
      ];
    } else {
      amountArray.push(value);
    }

    let newCustomer = this.state.paymentdetailsTable;
    newCustomer.find((x) => x === this.state.customers).paymentdetails.amount =
      amountArray;

    this.setState({ paymentdetails: newCustomer });
  };

  handleAddPayment = (customers) => {
    this.setState({ paymentdetails: customers });
  };

  componentDidMount() {
    this.getBillingData();
  }
  getBillingData() {
    axios
      .get(`http://localhost:4000/customers`)
      .then((res) => {
        const customers = res.data;
        this.setState({
          customers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();

    const save = {
      paymentdetails: this.state.paymentdetails,
    };

    axios
      .post(`http://localhost:4000/customers/addpostamount`, save, {})
      .then((response) => {
        console.log(response.data);
        return $(".alert-success").show();
      });
    this.setState({
      paymentdetails: "",
    });
  }

  render() {
    const customers = this.state;
    return (
      <div>
        <div className="container">
          <div className="form-div">
            <h1>Add Payment Amount</h1>
            <Box
              component="form"
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className="container, width:100%">
                <div>
                  <div>
                    <div>
                      <div>
                        {customers.paymentdetails.map((item) => {
                          return (
                            <p>
                              <div>
                                <h7>
                                  <strong>paymentdetails</strong>
                                </h7>
                                <table>
                                  <tr>
                                    <th className="thead">Date </th>
                                    <th className="thead">RefCode </th>
                                    <th className="thead">Type</th>
                                    <th className="thead">Description </th>
                                    <th className="thead">Amount </th>
                                    <th className="thead">Discount </th>
                                    <th className="thead">Total </th>
                                  </tr>

                                  <tr key={item.paymentdetails}>
                                    <td>{item.date}</td>
                                    <td>{item.paymentReferenceCode}</td>
                                    <td>{item.paymentType}</td>
                                    <td>{item.paymentDescription}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.paymentDiscount}</td>
                                    <td>
                                      {item.totals}

                                      <Button
                                        variant="success"
                                        onClick={() =>
                                          this.handleAddPayment(item)
                                        }
                                      ></Button>
                                    </td>

                                    <td>
                                      <span>
                                        <select
                                          onChange={this.handleAddAmount}
                                          value={this.amount}
                                        >
                                          <option value="Amount"></option>
                                          <option value="500">500</option>
                                          <option value="100">100</option>
                                          <option value="200">200</option>
                                          <option value="50">50</option>
                                        </select>
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                <span className="btn btn-warning btn-block form-control form-group">
                  Submit
                </span>
              </Button>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
