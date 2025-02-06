import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import { influencerSocialMediaListHeaderSections } from "sections/influencer/utils/influencersSections";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

interface Props {
  socialMedias: SocialMedia[];
}

const InfluencerSocialMediaList = ({
  socialMedias,
}: Props): React.ReactElement => {
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "10px" }}>Redes</h2>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <DashboardTable
          bodySections={socialMedias}
          headerSections={influencerSocialMediaListHeaderSections}
          pageName={SectionTypes.socialMedia}
        />
      </section>
    </div>
  );
};

export default InfluencerSocialMediaList;
