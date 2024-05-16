import { CharactersList, PageWrapper } from "@/components";

const Characters = async () => {
  return (
    <PageWrapper title="Characters of Rick & Morty series">
      <CharactersList />
    </PageWrapper>
  );
};

export default Characters;
