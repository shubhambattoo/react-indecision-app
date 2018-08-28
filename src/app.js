class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      options: []
    }
  }
  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      if (options) {
        this.setState(() => ({ options }))
      }
    } catch (error) {
      // do nothing
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }
  handlePick() {
    const arr = this.state.options
    const ranNum = Math.floor(Math.random() * arr.length)
    alert(arr[ranNum])
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) !== -1) {
      return 'This option already exits'
    }
    this.setState((prevState) => ({ options: [...prevState.options, option] }))
  }
  render() {
    const subtitle = 'Put Your life in hands of a computer!'

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length !== 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    )
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {
        props.subtitle && <h3>{props.subtitle}</h3>
      }
    </div>
  )
}

Header.defaultProps = {
  title: 'Indecision App'
}

const Action = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}>
        What Should I Do?
            </button>
    </div>
  )
}

const Options = (props) => {

  return (
    <div>
      <button onClick={props.handleDeleteOptions} >Remove All Options</button>
      {props.options.length === 0 && <p>Please add some options to get started</p> }
      {
        props.options.map((option) => (
          <Option
            optionText={option}
            key={option}
            handleDeleteOption={props.handleDeleteOption}
          />))
      }
    </div>
  )

}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText)
        }}
      >&times;</button>
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();
    const val = e.target.elements.option.value.trim()
    const error = this.props.handleAddOption(val)

    this.setState(() => ({ error }))

    if(!error) {
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


ReactDOM.render(<IndecisionApp />, document.getElementById('container'))