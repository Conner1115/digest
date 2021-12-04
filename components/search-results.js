import Result from './search-result'
import convert from './lang2icons'

export default function Results(props) {
    let results = props.autocomplete;
    return (
      <div id="search-results">
        {(props.focus && Array.isArray(results)) && results.slice(0, 5).map(res => <Result key={res.slug} lang={convert[res.lang]} text={res.title} slug={res.slug}/>)}
      </div>
    )
}