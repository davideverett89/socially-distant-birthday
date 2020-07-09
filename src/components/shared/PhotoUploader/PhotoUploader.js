import React from 'react';

import './PhotoUploader.scss';

class PhotoUploader extends React.Component {
    uploadImage = async (e) => {
      const { toastImageChange } = this.props;
      const { files } = e.target;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'ecwo6ogv');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/nashville-software-school/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      const file = await res.json();
      const newImage = file.secure_url;
      toastImageChange(newImage);
    };

    render() {
      const { toastImage } = this.props;
      return (
        <div className="PhotoUploader col-9">
            <h3>Upload An Image</h3>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={this.uploadImage}
            />
            {
                toastImage === ''
                  ? ('')
                  : (<img className="col-2 image-preview img-fluid" src={toastImage} alt="toast" />)
            }
        </div>
      );
    }
}

export default PhotoUploader;
