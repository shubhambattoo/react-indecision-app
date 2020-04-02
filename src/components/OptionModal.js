import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button onClick={props.handleClearSelectedOption} className="btn">
      Okay
    </button>
  </Modal>
);

export default OptionModal;
