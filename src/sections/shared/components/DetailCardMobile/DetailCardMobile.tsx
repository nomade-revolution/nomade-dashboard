import React from "react";
import DetailCardMobileStyled from "./DetailCardMobileStyled";

export interface DetailCardMobileRow {
  label: string;
  value: React.ReactNode;
}

interface DetailCardMobileProps {
  title: string;
  rows: DetailCardMobileRow[];
}

const DetailCardMobile = ({
  title,
  rows,
}: DetailCardMobileProps): React.ReactElement => {
  return (
    <DetailCardMobileStyled className="detail-card-mobile">
      <h3 className="detail-card-mobile__title">{title}</h3>
      {rows.map((row, index) => (
        <div key={index} className="detail-card-mobile__row">
          <span className="detail-card-mobile__label">{row.label}</span>
          <span className="detail-card-mobile__value">{row.value}</span>
        </div>
      ))}
    </DetailCardMobileStyled>
  );
};

export default DetailCardMobile;
