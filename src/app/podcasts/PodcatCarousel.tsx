import { Section } from "@radix-ui/themes";
import React from "react";
import { PodcastWithHost } from "../../../models/models";
import PodcastSwiper from "./PodcastSwiper";

interface Props {
    podcasts:PodcastWithHost[],
    title:string
}

const PodcatCarousel = ({podcasts,title}:Props) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      <h2
        style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight: "bold" }}
      >
        {title}
      </h2>
      <PodcastSwiper podcasts={podcasts}/>
    </Section>
  )
};

export default PodcatCarousel;
