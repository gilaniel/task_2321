import React, {Component, Fragment} from 'react';
import Loading from './loading';
import { moneyFormatHelper } from '../helpers';

class Similar extends Component {

  renderLanguage = (lang) => {
    for (let i in lang) {
      return i;
    }
  }

  render() {
    return (
      <Fragment>
        <div className="col-12 text-center table-title">{this.props.isFetched ? <h4>Similar channels</h4> : ''}</div>
        {this.props.isFetching ? <Loading/> : Table(this.props.data || [])}
      </Fragment>
    )
  }
}


const renderLangs = (data) => {
  return data.map((item,idx) => {
    return (
      <span key={idx} className="table-item">{JSON.stringify(item).replace('{','').replace('}','').replace(/"/g, '')}</span>
    )
  });
}

const renderTable = (data) => {
  return data.map((item,idx) => 
    <tr key={idx}>
      <td>{item.percent}</td>
      <td>{item.test_users}</td>
      <td>{renderLangs(item.languages)}</td>
      <td>{item.country_code2}</td>
      <td>{moneyFormatHelper(item.subscriber_count)}</td>
      <td>{moneyFormatHelper(Math.round(item.days30))}</td>
      <td><a href={`https://youtube.com/channel/${item.channel_id}`}>{item.channel_id}</a></td>
      <td>{item.channel_title}</td>
      <td>{item.emails ? item.emails.toString() : '-'}</td>
    </tr>
  );

}

const Table = (data) => {
  if (!data.length) return;

  return (
    <div className="table-block">
      <table className="table">
        <thead>
          <tr>
            <td>Процент аудитории канала</td>
            <td>test users</td>
            <td>lang</td>
            <td>country_code2</td>
            <td>subscriber</td>
            <td>days30</td>
            <td>channel_id</td>
            <td>channel title</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody>{renderTable(data)}</tbody>
      </table>
    </div>
  )
}

export default Similar;