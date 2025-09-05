import { Influencer } from "@influencer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FullOffer } from "modules/offers/domain/Offer";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import { collabDataTableData, collabDetailTableData } from "./collabTableData";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

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
const CollabDetail = ({
  collab,
  influencer,
  offer,
}: Props): React.ReactElement => {
  const { user } = useAuthContext();

  // Normalize company_notes data - check both correct field and API typo
  const companyNotesValue = collab?.company_notes || collab?.comapny_notes;
  const nomadeComments = normalizeCompanyNotes(companyNotesValue);

  return (
    <CollabsDetailStyled className="collab-detail">
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
