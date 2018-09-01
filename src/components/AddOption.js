import React  from "react";

export default class AddOption extends React.Component {
  state = {
    error : undefined
  }

  handleAddOption = (e) => {
    e.preventDefault();
    const val = e.target.elements.option.value.trim()
    const error = this.props.handleAddOption(val)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.option.value = ""
    }

  }
  
  render() {
    return (
      <div>
        {
          this.state.error && <p>{this.state.error}</p>
        }
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" id="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    )
  }
}