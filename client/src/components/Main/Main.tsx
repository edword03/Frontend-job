import React from "react";
import { PaginationItem, PaginationItems, VacanciesBlock } from "./Main.styles";
import { Loader } from "@components/index";
import { VacancyItemComponent } from "./VacancyItem";
import { Details } from "@components/Details/Details";
import { Main as MainBlock } from "./Main.styles";
import { useQuery, DocumentNode } from "@apollo/client";
import { IS_DETAIL_ID } from "../../schemas";
import { vacancyIdVar, isVisibleVar } from "@cache/index";
import { useMedia } from "@hooks/useMedia";

interface IProps {
  jobs: Array<{ id: string }>;
  schema: DocumentNode;
  isVacancies: boolean;
  nextPage?: () => void;
  prevPage?: () => void;
  isPagination?: boolean;
}

export const Main: React.FC<IProps> = ({
  jobs,
  schema,
  isVacancies,
  nextPage,
  isPagination,
  prevPage,
}) => {
  const { loading, error } = useQuery(schema);
  const { data } = useQuery(IS_DETAIL_ID);
  const { isDesktop } = useMedia();

  const isVisible = data && data.isVisible;

  React.useEffect(() => {
    if (isVacancies && !loading) {
      vacancyIdVar(jobs[0].id);
      isVisibleVar(true);
    }

    if (!isDesktop) {
      vacancyIdVar("");
      isVisibleVar(false);
    }
    return () => {
      isVisibleVar(false);
    };
  }, [loading, jobs, isVacancies, isDesktop]);

  if (loading) return <Loader />;
  if (error) return <p>Что то пошло не так...</p>;

  return (
    <>
      <MainBlock>
        <VacanciesBlock>
          {isVacancies &&
            jobs.map((item) => (
              <VacancyItemComponent key={Math.random() * 2525} id={item.id} />
            ))}
          {isPagination && (
            <PaginationItems>
              <PaginationItem onClick={prevPage}>{"<"}</PaginationItem>
              <PaginationItem onClick={nextPage}>{">"}</PaginationItem>
            </PaginationItems>
          )}
        </VacanciesBlock>
        {isVisible && <Details />}
      </MainBlock>
    </>
  );
};
