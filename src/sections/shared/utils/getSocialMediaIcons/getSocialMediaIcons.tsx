import { SocialMediaTypes } from "@influencer/domain/InfluencerSocialMedia";
import { Tooltip } from "@mui/material";
import {
  FaInstagramSquare,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";

const getSocialMediaIcons = (type: string) => {
  switch (type) {
    case SocialMediaTypes.instagram:
      return (
        <Tooltip title={"Instagram"}>
          <FaInstagramSquare color="#ff38c0" />
        </Tooltip>
      );
    case SocialMediaTypes.tiktok:
      return <FaTiktok />;
    case SocialMediaTypes.twitch:
      return <FaTwitch color="#8c45f7" />;
    case SocialMediaTypes.youtube:
      return <FaYoutube color="red" />;
  }
};

export default getSocialMediaIcons;
