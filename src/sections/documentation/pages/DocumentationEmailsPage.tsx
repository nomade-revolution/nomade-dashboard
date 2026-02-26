import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { Link } from "react-router-dom";
import { MAILABLES_PREVIEW_BASE } from "modules/documentation/application/routes";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import { EMAIL_ITEMS } from "sections/documentation/data/emailItems";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BackLink = styled(Link)`
  color: ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${(p) => p.theme?.fontsColors?.dashBoard ?? "#333"};
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  thead {
    background: #f5f5f5;
  }
  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    font-weight: 600;
    color: ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
  tbody tr:hover {
    background: #fafafa;
  }
`;

const TitleLink = styled.a`
  color: ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PreviewButton = styled.a`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  color: ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  text-decoration: none;
  border: 1px solid ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  border-radius: 4px;
  &:hover {
    text-decoration: none;
    opacity: 0.9;
  }
`;

const NoPreview = styled.span`
  color: #999;
  font-style: italic;
`;

const TriggerBadge = styled.span<{
  $variant: "auto" | "influencer" | "company" | "nomade";
}>`
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: lowercase;
  background-color: ${(p) =>
    p.$variant === "auto"
      ? "#9e9e9e"
      : p.$variant === "influencer"
        ? "#1976d2"
        : p.$variant === "company"
          ? "#2e7d32"
          : "#e65100"};
  color: #fff;
`;

const SendWhenCell = styled.td`
  font-size: 12px;
  color: #555;
  max-width: 320px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  margin-top: 8px;
  color: ${(p) => p.theme?.fontsColors?.dashBoard ?? "#333"};
`;

const UNDOCUMENTED_MAILABLES = [
  "IncidentOtherInternalEmail",
  "IncidentSizeInternalEmail",
  "IncidentWrongProductInternalEmail",
  "AutoCanceledColabInfluencerEmail",
  "AutoCanceledColabNomadeEmail",
  "ProductSentReminder2InternalEmail",
  "CanceledColabEmail",
  "ProductSentCompanyEmail",
  "PublishedContentInternalEmail",
  "NewColabNomadeEmail",
  "InfluencerCanceledPendingNomadeInternalEmail",
  "NomadeCanceledPendingClientInfluencerEmail",
  "InfluencerCanceledPendingInternalEmail",
  "ClientCanceledPendingInternalEmail",
  "ClientCanceledModificationInternalEmail",
  "ClientCanceledAcceptedInternalEmail",
  "AutoCanceledModificationInternalEmail",
  "ConfirmedModificationInfluencerEmail",
  "ClientCanceledModificationInfluencerEmail",
  "InfluencerCanceledPendingEmail",
  "ClientCanceledAcceptedInfluencerEmail",
  "ClientCanceledPendingInfluencerEmail",
  "AutoCanceledModificationInfluencerEmail",
  "GenericEmail",
  "RegistrationCompanyAdminEmail",
  "ContactEmail",
  "ReminderPublishInfluencerEmail",
  "ReminderReserveCompanyEmail",
  "ReminderReceivedInfluencerEmail",
  "FeedbackEmail",
  "DataChangedColabEmail",
  "ReminderReserveInfluencerEmail",
  "RegistrationRequestNomadeEmail",
  "RegistrationRequestCompanyEmail",
  "RegistrationInfluencerEmail",
  "PublishedContentInfluencerEmail",
  "ProductReceivedInfluencerEmail",
  "IncidentWrongProductInfluencerEmail",
  "IncidentSizeInfluencerEmail",
  "IncidentOtherInfluencerEmail",
  "PendingColabModificationReminderCompanyEmail",
  "ClientRejectedColabCompanyEmail",
];

const DocumentationEmailsPage = () => {
  return (
    <ReusablePageStyled className="plans-page">
      <Wrapper>
        <BackLink to={appPaths.documentation}>← Documentación</BackLink>
        <PageTitle>Emails — Previews</PageTitle>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre (Word)</th>
                <th>Asunto</th>
                <th>Envío</th>
                <th>Trigger</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {EMAIL_ITEMS.map((item) => {
                const previewUrl =
                  item.mailableClass != null
                    ? `${MAILABLES_PREVIEW_BASE}/${item.mailableClass}`
                    : null;
                return (
                  <tr key={item.n}>
                    <td>{item.n}</td>
                    <td>
                      {previewUrl ? (
                        <TitleLink
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </TitleLink>
                      ) : (
                        item.title
                      )}
                    </td>
                    <td>{item.subject}</td>
                    <SendWhenCell>{item.send_when}</SendWhenCell>
                    <td>
                      <TriggerBadge $variant={item.trigger}>
                        {item.trigger}
                      </TriggerBadge>
                    </td>
                    <td>
                      {previewUrl ? (
                        <PreviewButton
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Abrir
                        </PreviewButton>
                      ) : (
                        <NoPreview>(sin preview)</NoPreview>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrap>

        <SectionTitle>
          Mailables no documentados (pendientes de auditoría)
        </SectionTitle>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Mailable</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {UNDOCUMENTED_MAILABLES.map((mailable, index) => {
                const previewPath = `/api/mailables/${mailable}`;
                const previewUrl = `${MAILABLES_PREVIEW_BASE}/${mailable}`;
                return (
                  <tr key={mailable}>
                    <td>S{index + 1}</td>
                    <td>{mailable}</td>
                    <td>
                      <TitleLink
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {previewPath}
                      </TitleLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrap>
      </Wrapper>
    </ReusablePageStyled>
  );
};

export default DocumentationEmailsPage;
