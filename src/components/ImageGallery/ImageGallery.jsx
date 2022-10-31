import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({images, toggleModal}) {
    // console.log(images);
    return (
        <ul className={styles.gallery}>
            {images.map((element, id) => 
                <ImageGalleryItem key={id} webformatURL={element.webformatURL} id={id} toggleModal={toggleModal} />
            )}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
        }),
    ),
    toggleModal: PropTypes.func.isRequired,
};