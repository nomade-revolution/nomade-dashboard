import { SocialMediaTypes } from "@influencer/domain/InfluencerSocialMedia";
import { Tooltip } from "@mui/material";
import {
  FaInstagramSquare,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";

const getSocialMediaIcons = (type: string, size?: number) => {
  switch (type) {
    case SocialMediaTypes.instagram:
      return (
        <Tooltip title={"Instagram"}>
          <FaInstagramSquare color="#335d53" size={size} />
        </Tooltip>
      );
    case SocialMediaTypes.tiktok:
      return <FaTiktok size={size} />;
    case SocialMediaTypes.twitch:
      return <FaTwitch color="#8c45f7" size={size} />;
    case SocialMediaTypes.youtube:
      return <FaYoutube color="red" size={size} />;
  }
};

export default getSocialMediaIcons;
