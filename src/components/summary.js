import React, {Component, Fragment} from 'react';
import Loading from './loading';

class Summary extends Component {
  
  
  render() {
    return (
      <Fragment>
        <div className="col-12">
          {this.props.isFetching ? <Loading/> : Table(this.props.data)}
        </div>
      </Fragment>
    )
  }
}

const renderLangs = (data) => {
  return data.map((item,idx) => {
    return (
      <tr key={idx}>
        <td>lang {idx + 1}</td>
        <td>{JSON.stringify(item).replace('{','').replace('}','').replace(/"/g, '')}</td>
      </tr>
    )
  });
}

const renderAudience = (data) => {
  return data.map((item,idx) => {
    return (
      <span key={idx} className="table-item">{JSON.stringify(item).replace('{','').replace('}','').replace(/"/g, '')}</span>
    )
  });
}

const Table = (data) => {
  if (!data.cid) return;

  return (
    <table className="table">
      <tbody>

        <tr>
          <td>cid</td>
          <td>{data.cid}</td>
        </tr>
        <tr>
          <td>channel_id</td>
          <td>{data.channel_id}</td>
        </tr>
        <tr>
          <td>channel_title</td>
          <td>{data.channel_title}</td>
        </tr>
        <tr>
          <td>monthly_views</td>
          <td>{data.monthly_views}</td>
        </tr>
        <tr>
          <td>monthly_subs</td>
          <td>{data.monthly_subs}</td>
        </tr>
        <tr>
          <td>subscriber_count</td>
          <td>{data.subscriber_count}</td>
        </tr>
        <tr>
          <td>country_code2</td>
          <td>{data.country_code2}</td>
        </tr>
        <tr>
          <td>gender_total</td>
          <td>{data.gender_total}</td>
        </tr>
        <tr>
          <td>male</td>
          <td>{data.male}</td>
        </tr>
        <tr>
          <td>female</td>
          <td>{data.female}</td>
        </tr>
        {renderLangs(data.languages || [])}
        <tr>
          <td>OID1</td>
          <td>
            <div>{data.oid1count}: {data.oid1}</div>
            <div>{data.display_name1}</div>
            <br/>
            <div>{data.conflict_notification_email1}</div>
          </td>
        </tr>
        <tr>
          <td>GROUP MCN1</td>
          <td>{data.network_mcn1} {data.msn_name1}</td>
        </tr>
        <tr>
          <td colSpan="2">{renderAudience(data.audience || [])}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Summary;