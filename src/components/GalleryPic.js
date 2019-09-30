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

function GalleryPic() {
  let birds = { swan, crane, flamingo };
  return <ImgRenderProps birds={birds} />;
}

class ImgRenderProps extends Component {
  constructor(props) {
    super(props);

    this.birds = this.props.birds;
    this._isMounted = false;
  }

  state = {
    src: "crane"
  };

  switchNextPic(initialState) {
    switch (this.state.src) {
      case "crane":
        return this.setState({ src: "swan" });
      case "swan":
        return this.setState({ src: "flamingo" });
      case "flamingo":
        return this.setState({ src: "crane" });
    }
  }

  switchPrevPic(initialState) {
    switch (this.state.src) {
      case "crane":
        return this.setState({ src: "flamingo" });
      case "swan":
        return this.setState({ src: "crane" });
      case "flamingo":
        return this.setState({ src: "swan" });
    }
  }

  componentDidMount() {
    let gallery = () => {
      switch (this.state.src) {
        case "crane":
          return this.setState({ src: "swan" });
        case "swan":
          return this.setState({ src: "flamingo" });
        case "flamingo":
          return this.setState({ src: "crane" });
      }
    };
    this._isMounted = true;
    this._isMounted && setInterval(gallery, 4000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(gallery);
  }

  render() {
    let src = this.state.src;
    return (
      <GalleryPicBox>
        <PrevSlide onClick={() => this.switchPrevPic(this[src])}>
          &lt;
        </PrevSlide>
        <GalleryPicture
          alt="gallery"
          src={this.props.birds[src]}
          width="100%"
          height="496px"
        />
        <NextSlide onClick={() => this.switchNextPic(this[src])}>
          &gt;
        </NextSlide>
      </GalleryPicBox>
    );
  }
}

export default GalleryPic;
