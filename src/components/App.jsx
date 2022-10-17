import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { requesterAPI } from '../services/requesterAPI';
import noFound from '../images/no-found.png';
import styles from './App.module.css';

class App extends Component {
  state = {
    serchWord: '',
    page: 1,
    images: [],
    largeImage: '',
    isEndOfGallery: false,
    isModalOpen: false,
    isLoading: false,
  };

  componentDidMount() {
    this.getPhotos();
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchWord, page } = this.state;
    if (prevState.page !== page) {
      this.getPhotos();
    }
    if (prevState.serchWord !== serchWord) {
      this.resetData();
      this.getPhotos();
}
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ serchWord: event.target[1].value });
    event.target.reset();
  };

  pageOperator = () => {
    this.setState(prevState => { return { page: prevState.page + 1 } });
  };

  resetData = () => {
    this.setState({ page: 1, images: [], isEndOfGallery: false });
  }

  getPhotos = async () => {
    this.setState({ isLoading: true });
    try {
      requesterAPI(this.state.serchWord, this.state.page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            isEndOfGallery: prevState.images.length + response.hits.length === response.totalHits
          }));
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    };
  };

  toggleModal = largeImageURL => {
      this.setState ( {largeImage: largeImageURL})
  };

  render() {
    const { images, largeImage, isLoading, isEndOfGallery } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && <ImageGallery images={images} toggleModal={this.toggleModal} />}
        {!images.length > 0 && <img src={noFound} alt="depiction no found" style={{margin: "auto", maxWidth: "600px"}} />}
        {images.length > 0 && !isEndOfGallery && <Button pageOperator={this.pageOperator} />}
        {largeImage && <Modal image={largeImage} toggleModal={this.toggleModal} />}
        {isLoading && <Loader />}
      </div>
    );
  };
};

export default App;