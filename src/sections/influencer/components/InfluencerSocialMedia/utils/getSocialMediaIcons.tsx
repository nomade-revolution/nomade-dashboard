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
          <FaInstagramSquare />
        </Tooltip>
      );
    case SocialMediaTypes.tiktok:
      return <FaTiktok />;
    case SocialMediaTypes.twitch:
      return <FaTwitch />;
    case SocialMediaTypes.youtube:
      return <FaYoutube />;
  }
};

export default getSocialMediaIcons;
