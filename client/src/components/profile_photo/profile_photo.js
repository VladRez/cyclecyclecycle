import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
// import { toPromise } from 'apollo-link';

ADD_PHOTO: gql`
  mutation AddPhoto($user_id: ID, $photoUrl: String, $file: String) {
    addPhoto(user_id: $user_id, photoUrl: $photoUrl, file: $file) {
      user_id
      photoUrl
      file
    }
  }
`;

class ProfilePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      photoUrl: "",
      file: ""
    };
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ file: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  uploadToS3 = async (file, signedRequest) => {
    const options = { headers: { "Content-Type": file.type } };
    await axios.put(signedRequest, file, options);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { photoUrl, file } = this.state;
    const user_id = localStorage.getItem("currentUserId");
    const newFile = await this.props.newFile({
      variables: {
        photoUrl,
        user_id
      }
    });
    const res = await this.props.s3Sign({
      variables: {
        filename: file.name,
        filetype: file.type
      }
    });
    console.log(res);
    const { signedRequest, url } = res.data.signS3;
    await this.uploadToS3(file, signedRequest);
  };

  render() {
    return (
      <div>
        Make a form for me genie
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            value={this.state.photoUrl}
            onChange={this.handleFile.bind(this)}
            placeholder="Image Link"
          />
          <button>Upload Photo!</button>
        </form>
      </div>
    );
  }
}
export default ProfilePhoto;

//   fileDrop = async file => {
//     this.setState({ file: file });
//   };

//   update(field) {
//     return e => {
//       this.setState({ [field]: e.target.value });
//     };
//   }
