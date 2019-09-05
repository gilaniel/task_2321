import React, {Component} from 'react';
import {render} from 'react-dom';
import Similar from './components/similar';
import Summary from './components/summary';
import Matching from './components/matching';
import {fetchSimilar, fetchSummary, fetchMatching} from './services';
import './sass/index.sass';

class App extends Component {
    state = {
      channels: [],
      summary: {},
      matching: [],
      matching_views: [],
      matching_subs: [],
      matching_30: [],
      searchClicked: false
    }

    componentDidMount() {
     
    }

    render() {
      return (
        <div>
            <div className="container">
              <div className="input-group mb-3 search-block">
                <input type="text" className="form-control" onChange={this.handleInputChange} placeholder="Channel ID" aria-label="Channel ID" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" disabled={this.state.isFetching} type="button" onClick={this.handleButtonClick}>OK</button>
                </div>
              </div>
              <div className="row justify-content-center list-block">
                <Summary data={this.state.summary} isFetching={this.state.isFetching} isFetched={this.state.isFetched}/>
              </div>
            </div>
            <Similar data={this.state.channels} isFetching={this.state.isFetching} isFetched={this.state.isFetched}/>
            <Matching data={this.state.matching} isFetching={this.state.isFetching} isFetched={this.state.isFetched}/>
            <Matching data={this.state.matching_views} isFetching={this.state.isFetching} isFetched={this.state.isFetched} metric="monthly_views"/>
            <Matching data={this.state.matching_subs} isFetching={this.state.isFetching} isFetched={this.state.isFetched} metric="subscriber_count"/>
            <Matching data={this.state.matching_30} isFetching={this.state.isFetching} isFetched={this.state.isFetched} metric="30days_tip_views"/>
        </div>
      )
    }
    
    handleInputChange = (e) => {
      const channelId = e.currentTarget.value;

      this.setState({
        channelId: channelId
      });
    }

    handleButtonClick = () => {
      this.setState({
        searchClicked: true,
        isFetching: true
      });

      const data = {channel_id: this.state.channelId};

      Promise.all([
        fetchSimilar(data),
        fetchSummary(data),
        fetchMatching(data),
        fetchMatching({...data, ...{ matching_type: 'monthly_views' }}),
        fetchMatching({...data, ...{ matching_type: 'subscriber_count' }}),
        fetchMatching({...data, ...{ matching_type: '30days_tip_views' }})
      ])
      .then(([channels, summary, matching, matching_views, matching_subs, matching_30]) => {
        this.setState({
          channels: channels.data,
          summary: summary.data,
          matching: matching.data,
          matching_views: matching_views.data,
          matching_subs: matching_subs.data,
          matching_30: matching_30.data,
          isFetching: false,
          isFetched: true
        });
      })
      .catch((error) => {
        this.setState({
          isFetching: false
        })
      });
    }
}

class EmptyBlock extends Component {
  render() {
      return (
        <div>
          {/* no data */}
        </div>
      )
  }
}

render(<App/>, document.getElementById('root'))