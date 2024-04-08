import { HeaderSection } from "../../interfaces/interfaces";

interface DashboardTableCellContentProps {
  headerSection: HeaderSection;
  section: object;
}

const DashboardContentSections = ({
  headerSection,
  section,
}: DashboardTableCellContentProps) => {
  switch (headerSection.property) {
    default:
      return (
        <section>
          <span>{section[headerSection.property as never]}</span>
        </section>
      );
  }
};

export default DashboardContentSections;
