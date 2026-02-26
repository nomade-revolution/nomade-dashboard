import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { Link } from "react-router-dom";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import {
  pushNotifications,
  type PushNotificationStatus,
} from "sections/documentation/data/pushNotifications";
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

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

const SummaryRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: #f8f8f8;
  border-radius: 8px;
  font-size: 14px;
`;

const SummaryItem = styled.span`
  font-weight: 500;
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
    vertical-align: top;
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

const StatusBadge = styled.span<{ $status: PushNotificationStatus }>`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  background-color: ${(p) =>
    p.$status === "active"
      ? "#2e7d32"
      : p.$status === "inactive"
        ? "#ed6c02"
        : "#d32f2f"};
  color: #fff;
`;

const BodyCell = styled.td`
  max-width: 280px;
  word-break: break-word;
  font-size: 13px;
  color: #444;
`;

const TitleCell = styled.td`
  max-width: 220px;
  word-break: break-word;
  font-size: 13px;
`;

const MethodCell = styled.td`
  font-size: 12px;
  color: #555;
  max-width: 320px;
  word-break: break-word;
`;

function getStatusLabel(status: PushNotificationStatus): string {
  switch (status) {
    case "active":
      return "Activa";
    case "inactive":
      return "Existe pero no se dispara";
    case "not_exists":
      return "No existe";
    default:
      return status;
  }
}

const DocumentationNotificationsPage = () => {
  const activeCount = pushNotifications.filter(
    (n) => n.status === "active",
  ).length;
  const notExistsCount = pushNotifications.filter(
    (n) => n.status === "not_exists",
  ).length;
  const inactiveCount = pushNotifications.filter(
    (n) => n.status === "inactive",
  ).length;

  return (
    <ReusablePageStyled className="plans-page">
      <Wrapper>
        <BackLink to={appPaths.documentation}>← Documentación</BackLink>
        <PageTitle>Documentación — Notificaciones push</PageTitle>
        <Subtitle>
          Listado completo de notificaciones push existentes en backend y su
          estado real.
        </Subtitle>

        <SummaryRow>
          <SummaryItem>Total activas: {activeCount}</SummaryItem>
          <SummaryItem>No existen: {notExistsCount}</SummaryItem>
          <SummaryItem>Inactivas: {inactiveCount}</SummaryItem>
        </SummaryRow>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Contexto</th>
                <th>Título</th>
                <th>Body</th>
                <th>Método backend</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pushNotifications.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.context}</td>
                  <TitleCell>{item.title}</TitleCell>
                  <BodyCell>{item.body}</BodyCell>
                  <MethodCell>{item.method}</MethodCell>
                  <td>
                    <StatusBadge $status={item.status}>
                      {getStatusLabel(item.status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Wrapper>
    </ReusablePageStyled>
  );
};

export default DocumentationNotificationsPage;
