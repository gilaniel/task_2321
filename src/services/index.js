import axios from 'axios';

const API = 'http://172.16.1.164:5001/api';

export function fetchSimilar(data) {
  return axios.get(API+'/similar_channel', {params: data});
}

export function fetchSummary(data) {
  return axios.get(API+'/channel_summary', {params: data});
}

export function fetchMatching(data) {
  return axios.get(API+'/audience_matching', {params: data});
}