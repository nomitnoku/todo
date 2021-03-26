import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function CustomModal(props) {
  const {
    title, body, footer, show, onHide, reset, closeButton, backdrop,
    onEnter, size,
  } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      enforceFocus
      backdrop={backdrop}
      size={size}
      onExit={reset}
      onEnter={onEnter}
    >
      {
        title
        && (
        <Modal.Header
          closeButton={closeButton}
        >
          <Modal.Title>
            <h4 className="m-0">{title}</h4>
          </Modal.Title>
        </Modal.Header>
        )
}
      <Modal.Body>
        {body}
      </Modal.Body>
      {
        footer
        && (
        <Modal.Footer>
          {footer}
        </Modal.Footer>
        )
      }
    </Modal>
  );
}
CustomModal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.element.isRequired,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  reset: PropTypes.func,
  size: PropTypes.string,
  closeButton: PropTypes.bool,
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};
CustomModal.defaultProps = {
  title: null,
  footer: null,
  size: null,
  reset: () => { },
  closeButton: false,
  backdrop: true,
  onEnter: () => {},
};
export default CustomModal;
