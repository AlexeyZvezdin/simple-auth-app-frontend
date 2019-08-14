import React, { Component } from "react";
import flamingo from "../assets/flamingo.jpg";
import swan from "../assets/swan.jpg";
import crane from "../assets/grey-crowned-crane.jpg";
import {
  GalleryPicture,
  GalleryPicBox,
  PrevSlide,
  NextSlide
} from "./elements";

export default class GalleryPic extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
  }

  state = {
    src: crane
  };

  switchNextPic(initialState) {
    switch (this.state.src) {
      case crane:
        return this.setState({ src: swan });
      case swan:
        return this.setState({ src: flamingo });
      case flamingo:
        return this.setState({ src: crane });
    }
  }

  switchPrevPic(initialState) {
    switch (this.state.src) {
      case crane:
        return this.setState({ src: flamingo });
      case swan:
        return this.setState({ src: crane });
      case flamingo:
        return this.setState({ src: swan });
    }
  }

  componentDidMount() {
    let gallery = () => {
      switch (this.state.src) {
        case crane:
          return this.setState({ src: swan });
        case swan:
          return this.setState({ src: flamingo });
        case flamingo:
          return this.setState({ src: crane });
      }
    };
    this._isMounted = true;
    this._isMounted && setInterval(gallery, 5000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(gallery);
  }

  render() {
    return (
      <GalleryPicBox>
        <PrevSlide onClick={() => this.switchPrevPic(this.state.src)}>
          &lt;
        </PrevSlide>
        <GalleryPicture alt="gallery" src={this.state.src} />
        <NextSlide onClick={() => this.switchNextPic(this.state.src)}>
          &gt;
        </NextSlide>
      </GalleryPicBox>
    );
  }
}
