import React from "react";
import AddOption from './AddOption';
import Options from './Options'
import Header from "./Header";
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }
  handlePick = () => {
    const arr = this.state.options
    const ranNum = Math.floor(Math.random() * arr.length)
    this.setState(() => ({
      selectedOption: arr[ranNum]
    }))
  }
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) !== -1) {
      return 'This option already exits'
    }
    this.setState((prevState) => ({ options: [...prevState.options, option] }))
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }))
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
  render() {
    const subtitle = 'Put Your life in hands of a computer!'

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length !== 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    )
  }
}