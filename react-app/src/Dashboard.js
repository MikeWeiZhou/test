import React, { Component } from "react";
import Category from "./Category";

class Dashboard extends Component {
  state = {
    categories: {},
  };

  // Called after component is mounted
  componentDidMount() {
    this.requestKPICategories();    
  }
  
  render() {
    // Generate DOM for category tabs and panes
    var categoryList = [];
    var categoryPanes = [];
    var keyNum = 0;

    for (var catKey in this.state.categories) {
      if (this.state.categories.hasOwnProperty(catKey)) {
        if (keyNum === 0) {
          categoryList.push(
            <li key={`li${keyNum}`} className="nav-item">
              <a className="nav-link active" id={`${catKey}Tab`} data-toggle="pill" 
                href={`#${catKey}Pane`}>{this.state.categories[catKey]}</a>
            </li>
          );
          categoryPanes.push(
            <Category key={`cat${keyNum}`} active={true} category={catKey} startDate={this.props.startDate} 
              endDate={this.props.endDate} updateDashboard={this.props.updateDashboard} />
          );
        } else {
          categoryList.push(
            <li key={`li${keyNum}`} className="nav-item">
              <a className="nav-link" id={`${catKey}Tab`} data-toggle="pill" 
                href={`#${catKey}Pane`}>{this.state.categories[catKey]}</a>
            </li>
          );
          categoryPanes.push(
            <Category key={`cat${keyNum}`} active={false} category={catKey} startDate={this.props.startDate} 
              endDate={this.props.endDate} updateDashboard={this.props.updateDashboard} />
          );      
        }
        keyNum++;
      }
    }

    // Set text for auto update button
    var autoUpdateStatus = (this.props.autoUpdate) ? "Auto Update: ON" : "Auto Update: OFF";

    return (
      <div id="app">
        <div className="row d-flex justify-content-around">
          <ul className="nav nav-pills" id="tablist">
            {categoryList}
          </ul>
          <div className="align-self-center" id="movAvg">Moving average period: {this.props.movAvgPeriod} days</div>    
        </div>

        <div className="row d-flex justify-content-around">        
          <div className="btn-group btn-group-toggle" id="dateSelectionButtons" data-toggle="buttons">
            <label className="btn btn-outline-primary active" onClick={() => this.props.setDateRange_by_day(7)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option1" defaultChecked={true} />7d
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_day(14)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option1" />14d
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_month(1)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option2" />1m
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_month(3)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option2" />3m
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_month(6)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option3" />6m
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_year(1)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option4" />1y
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_by_year(5)}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option5" />5y
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_ytd()}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option6" />ytd
            </label>
            <label className="btn btn-outline-primary" onClick={() => this.props.setDateRange_all()}>
              <input type="radio" className="btn btn-outline-primary" name="dateRange" id="option7" />all
            </label>
          </div>
          <div id="dateControlButtons">
            <button type="button" className="btn btn-primary" onClick={() => this.props.triggerUpdate()}>Refresh</button>
            <button type="button" className="btn btn-outline-success active" data-toggle="button" onClick={() => this.props.triggerAutoUpdate()}>{autoUpdateStatus}</button>
          </div>
        </div>        
        <div className="tab-content">
          {categoryPanes}
        </div>
      </div>
    );
  }

  async requestKPICategories() {
    // Construct route
    var url = `getkpicategories`;
    
    try{
      // GET request to retrieve data
      var res = await fetch(url);
      var resJSON = {};

      // Set state if response is OK
      if (res.ok) {
        resJSON = await res.json();
        var cat = {};
        for (var key in resJSON){
          cat[key] = resJSON[key];
        }
        this.setState({ categories: cat});
      } else {
        resJSON = await res.json();
        console.log(`Failed request - url: ${res.url}, status: ${res.status}`);
        console.log(resJSON);
      }
    } catch (error) {
      console.log(error.message);      
    }
  }
}

export default Dashboard;