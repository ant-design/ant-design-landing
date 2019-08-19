import qs from 'query-string';

// get url query object / specific query value
export function get(name) {
  const queryString = ((window && window.location.hash) || '').replace('#', '');
  const query = qs.parse(queryString);
  return name ? query[name] : query;
}

// update url query string
export function update(name, value) {
  if (typeof window === 'undefined') {
    return '';
  }

  const urlData = get();
  urlData[name] = value;

  window.location.hash = `#${qs.stringify(urlData)}`;
}
