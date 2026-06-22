import { DiaScreen, PageHeader } from "@/components/dia-ui";
import { DeveloperResearcherCard } from "@/features/developer/developer-components";
import {
  DEVELOPER_INFO_COPY,
  DEVELOPER_RESEARCHERS,
} from "@/features/developer/developer-content";

export default function DeveloperInfoScreen() {
  return (
    <DiaScreen>
      <PageHeader
        description={DEVELOPER_INFO_COPY.description}
        eyebrow={DEVELOPER_INFO_COPY.eyebrow}
        showBack
        title={DEVELOPER_INFO_COPY.title}
      />

      {DEVELOPER_RESEARCHERS.map((researcher) => (
        <DeveloperResearcherCard key={researcher.id} researcher={researcher} />
      ))}
    </DiaScreen>
  );
}
