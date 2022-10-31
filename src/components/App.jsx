import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { requesterAPI } from '../services/requesterAPI';
import noFound from '../images/no-found.png';
import styles from './App.module.css';

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [isEndOfGallery, setIsEndOfGallery] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [page, searchWord]);

  const onSubmit = event => {
    event.preventDefault();
    setSearchWord(event.target[1].value);
    setPage(1);
    setImages([]);
    setIsEndOfGallery(false);
    event.target.reset();
  };

  const pageOperator = () => {
    setPage(prev => prev + 1);
  };

  const getPhotos = async () => {
    setIsLoading(true);
    try {
      requesterAPI(searchWord, page).then(response => {
        setIsEndOfGallery(
          images.length + response.hits.length === response.totalHits
        );
        setImages(prev => [...prev, ...response.hits]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = event => {
    if (event.target === event.currentTarget || event.code) {
      const imgPath = event.target.id
        ? images[event.target.id].largeImageURL
        : '';
      setIsModalOpen(prev => !prev);
      setLargeImage(imgPath);
    }
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {!images.length > 0 && (
        <img
          src={noFound}
          alt="depiction no found"
          style={{ margin: 'auto', maxWidth: '600px' }}
        />
      )}
      {images.length > 0 && !isEndOfGallery && (
        <Button pageOperator={pageOperator} />
      )}
      {isModalOpen && <Modal image={largeImage} toggleModal={toggleModal} />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
