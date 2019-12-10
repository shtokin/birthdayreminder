import React, {Component} from 'react'
import {Image} from "semantic-ui-react";

export default class FieldFileInput  extends Component{
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.fileInputRef = React.createRef();
    this.state = {
      file: null
    }
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
  }

  render(){
    const { input: { value } } = this.props;
    const {input,label, required, meta, photoUrl } = this.props;

    let photoSrc = this.state.file ? this.state.file : photoUrl;
    return(
      <div>
        <label className="ui icon button" onClick={() => this.fileInputRef.current.click()}>
          <i className="file icon"></i>{label}
        </label>
        <Image src={photoSrc} size='large' className="rounded" />
        <input
          ref={this.fileInputRef}
          style={{display: 'none'}}
          type='file'
          accept='.jpg, .png, .jpeg'
          onChange={this.onChange}
        />
      </div>
    )
  }
}