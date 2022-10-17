import { Component } from "react";
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {

    componentDidMount = () => {
        window.addEventListener('keydown', this.keyDownOperator);
    };
    
    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.keyDownOperator);
    };

    keyDownOperator = (event) => {
        // console.log('ескейп');
        if (event.code === 'Escape') {
            this.props.toggleModal();
        };
    };

    // додати функцію при кліку на оверлей
    backdropClick = (event) => {
        // console.log('оверлей');
        if (event.currentTarget === event.target) {
          this.props.toggleModal();
        }
      };
    

    render() {
        return createPortal(
            <div className={styles.overlay} onClick={this.backdropClick} >
                <div className={styles.modal}>
                    <img src={this.props.image} alt="choosed depiction" />
                </div>
            </div>,
            document.getElementById('portal')
        );
    };
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
};