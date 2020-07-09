import React from 'react';

import './PhotoUploader.scss';

class PhotoUploader extends React.Component {
    uploadImage = async (e) => {
      const { toastImageChange, birthdayImageChange, isToast } = this.props;
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
      if (isToast) {
        toastImageChange(newImage);
      } else {
        birthdayImageChange(newImage);
      }
    };

    render() {
      const { image } = this.props;
      return (
        <div className="PhotoUploader col-12 mx-auto px-5 mt-3">
            <h6 className="mt-2 photo-uploader-header">Upload An Image</h6>
            <input
                className="mb-1 mx-auto"
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={this.uploadImage}
            />
            {
                image && image !== ''
                  ? (<i className="mx-2 photo-check fas fa-check"></i>)
                  : ('')
            }
        </div>
      );
    }
}

export default PhotoUploader;
