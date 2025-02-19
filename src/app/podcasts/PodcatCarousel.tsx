import { Section } from "@radix-ui/themes";
import React from "react";
import { PodcastWithHost } from "../../../models/models";

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
        {podcasts[0].host?.last_name}
      </h2>
    </Section>
  );
};

export default PodcatCarousel;
