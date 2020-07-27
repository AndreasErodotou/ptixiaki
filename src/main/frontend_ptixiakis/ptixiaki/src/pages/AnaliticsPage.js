import React, { Component } from "react";
import Analitics from "../components/AnaliticsChart";
import SimpleTemplatePage from "./templates/SimpleTemplatePage";
import AuthContext from "../context/auth-context";
import {getReq} from "../requests/Request"

class AnaliticsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      analitics: {},
      checked: "Listings"
    };
  }
  static contextType = AuthContext;
  componentDidMount() {
    getReq(`statistics/${this.context.username}`,(res) => {
      this.setState({
        ...this.state,
        analitics: res.data.data
      });
    })
  }

  chartClick(chartName) {
    this.setState({
      ...this.state,
      checked: chartName
    });
  }

  render() {
    // const analiticsTmp = this.state.analitics.map((category, index) => (
    //   <div key={index}>
    //     <Analitics
    //       data={category}
    //       width="250px"
    //       height="110px"
    //       checked={true}
    //     />
    //     <div className="d-flex justify-content-center">
    //       <div className="line"></div>
    //     </div>
    //   </div>
    // ));

    // const analitics = (
    //   <div className="mx-3 mt-2">
    //     <div className="d-flex justify-content-between">
    //       <div className="d-flex-column">{analiticsTmp}</div>
    //     </div>
    //   </div>
    // );
    const isListingChecked = this.state.checked === "Listings";
    const isBidsChecked = this.state.checked === "Bids";
    const isReviewsChecked = this.state.checked === "Reviews";
    const isMoneyChecked = this.state.checked === "Money";

    const visible = "d-flex justify-content-center";
    const invisible = "d-flex justify-content-center invisible";
    const listingsLine = isListingChecked ? visible : invisible;
    const bidsLine = isBidsChecked ? visible : invisible;
    const reviewsLine = isReviewsChecked ? visible : invisible;
    const moneyLine = isMoneyChecked ? visible : invisible;

    console.log("analitics\n" + JSON.stringify(this.state.analitics));
    console.log("listingsLine: " + listingsLine);

    const analitics = (
      <div className="mx-3 mt-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex-column">
            <Analitics
              name="Listings Won"
              stData={this.state.analitics.Listings}
              width="250px"
              height="110px"
              checked={isListingChecked}
              onChartClick={() => this.chartClick("Listings")}
            />
            <div className={listingsLine}>
              <div className="line"></div>
            </div>
          </div>

          <div>
            <Analitics
              name="Bids Made"
              stData={this.state.analitics.Bids}
              width="250px"
              height="110px"
              checked={isBidsChecked}
              onChartClick={() => this.chartClick("Bids")}
            ></Analitics>
            <div className={bidsLine}>
              <div className="line"></div>
            </div>
          </div>

          <div>
            <Analitics
              name="Reviews Made"
              stData={this.state.analitics.Reviews}
              width="250px"
              height="110px"
              checked={isReviewsChecked}
              onChartClick={() => this.chartClick("Reviews")}
            ></Analitics>
            <div className={reviewsLine}>
              <div className="line"></div>
            </div>
          </div>
          <div>
            <Analitics
              name="Money Made"
              stData={this.state.analitics.Money}
              width="250px"
              height="110px"
              checked={isMoneyChecked}
              onChartClick={() => this.chartClick("Money")}
            ></Analitics>
            <div className={moneyLine}>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Analitics
            name={this.state.checked}
            stData={this.state.analitics[this.state.checked]}
            width="100%"
            height="280px"
            checked={true}
          ></Analitics>
        </div>
      </div>
    );
    return <SimpleTemplatePage content={analitics} />;
  }
}

AnaliticsPage.propTypes = {};

export default AnaliticsPage;
