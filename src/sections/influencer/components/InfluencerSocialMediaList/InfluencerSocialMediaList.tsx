import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

interface Props {
  socialMedias: SocialMedia[];
  headerSections: HeaderSection[];
}

const InfluencerSocialMediaList = ({
  socialMedias,
  headerSections,
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
          headerSections={headerSections}
          pageName={SectionTypes.socialMedia}
        />
      </section>
    </div>
  );
};

export default InfluencerSocialMediaList;
