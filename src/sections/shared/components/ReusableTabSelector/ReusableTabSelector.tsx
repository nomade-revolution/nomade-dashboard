import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import ReusableTabSelectorStyled from "./ReusableTabSelectorStyled";

interface Props {
  tabs: string[];
  content: React.ReactElement[];
}

const ReusableTabSelector = ({ tabs, content }: Props): React.ReactElement => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ReusableTabSelectorStyled>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab}>
              <span className="tab__text">{tab}</span>
            </Tab>
          ))}
        </TabList>
        {content.map((element, index) => (
          <TabPanel key={index}>{element}</TabPanel>
        ))}
      </Tabs>
    </ReusableTabSelectorStyled>
  );
};

export default ReusableTabSelector;
