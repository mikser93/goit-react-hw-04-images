import { useEffect } from "react";
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ toggleModal, image }) {

    const keyDownOperator = (event) => {
        if (event.code === 'Escape') {
            toggleModal(event);
        };
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDownOperator);
        return () => {
            window.removeEventListener('keydown', keyDownOperator);
        };
        // eslint-disable-next-line
    }, []);

    return createPortal(
        <div className={styles.overlay} onClick={toggleModal}>
            <div className={styles.modal}>
                <img src={image} alt="choosed depiction" />
            </div>
        </div>,
        document.getElementById('portal')
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
};