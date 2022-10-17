import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({images, toggleModal}) {
    // console.log(images);
    return (
        <ul className={styles.gallery}>
            {images.map((element, idx) => 
                <ImageGalleryItem key={idx} webformatURL={element.webformatURL} largeImageURL={element.largeImageURL} idx={idx} toggleModal={toggleModal} />
            )}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        }),
    ),
    toggleModal: PropTypes.func.isRequired,
};