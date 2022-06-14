import { Component } from 'react';
import serverAPI from 'services/api';
import toast, { Toaster } from 'react-hot-toast';

import { Wrapper, Inner } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loading from 'components/Loading';

const IMAGES_PER_PAGE = 12;

const TOAST_OPTION = {
  containerStyle: {
    top: 120,
  },

  toastOptions: {
    style: {
      maxWidth: 500,
      padding: 20,
      fontSize: 18,
      fontWeight: 600,
      textAlign: 'center',
    },
  },
};

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class App extends Component {
  state = {
    filter: '',
    images: [],
    totalImages: 0,
    page: 1,
    status: STATUS.IDLE,
  };

  componentDidUpdate(_, prevState) {
    const { filter: prevFilter, page: prevPage } = prevState;
    const { filter, page } = this.state;

    if (prevFilter !== filter || prevPage !== page) {
      this.getImages({ filter, page });
    }
  }

  handleFormSubmit = filter => {
    this.setState({ filter, images: [], totalImages: 0, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages({ filter, page, perPage = IMAGES_PER_PAGE }) {
    this.setState({ status: STATUS.PENDING });

    serverAPI
      .getData(filter, page, perPage)
      .then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.images],
          totalImages: data.totalImages,
          status: STATUS.RESOLVED,
        }))
      )
      .catch(error => {
        this.setState({ status: STATUS.REJECTED });
        toast.error(error.message);
      });
  }

  haveMoreImages() {
    const { page, totalImages } = this.state;
    const isMoreImages = totalImages - page * IMAGES_PER_PAGE > 0;

    return isMoreImages;
  }

  transformImagesData() {
    const newImages = this.state.images.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        alt: tags,
        smallImg: webformatURL,
        fullImg: largeImageURL,
      })
    );

    return newImages;
  }

  render() {
    const { status } = this.state;
    const images = this.transformImagesData();
    const isMoreImages = this.haveMoreImages() && status === STATUS.RESOLVED;

    return (
      <Wrapper>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          isLoading={status === STATUS.PENDING}
        />

        <Inner>
          <ImageGallery images={images} />

          {isMoreImages && <Button onClick={this.handleLoadMore} />}

          {status === STATUS.PENDING && <Loading />}
        </Inner>

        <Toaster {...TOAST_OPTION} />
      </Wrapper>
    );
  }
}

export default App;
