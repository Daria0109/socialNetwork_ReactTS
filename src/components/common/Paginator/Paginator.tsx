import s from './Paginator.module.css';
import React, {FC} from 'react';

type PaginatorPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
}
const Paginator: FC<PaginatorPropsType> = ({totalUsersCount, pageSize,
                                             currentPage, setCurrentPage}) => {
  const pageCount: number = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  return <>
    {
      pages.map((p: number, i: any) => {
        const pageStyle = p === currentPage ? s.active_page : '';
        return (
          <span key={i}
                className={pageStyle}
                onClick={() => setCurrentPage(p)}> {p} </span>
        )
      })
    }
  </>
}
export default Paginator;