import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GalleryPic from "./GalleryPic";
import { RottenBox, GreenBox } from "./elements";

const MainGallery = props => (
  <div style={{ minWidth: "400px" }}>{props.children} </div>
);

export const Main = props => {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <RottenBox>
          <Typography align="center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            nesciunt, ipsam sequi natus incidunt ut itaque corporis provident
            corrupti maiores nam alias ipsa eos fugiat molestias minus magni.
            Corporis beatae exercitationem reiciendis quibusdam dolorem aliquam
            atque incidunt at quas eaque magnam eos, odio excepturi labore
            accusamus quae quod. Minima, atque.
          </Typography>
        </RottenBox>
        <MainGallery>
          <GalleryPic />
        </MainGallery>
        <GreenBox>
          <Typography align="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
            eveniet non fugiat minus dolore nemo illo. Libero maxime hic sunt
            explicabo ipsam maiores labore facilis magni sit laboriosam placeat
            amet qui minima, reiciendis eveniet, dolores temporibus ad enim quos
            magnam sequi nemo accusamus. Praesentium reprehenderit, ipsum
            excepturi quasi nemo suscipit.
          </Typography>
        </GreenBox>
      </Container>
    </React.Fragment>
  );
};
