import { Influencer } from "@influencer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FullOffer } from "modules/offers/domain/Offer";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import DetailCardMobile, {
  DetailCardMobileRow,
} from "sections/shared/components/DetailCardMobile/DetailCardMobile";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import { collabDataTableData, collabDetailTableData } from "./collabTableData";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import theme from "assets/styles/theme";

// Types for defensive data normalization
type NomadeCommentRow = {
  comment: string;
  author?: string | null;
  created_at?: string | null;
};

// Defensive data normalization function
function normalizeCompanyNotes(input: unknown): NomadeCommentRow[] {
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];
    return [{ comment: trimmed, author: "Nomade", created_at: null }];
  }
  if (Array.isArray(input)) {
    // Future-proof: accept array of objects or strings
    return input
      .map((item: unknown) => {
        if (typeof item === "string")
          return { comment: item, author: "Nomade", created_at: null };
        const itemObj = item as Record<string, unknown>;
        return {
          comment: String(itemObj?.text ?? itemObj?.comment ?? ""),
          author: (itemObj?.author as string) ?? "Nomade",
          created_at: (itemObj?.created_at as string) ?? null,
        };
      })
      .filter((r) => r.comment?.trim().length > 0);
  }
  return [];
}

interface Props {
  collab: FullCollab;
  influencer: Influencer;
  offer: FullOffer;
}

export interface ExtendedCollab extends FullCollab {
  socialMedia: SocialMedia[];
}
const MD_BREAKPOINT = 960;

const CollabDetail = ({
  collab,
  influencer,
  offer,
}: Props): React.ReactElement => {
  const { user } = useAuthContext();
  const isDesktop = useMediaQuery(`(min-width:${MD_BREAKPOINT}px)`);

  // Normalize company_notes data - check both correct field and API typo
  const companyNotesValue = collab?.company_notes || collab?.company_notes;
  const nomadeComments = normalizeCompanyNotes(companyNotesValue);

  // Same data as Collab table: Cliente, Influencer, Fecha, RRSS
  const mainSocial = influencer.socialMedia?.find((s) => s.main);
  const collabCardRows: DetailCardMobileRow[] = [
    {
      label: "Cliente",
      value:
        user.type !== "Company" ? (
          <Link
            to={`/cliente/${collab.company_id}`}
            style={{
              textDecoration: "underline",
              color: theme.colors.mainColor,
            }}
          >
            {collab.company ?? "-"}
          </Link>
        ) : (
          collab.company ?? "-"
        ),
    },
    {
      label: "Influencer",
      value: (
        <Link
          to={`/influencer/${collab.influencer_id}`}
          style={{
            textDecoration: "underline",
            color: theme.colors.mainColor,
          }}
        >
          {collab.influencer_name ?? "-"}
        </Link>
      ),
    },
    {
      label: "Fecha",
      value: collab.day
        ? `${collab.day}${collab.time ? ` - ${collab.time}` : ""}`
        : "-",
    },
    {
      label: "RRSS",
      value: mainSocial ? (
        mainSocial.url ? (
          <a
            href={mainSocial.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "underline",
              color: theme.colors.mainColor,
            }}
          >
            @{mainSocial.account_name}
          </a>
        ) : (
          `@${mainSocial.account_name}`
        )
      ) : (
        "-"
      ),
    },
  ];

  // Same data as Reserva table: Tipo, Dirección, Día, Hora, PAX (or Desde/Hasta for Lodging)
  const isLodging = collab.type === "Lodging";
  const reservaCardRows: DetailCardMobileRow[] = [
    ...(user.type === "Nomade"
      ? [{ label: "Tipo", value: collab.type ?? "-" }]
      : []),
    { label: "Dirección", value: collab.address ?? "-" },
    ...(isLodging
      ? [
          { label: "Desde", value: collab.from_day ?? "-" },
          { label: "Hasta", value: collab.to_day ?? "-" },
        ]
      : [
          { label: "Día", value: collab.day ?? "-" },
          { label: "Hora", value: collab.time ?? "-" },
        ]),
    { label: "PAX", value: collab.guests ?? "-" },
  ];

  return (
    <CollabsDetailStyled className="collab-detail">
      {isDesktop ? (
        <>
          <DashboardTable
            bodySections={[
              { ...collab, socialMedia: influencer.socialMedia ?? [] },
            ]}
            headerSections={collabDetailTableData}
            pageName={SectionTypes.collabDetail}
          />
          {collab.type !== "Brand" && (
            <>
              <h3>Reserva</h3>
              <DashboardTable
                headerSections={collabDataTableData(collab.type, user.type)}
                bodySections={[collab]}
                pageName="collabs"
              />
            </>
          )}
        </>
      ) : (
        <>
          <DetailCardMobile title="Collab" rows={collabCardRows} />
          {collab.type !== "Brand" && (
            <DetailCardMobile title="Reserva" rows={reservaCardRows} />
          )}
        </>
      )}

      <h3>Observaciones influencer</h3>
      <section className="collab-detail__data">
        <div className="collab-detail__offer-section"></div>
        <span style={{ fontSize: "14px", width: "100%", textAlign: "left" }}>
          {collab.comment ? collab.comment : "Sin observaciones"}
        </span>
      </section>

      <h3>Comentarios Nomade</h3>
      <section className="collab-detail__data">
        <div className="collab-detail__offer-section"></div>
        {nomadeComments.length > 0 ? (
          <div style={{ width: "100%" }}>
            {nomadeComments.map((comment, index) => (
              <div
                key={index}
                style={{
                  marginBottom: nomadeComments.length > 1 ? "10px" : "0",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  {comment.comment}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: "14px", width: "100%", textAlign: "left" }}>
            Sin comentarios
          </span>
        )}
      </section>

      {user.type === "Nomade" && (
        <>
          <h3>Notas internas</h3>
          <section className="collab-detail__data">
            <div className="collab-detail__offer-section"></div>
            <span
              style={{ fontSize: "14px", width: "100%", textAlign: "left" }}
            >
              {collab.note ? collab.note : "Sin observaciones"}
            </span>
          </section>
        </>
      )}

      <Link
        to={`/oferta/${offer.id}`}
        className="collab-detail__link"
        style={{ maxWidth: "120px" }}
      >
        Ver oferta
      </Link>
    </CollabsDetailStyled>
  );
};

export default CollabDetail;
