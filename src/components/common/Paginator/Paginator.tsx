import s from './Paginator.module.css';
import React, {FC, useState} from 'react';

type PaginatorPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  portionSize: number
}
const Paginator: FC<PaginatorPropsType> = ({
                                             totalUsersCount, pageSize, currentPage,
                                             setCurrentPage, portionSize = 10
                                           }) => {
  const pageCount: number = Math.ceil(totalUsersCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pageCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  return <>
    {portionNumber > 1 &&
    <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p: number, i: any) => {
        const pageStyle = p === currentPage ? s.active_page : '';
        return (
          <span key={i}
                className={pageStyle}
                onClick={() => setCurrentPage(p)}> {p} </span>
        )
      })
    }
    {portionCount > portionNumber &&
    <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
  </>
}
export default Paginator;