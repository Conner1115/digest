import DOMPurify from 'isomorphic-dompurify';
import {parse} from 'marked';


export default function MarkdownOutput(props) {
    let sanitized = DOMPurify.sanitize(parse(props.body))
    return (<div id="markdown-output">
      <h3 style={{textAlign: "center", height: 25}}>Output Preview</h3>
      <div id="output-body" dangerouslySetInnerHTML={{__html: sanitized}}></div>
    </div>);
}


