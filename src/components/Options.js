import React from 'react';
import Option from './Option';
const Options = (props) => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All Options</button>
    {props.options.length === 0 && <p>Please add some options to get started</p>}
    {
      props.options.map((option) => (
        <Option
          optionText={option}
          key={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
)

export default Options;