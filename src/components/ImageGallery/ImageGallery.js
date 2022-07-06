import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import fetchImages from '../../services/fetchImages';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Modal from '../Modal';
import Button from '../Button';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPages: 1,
    showModal: false,
    largeImage: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;
    const { page } = this.state;
    if (prevName !== nextName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetchImages
        .fetchImages(nextName, page)
        .then(images => {
          this.setState(prevState => ({
            // images: [...images.hits],
            images: [...prevState.images, ...images.hits],
            totalPages: Math.ceil(images.totalHits / 12),
            status: 'resolved',
          }));
          if (prevName !== nextName) {
            this.setState({
              images: [...images.hits],
              status: 'resolved',
            });
          }
          if (!images.hits.length) {
            this.setState({ images: [], status: 'rejected' });
            toast.error(`Sorry, ${nextName} not found`);
            return;
          }
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: img,
    }));
  };
  render() {
    const { images, error, status, page, totalPages, showModal, largeImage } =
      this.state;
    return (
      <>
        {status === 'rejected' && <h1>{error}</h1>}

        <>
          <ul className={s.gallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li key={id} className={s.item}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  tags={tags}
                  onClickModal={() => this.toggleModal(largeImageURL)}
                />
              </li>
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {page !== totalPages && status === 'resolved' && (
            <Button onLoadMore={this.onLoadMore} />
          )}
        </>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={this.tags} className={s.modalImage} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
export default ImageGallery;
