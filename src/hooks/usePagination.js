import { useState } from 'react'

export default function usePagination(initialPage = 0, initialSize = 9) {
  const [page, setPage] = useState(initialPage)
  const [size] = useState(initialSize)

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(0, p - 1))
  const goToPage = (p) => setPage(p)

  return { page, size, nextPage, prevPage, goToPage, setPage }
}
