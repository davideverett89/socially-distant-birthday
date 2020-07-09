import React from 'react';

import toastData from '../../../helpers/data/toastData';

import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import './EditToast.scss';

class EditToast extends React.Component {
  state = {
    toastMessage: '',
    toastImage: '',
    isMounted: false,
  }

  componentDidMount() {
    const { toastId } = this.props.match.params;
    toastData.getSingleToast(toastId)
      .then((response) => {
        const toast = response.data;
        this.setState({
          toastMessage: toast.message,
          toastImage: toast.image,
          isMounted: true,
        });
      })
      .catch((err) => console.error('There was an issue with getting single toast:', err));
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  toastMessageChange = (e) => {
    e.preventDefault();
    this.setState({ toastMessage: e.target.value });
  }

  toastImageChange = (image) => {
    this.setState({ toastImage: image });
  }

  updateToast = (e) => {
    e.preventDefault();
    const { toastId, birthdayId } = this.props.match.params;
    const { toastMessage, toastImage } = this.state;
    const updatedMessage = toastMessage;
    const updatedImage = toastImage;
    toastData.patchToast(toastId, updatedMessage, updatedImage)
      .then(() => this.props.history.push(`/birthdays/${birthdayId}`))
      .catch((err) => console.error('There was an issue with creating a new toast:', err));
  }

  render() {
    const { toastMessage, toastImage } = this.state;
    return (
        <div className="EditToast my-5">
            <h1 className="display-3 edit-toast-header">Edit Your Message</h1>
            <form className="p-5 col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mx-auto update-toast-form">
              <div className="my-5 form-group">
                <textarea className="toast-textarea form-control" id="toast-input" rows="3" value={toastMessage} onChange={this.toastMessageChange}></textarea>
              </div>
              <PhotoUploader toastImageChange={this.toastImageChange} image={toastImage} isToast={true} />
              <button className="my-5 col-4 btn toast-update-btn" onClick={this.updateToast}>Update Toast</button>
            </form>
        </div>
    );
  }
}

export default EditToast;
