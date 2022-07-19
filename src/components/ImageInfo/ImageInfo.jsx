import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageInfo extends Component {
  state = {
    status: Status.IDLE,
    error: null,
    totalHits: null,
    hits: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (
      (prevSearchQuery.trim() !== nextSearchQuery.trim() &&
        nextSearchQuery.trim().length > 0) ||
      nextPage > prevPage
    ) {
      this.setState({
        status: Status.PENDING,
      });
      this.props.hideMoreButton();
      try {
        const { totalHits, hits } = await getImages(nextSearchQuery, nextPage);
        if (totalHits === 0) {
          toast.error(
            `Failed to find any images with name ${nextSearchQuery}. Try other words.`
          );
        }
        if (totalHits === this.state.hits.length + hits.length) {
          this.props.hideMoreButton();
        }
        if (totalHits > this.state.hits.length + hits.length) {
          this.props.showMoreButton();
        }
        if (nextPage > 1) {
          this.setState({
            hits: [...prevState.hits, ...hits],
            status: Status.RESOLVED,
            totalHits: totalHits,
          });
        }
        if (nextPage === 1) {
          this.setState({
            hits: hits,
            status: Status.RESOLVED,
            totalHits: totalHits,
          });
        }
      } catch (error) {
        this.setState({
          error,
          status: Status.REJECTED,
        });
        this.props.hideMoreButton();
        toast.error(`Sorry, something went wrong.`);
      }
    }
  }

  render() {
    const { hits, status } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return (
        <>
          <ImageGallery hits={hits} onClick={this.props.onClick} />
          <Loader />
        </>
      );
    }
    if (status === 'rejected') {
      return;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery hits={hits} onClick={this.props.onClick} />
        </>
      );
    }
  }
}

ImageInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  showMoreButton: PropTypes.func.isRequired,
  hideMoreButton: PropTypes.func.isRequired,
};

export default ImageInfo;
