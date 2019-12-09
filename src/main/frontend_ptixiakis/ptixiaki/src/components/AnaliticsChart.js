import React from "react";
import Chart from "react-google-charts";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import { PropTypes } from "prop-types";

const Analitics = ({ name, stData, onChartClick, checked, ...dim }) => {
  const months = [
    "January  ",
    "February ",
    "March    ",
    "April    ",
    "May      ",
    "June     ",
    "July     ",
    "August   ",
    "September",
    "October  ",
    "November ",
    "December "
  ];

  let style = "p-2 border rounded";
  checked ? (style += " border-primary ") : (style += " border-secondary");
  console.log("stData:" + JSON.stringify(stData));
  return (
    <div className={style}>
      <div className="d-flex justify-content-between">
        <h4>{name}</h4>
        <DropdownButton
          id="dropdown-basic-button"
          title="Last Year"
          size="sm"
          // disabled
        >
          <Dropdown.Item href="#/last-month">Last Month</Dropdown.Item>
          <Dropdown.Item href="#/last-week">Last Week</Dropdown.Item>
          <Dropdown.Item href="#/all">All</Dropdown.Item>
        </DropdownButton>
      </div>
      <div
        className="p-2 border border-secondary onHoverBackroundColor"
        onClick={onChartClick}
      >
        <Chart
          {...dim}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ["", "", { role: "style" }],
            ...months.map((month, index) => [
              month,
              stData && month in stData ? stData[month] : 0,
              ["blue", "black"]
            ])
          ]}
          options={{
            bar: { groupWidth: "95%" },
            legend: { position: "none" }
          }}
        />
      </div>
    </div>
  );
};

export default Analitics;
