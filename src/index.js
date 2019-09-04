import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import './sass/index.sass';

class App extends Component {
    state = {
        channels: []
    }

    componentDidMount() {
     
    }

    renderLanguage = (lang) => {
      for (let i in lang) {
        return i;
      }
    }

    renderList = (data) => {
      return data.map((item) =>
        <div className="col-4" key={item.cid}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"><a href="https://youtube.com/channel/{item.channel_title}">{item.channel_title}</a></h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Subscribers: {item.subscriber_count}</li>
              {item.emails
                ? <li className="list-group-item">Email: {item.emails[0]}</li>
                : ''
              }
              {item.languages
                ? <li className="list-group-item">Language: {this.renderLanguage(item.languages[0])}</li> 
                : ''
              }
              <li className="list-group-item">Percent: {item.percent}%</li>
            </ul>
          </div>
        </div>
      ) 
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
                  {this.state.channels ? this.state.isFetching ? <LoadingBlock/> : this.renderList(this.state.channels) : <EmptyBlock/>}
              </div>
            </div>
        </div>
      )
    }
    
    handleInputChange = (e) => {
      const channelId = e.currentTarget.value;

      this.setState({
        channelId: channelId
      });

      console.log(this.state.channelId);
    }

    handleButtonClick = () => {
      this.setState({
        isFetching: true
      });

      axios.get(`http://172.16.1.164:5001/api/similar_channel?channel_id=${this.state.channelId}`)
      .then((response) => {
        this.setState({
          channels: response.data,
          isFetching: false
        })
      })
      .catch((error) => {
        alert('error');
      });
    }
}

class EmptyBlock extends Component {
  render() {
      return (
        <div>
          no data
        </div>
      )
  }
}

class LoadingBlock extends Component {
  render() {
      return (
        <div className="col text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
      )
  }
}

render(<App/>, document.getElementById('root'))